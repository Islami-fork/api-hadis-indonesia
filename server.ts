import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { HadithService } from './src/server/hadithService';

const app = express();
const PORT = 3000;

// Enable CORS for all incoming cross-origin requests
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/books') || req.path.startsWith('/hadith') || req.path.startsWith('/random') || req.path.startsWith('/ping')) {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// ---------------------------------------------------------------------------
// API ENDPOINTS
// ---------------------------------------------------------------------------

// GET /hadith or /api/hadith -> Daftar perawi
app.get(['/hadith', '/api/hadith'], (req: Request, res: Response) => {
  const narrators = HadithService.getNarrators();
  res.json({
    code: 200,
    message: 'Success fetching list of narrators',
    data: narrators
  });
});

// GET /hadith/:perawiSlug/:nomorHadis or /api/hadith/:perawiSlug/:nomorHadis -> Hadis spesifik berdasarkan perawi & nomor
app.get(['/hadith/:perawiSlug/:nomorHadis', '/api/hadith/:perawiSlug/:nomorHadis'], async (req: Request, res: Response) => {
  try {
    const perawiSlug = req.params.perawiSlug;
    const nomor = parseInt(req.params.nomorHadis, 10);

    if (isNaN(nomor)) {
      return res.status(400).json({
        code: 400,
        message: 'Hadith number must be an integer',
        error: true
      });
    }

    const singleData = await HadithService.getSingleHadith(perawiSlug, nomor);

    if (!singleData) {
      return res.status(404).json({
        code: 404,
        message: `Hadith number ${nomor} not found for perawi "${perawiSlug}"`,
        error: true
      });
    }

    res.json({
      code: 200,
      message: 'Success fetching Hadith',
      data: {
        name: singleData.name,
        slug: perawiSlug,
        total: singleData.available,
        contents: singleData.contents
      }
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// GET /hadith/:perawiSlug or /api/hadith/:perawiSlug -> Daftar hadis berdasarkan perawi (paginated)
app.get(['/hadith/:perawiSlug', '/api/hadith/:perawiSlug'], async (req: Request, res: Response) => {
  try {
    const perawiSlug = req.params.perawiSlug;
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);

    const result = await HadithService.getHadithsByPerawi(perawiSlug, page, limit);

    if (!result) {
      return res.status(404).json({
        code: 404,
        message: `Perawi "${perawiSlug}" not found`,
        error: true
      });
    }

    res.json({
      code: 200,
      message: `Success fetching Hadiths for perawi ${perawiSlug}`,
      data: result
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// Health check ping
app.get(['/ping', '/api/ping'], (req: Request, res: Response) => {
  res.json({
    code: 200,
    message: 'PONG',
    data: {
      status: 'online',
      service: 'API Hadis Indonesia',
      timestamp: new Date().toISOString()
    }
  });
});

// GET /books or /api/books or /api/hadis -> List all books
app.get(['/books', '/api/books', '/api/hadis'], (req: Request, res: Response) => {
  const books = HadithService.getBooks();
  res.json({
    code: 200,
    message: 'Success fetching all Hadith books',
    data: books
  });
});

// GET /random or /api/random -> Get a random Hadith
app.get(['/random', '/api/random'], async (req: Request, res: Response) => {
  try {
    const bookId = req.query.book as string;
    const randomItem = await HadithService.getRandomHadith(bookId);

    if (!randomItem) {
      return res.status(404).json({
        code: 404,
        message: 'Hadith not found',
        error: true
      });
    }

    res.json({
      code: 200,
      message: 'Success fetching random Hadith',
      data: {
        name: randomItem.bookName,
        id: randomItem.bookId,
        available: randomItem.available,
        contents: {
          number: randomItem.number,
          arab: randomItem.arab,
          id: randomItem.id
        }
      }
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// GET /api/search?q=query&book=id -> Global or book search
app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const query = (req.query.q || req.query.query || '') as string;
    const book = (req.query.book || 'all') as string;
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);

    if (!query) {
      return res.status(400).json({
        code: 400,
        message: 'Search query parameter "q" is required',
        error: true
      });
    }

    const searchResult = await HadithService.searchHadiths(query, book, page, limit);

    res.json({
      code: 200,
      message: 'Success searching Hadith',
      data: searchResult
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// GET /books/:id/range/:start-:end -> Get specific range
app.get(
  ['/books/:id/range/:range', '/api/books/:id/range/:range'],
  async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const rangeStr = req.params.range; // e.g. "1-20"
      const [startStr, endStr] = rangeStr.split('-');

      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);

      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({
          code: 400,
          message: 'Invalid range format. Use e.g. /books/bukhari/range/1-20',
          error: true
        });
      }

      const result = await HadithService.getRangeHadiths(bookId, start, end);

      if (!result) {
        return res.status(404).json({
          code: 404,
          message: `Book "${bookId}" not found`,
          error: true
        });
      }

      res.json({
        code: 200,
        message: 'Success fetching range of Hadiths',
        data: result
      });
    } catch (err: any) {
      res.status(500).json({
        code: 500,
        message: err.message || 'Internal server error',
        error: true
      });
    }
  }
);

// GET /books/:id/search?q=query -> Search within a book
app.get(['/books/:id/search', '/api/books/:id/search'], async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const query = (req.query.q || req.query.query || '') as string;
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);

    if (!query) {
      return res.status(400).json({
        code: 400,
        message: 'Search query parameter "q" is required',
        error: true
      });
    }

    const searchResult = await HadithService.searchHadiths(query, bookId, page, limit);

    res.json({
      code: 200,
      message: `Success searching in book ${bookId}`,
      data: searchResult
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// GET /books/:id/random -> Get random Hadith from specific book
app.get(['/books/:id/random', '/api/books/:id/random'], async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const randomItem = await HadithService.getRandomHadith(bookId);

    if (!randomItem) {
      return res.status(404).json({
        code: 404,
        message: `Hadith not found for book "${bookId}"`,
        error: true
      });
    }

    res.json({
      code: 200,
      message: 'Success fetching random Hadith',
      data: {
        name: randomItem.bookName,
        id: randomItem.bookId,
        available: randomItem.available,
        contents: {
          number: randomItem.number,
          arab: randomItem.arab,
          id: randomItem.id
        }
      }
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// GET /books/:id/:number or /api/books/:id/:number OR GET /books/:id with range/page query
app.get(['/books/:id/:number', '/api/books/:id/:number'], async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const number = parseInt(req.params.number, 10);

    if (isNaN(number)) {
      return res.status(400).json({
        code: 400,
        message: 'Hadith number must be an integer',
        error: true
      });
    }

    const singleData = await HadithService.getSingleHadith(bookId, number);

    if (!singleData) {
      return res.status(404).json({
        code: 404,
        message: `Hadith number ${number} not found in book "${bookId}"`,
        error: true
      });
    }

    res.json({
      code: 200,
      message: 'Success fetching Hadith',
      data: singleData
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// GET /books/:id or /api/books/:id
app.get(['/books/:id', '/api/books/:id'], async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const rangeParam = req.query.range as string; // e.g., ?range=1-50
    const pageParam = req.query.page as string;
    const limitParam = req.query.limit as string;

    let start = 1;
    let end = 20;

    if (rangeParam) {
      const parts = rangeParam.split('-');
      if (parts.length === 2) {
        start = parseInt(parts[0], 10) || 1;
        end = parseInt(parts[1], 10) || 20;
      }
    } else if (pageParam || limitParam) {
      const page = parseInt(pageParam || '1', 10);
      const limit = parseInt(limitParam || '20', 10);
      start = (page - 1) * limit + 1;
      end = page * limit;
    }

    const result = await HadithService.getRangeHadiths(bookId, start, end);

    if (!result) {
      return res.status(404).json({
        code: 404,
        message: `Book "${bookId}" not found`,
        error: true
      });
    }

    res.json({
      code: 200,
      message: 'Success fetching Hadiths',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: err.message || 'Internal server error',
      error: true
    });
  }
});

// ---------------------------------------------------------------------------
// VITE OR STATIC FRONTEND MIDDLEWARE (For local dev / non-Vercel environment)
// ---------------------------------------------------------------------------

if (!process.env.VERCEL) {
  async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[HADIS API SERVER] Listening on http://0.0.0.0:${PORT}`);
    });
  }

  startServer();
}

export default app;
