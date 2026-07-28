import fs from 'fs';
import path from 'path';
import { HadithBook, HadithContent, SingleHadithData, RangeHadithData } from '../types/hadith';
import { BOOKS_METADATA, LOCAL_HADITHS_DATABASE } from '../data/localHadiths';

// In-memory memory cache for downloaded books data
const booksDataCache: Record<string, HadithContent[]> = {};

// CDN / GitHub RAW Mirror URLs
const CDN_URLS = [
  'https://cdn.jsdelivr.net/gh/gadingmst/hadits-api@main/data',
  'https://raw.githubusercontent.com/gadingmst/hadits-api/main/data',
  'https://raw.githubusercontent.com/Islami-fork/hadis-api-id/main/data'
];

export function normalizePerawiSlug(slug: string): string {
  if (!slug) return '';
  const s = slug.toLowerCase().trim();
  if (s === 'abu-dawud' || s === 'abudawud' || s === 'abudaud') return 'abu-daud';
  if (s === 'ibnumajah' || s === 'ibn-majah') return 'ibnu-majah';
  return s;
}

export class HadithService {
  /**
   * Get list of all available Hadith books
   */
  static getBooks(): HadithBook[] {
    return BOOKS_METADATA;
  }

  /**
   * Get list of all narrators (perawi)
   */
  static getNarrators() {
    return BOOKS_METADATA.map((b) => ({
      name: b.name,
      slug: b.id === 'abu-daud' ? 'abu-dawud' : b.id,
      total: b.available,
      id: b.id
    }));
  }

  /**
   * Get metadata for a specific book or perawi
   */
  static getBookMetadata(bookId: string): HadithBook | undefined {
    const normalized = normalizePerawiSlug(bookId);
    return BOOKS_METADATA.find((b) => b.id === normalized);
  }

  /**
   * Helper to fetch full book data from Local Filesystem, CDN or Fallback
   */
  static async fetchBookContents(bookId: string): Promise<HadithContent[]> {
    const normalized = normalizePerawiSlug(bookId);

    // Check memory cache first
    if (booksDataCache[normalized] && booksDataCache[normalized].length > 0) {
      return booksDataCache[normalized];
    }

    // 1. Check local filesystem paths (e.g. /data/, /src/data/, /public/data/)
    // Support both abu-daud.json and abu-dawud.json
    const possibleFilenames = [
      `${normalized}.json`,
      normalized === 'abu-daud' ? 'abu-dawud.json' : '',
      normalized === 'ibnu-majah' ? 'ibn-majah.json' : ''
    ].filter(Boolean);

    const possibleDirs = [
      path.join(process.cwd(), 'data'),
      path.join(process.cwd(), 'src', 'data'),
      path.join(process.cwd(), 'public', 'data')
    ];

    for (const dir of possibleDirs) {
      for (const fname of possibleFilenames) {
        const filePath = path.join(dir, fname);
        if (fs.existsSync(filePath)) {
          try {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const json = JSON.parse(fileData);
            let list: HadithContent[] = [];

            if (Array.isArray(json)) {
              list = json;
            } else if (json.hadiths && Array.isArray(json.hadiths)) {
              list = json.hadiths;
            } else if (json.contents && Array.isArray(json.contents)) {
              list = json.contents;
            }

            if (list.length > 0) {
              booksDataCache[normalized] = list;
              return list;
            }
          } catch (e) {
            console.error(`Error reading local file ${filePath}:`, e);
          }
        }
      }
    }

    // 2. Try fetching from CDN mirrors
    for (const baseUrl of CDN_URLS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

        const response = await fetch(`${baseUrl}/${normalized}.json`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const json = await response.json();
          let list: HadithContent[] = [];

          if (Array.isArray(json)) {
            list = json;
          } else if (json.hadiths && Array.isArray(json.hadiths)) {
            list = json.hadiths;
          } else if (json.contents && Array.isArray(json.contents)) {
            list = json.contents;
          }

          if (list.length > 0) {
            booksDataCache[normalized] = list;
            return list;
          }
        }
      } catch (err) {
        // Continue to next CDN mirror or fallback
      }
    }

    // Fallback to local embedded database
    const local = LOCAL_HADITHS_DATABASE[normalized] || [];
    booksDataCache[normalized] = local;
    return local;
  }

  /**
   * Fetch single Hadith by book ID and number
   */
  static async getSingleHadith(bookId: string, number: number): Promise<SingleHadithData | null> {
    const book = this.getBookMetadata(bookId);
    if (!book) return null;

    const contents = await this.fetchBookContents(bookId);
    const item = contents.find((h) => Number(h.number) === Number(number));

    if (!item) return null;

    return {
      name: book.name,
      id: book.id,
      available: book.available,
      contents: item
    };
  }

  /**
   * Fetch a range of Hadiths
   */
  static async getRangeHadiths(
    bookId: string,
    start: number,
    end: number
  ): Promise<RangeHadithData | null> {
    const book = this.getBookMetadata(bookId);
    if (!book) return null;

    const contents = await this.fetchBookContents(bookId);

    // Filter range (1-indexed number based)
    const startNum = Math.max(1, start);
    const endNum = Math.min(book.available, end);

    let filtered = contents.filter((h) => h.number >= startNum && h.number <= endNum);

    // If contents array didn't match directly by number property, slice array fallback
    if (filtered.length === 0 && contents.length > 0) {
      filtered = contents.slice(startNum - 1, endNum);
    }

    return {
      name: book.name,
      id: book.id,
      available: book.available,
      requested: filtered.length,
      hadiths: filtered
    };
  }

  /**
   * Search Hadiths by query string across Indonesian / Arabic text or number
   */
  static async searchHadiths(
    query: string,
    bookId?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ name?: string; id?: string; totalResults: number; results: (HadithContent & { bookId: string; bookName: string })[] }> {
    const q = query.toLowerCase().trim();
    const results: (HadithContent & { bookId: string; bookName: string })[] = [];

    const targetBooks = bookId && bookId !== 'all'
      ? [this.getBookMetadata(bookId)].filter(Boolean)
      : BOOKS_METADATA;

    for (const b of targetBooks) {
      if (!b) continue;
      const contents = await this.fetchBookContents(b.id);
      for (const h of contents) {
        if (
          String(h.number) === q ||
          (h.id && h.id.toLowerCase().includes(q)) ||
          (h.arab && h.arab.includes(q))
        ) {
          results.push({
            ...h,
            bookId: b.id,
            bookName: b.name
          });
        }
      }
    }

    const totalResults = results.length;
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + limit);

    return {
      name: bookId && bookId !== 'all' ? this.getBookMetadata(bookId)?.name : 'Semua Kitab',
      id: bookId || 'all',
      totalResults,
      results: paginated
    };
  }

  /**
   * Get random Hadith
   */
  static async getRandomHadith(bookId?: string): Promise<(HadithContent & { bookId: string; bookName: string; available: number }) | null> {
    const targetBooks = bookId && bookId !== 'all'
      ? [this.getBookMetadata(bookId)].filter(Boolean)
      : BOOKS_METADATA;

    if (targetBooks.length === 0) return null;

    const randomBook = targetBooks[Math.floor(Math.random() * targetBooks.length)]!;
    const contents = await this.fetchBookContents(randomBook.id);

    if (contents.length === 0) return null;

    const randomItem = contents[Math.floor(Math.random() * contents.length)]!;

    return {
      ...randomItem,
      bookId: randomBook.id,
      bookName: randomBook.name,
      available: randomBook.available
    };
  }

  /**
   * Get paginated hadiths for a perawi (imam)
   */
  static async getHadithsByPerawi(
    perawiSlug: string,
    page: number = 1,
    limit: number = 20
  ) {
    const book = this.getBookMetadata(perawiSlug);
    if (!book) return null;

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const start = (safePage - 1) * safeLimit + 1;
    const end = safePage * safeLimit;

    const rangeData = await this.getRangeHadiths(book.id, start, end);
    if (!rangeData) return null;

    return {
      name: book.name,
      slug: perawiSlug,
      total: book.available,
      pagination: {
        totalItems: book.available,
        currentPage: safePage,
        pageSize: safeLimit,
        totalPages: Math.ceil(book.available / safeLimit)
      },
      items: rangeData.hadiths
    };
  }
}
