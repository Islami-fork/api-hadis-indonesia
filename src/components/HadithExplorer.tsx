import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Volume2, VolumeX, Copy, Check, Bookmark, Share2, Sparkles, Filter, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { HadithContent, HadithBook } from '../types/hadith';
import { BOOKS_METADATA } from '../data/localHadiths';

export const HadithExplorer: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('bukhari');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hadiths, setHadiths] = useState<HadithContent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalAvailable, setTotalAvailable] = useState<number>(0);

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bookmarked_hadiths') || '[]');
    } catch {
      return [];
    }
  });

  const [speakingNumber, setSpeakingNumber] = useState<number | null>(null);
  const [activeQuoteModal, setActiveQuoteModal] = useState<HadithContent | null>(null);

  // Load Hadiths from API
  const loadHadiths = async () => {
    setLoading(true);
    try {
      let url = '';
      if (searchQuery.trim()) {
        url = `/api/search?q=${encodeURIComponent(searchQuery)}&book=${selectedBook}&page=${page}&limit=10`;
      } else {
        const start = (page - 1) * 10 + 1;
        const end = page * 10;
        url = `/books/${selectedBook}/range/${start}-${end}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.code === 200 && json.data) {
        if (searchQuery.trim()) {
          setHadiths(json.data.results || []);
          setTotalAvailable(json.data.totalResults || 0);
          setTotalPages(Math.ceil((json.data.totalResults || 0) / 10) || 1);
        } else {
          setHadiths(json.data.hadiths || []);
          setTotalAvailable(json.data.available || 0);
          setTotalPages(Math.ceil((json.data.available || 0) / 10) || 1);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHadiths();
  }, [selectedBook, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadHadiths();
  };

  const handleToggleBookmark = (item: HadithContent) => {
    const key = `${selectedBook}:${item.number}`;
    let updated: string[];
    if (bookmarkedHadiths.includes(key)) {
      updated = bookmarkedHadiths.filter((k) => k !== key);
    } else {
      updated = [...bookmarkedHadiths, key];
    }
    setBookmarkedHadiths(updated);
    localStorage.setItem('bookmarked_hadiths', JSON.stringify(updated));
  };

  const copyHadithText = (item: HadithContent) => {
    const bookObj = BOOKS_METADATA.find((b) => b.id === selectedBook);
    const text = `[${bookObj?.name || selectedBook} No. ${item.number}]\n\n${item.arab}\n\nArtinya:\n"${item.id}"`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.number);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text-To-Speech read aloud
  const handleToggleSpeech = (item: HadithContent) => {
    if (!('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung Text-to-Speech.');
      return;
    }

    if (speakingNumber === item.number) {
      window.speechSynthesis.cancel();
      setSpeakingNumber(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.id);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingNumber(null);
    utterance.onerror = () => setSpeakingNumber(null);

    setSpeakingNumber(item.number);
    window.speechSynthesis.speak(utterance);
  };

  const currentBookObj = BOOKS_METADATA.find((b) => b.id === selectedBook);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Search & Filter Bar */}
      <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif italic text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#b8955a]" />
              Penjelajah & Pembaca Hadis
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-1">
              Baca, cari, simpan, dan dengarkan terjemahan Hadis Kutubut Tis'ah
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tema / nomor hadis..."
                className="w-full bg-[#16161a] border border-white/10 rounded-md pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b8955a]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#b8955a] hover:bg-[#d4af37] text-black rounded-md text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Book Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-white/5 pt-4">
          <span className="text-xs font-bold text-white/40 uppercase tracking-[0.15em] shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Kitab:
          </span>
          {BOOKS_METADATA.map((b) => {
            const isSelected = selectedBook === b.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBook(b.id);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#b8955a] text-black font-semibold'
                    : 'bg-[#16161a] text-white/70 hover:bg-[#1f1f26] hover:text-white border border-white/5'
                }`}
              >
                <span>{b.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-xs ${isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-white/50'}`}>
                  {b.available.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Hadith List Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-white/50 px-2">
          <span>
            Menampilkan Kitab <strong className="text-[#b8955a]">{currentBookObj?.name}</strong>{' '}
            {searchQuery ? `(Hasil cari: "${searchQuery}")` : ''} - Total {totalAvailable.toLocaleString()} Hadis
          </span>
          <span>
            Halaman {page} dari {totalPages}
          </span>
        </div>

        {loading ? (
          <div className="bg-[#0f0f12] border border-white/5 rounded-md p-12 text-center text-white/40 flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-[#b8955a]" />
            <p className="text-sm font-medium">Memuat Teks Hadis...</p>
          </div>
        ) : hadiths.length === 0 ? (
          <div className="bg-[#0f0f12] border border-white/5 rounded-md p-12 text-center text-white/40 space-y-2">
            <p className="text-base font-semibold text-white/80">Hadis Tidak Ditemukan</p>
            <p className="text-xs text-white/40">Coba kata kunci lain atau pilih kitab hadis yang berbeda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {hadiths.map((item) => {
              const isBookmarked = bookmarkedHadiths.includes(`${selectedBook}:${item.number}`);
              const isSpeaking = speakingNumber === item.number;

              return (
                <div
                  key={item.number}
                  className="bg-[#0f0f12] border border-white/5 hover:border-white/10 rounded-md p-6 shadow-xl transition-all space-y-5"
                >
                  {/* Hadith Card Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xs bg-[#b8955a]/10 border border-[#b8955a]/20 text-[#b8955a] text-xs font-bold tracking-wide">
                        {currentBookObj?.name || 'Hadis'} No. {item.number}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio Speech */}
                      <button
                        onClick={() => handleToggleSpeech(item)}
                        title="Dengarkan Terjemahan"
                        className={`p-2 rounded-md border transition-all cursor-pointer ${
                          isSpeaking
                            ? 'bg-[#b8955a] text-black border-[#b8955a] animate-pulse'
                            : 'bg-[#16161a] text-white/70 border-white/5 hover:text-white hover:bg-[#1f1f26]'
                        }`}
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={() => handleToggleBookmark(item)}
                        title="Simpan Hadis"
                        className={`p-2 rounded-md border transition-all cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : 'bg-[#16161a] text-white/70 border-white/5 hover:text-white hover:bg-[#1f1f26]'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>

                      {/* Quote Card */}
                      <button
                        onClick={() => setActiveQuoteModal(item)}
                        title="Kartu Quote Hadis"
                        className="p-2 rounded-md border bg-[#16161a] text-white/70 border-white/5 hover:text-[#b8955a] hover:bg-[#1f1f26] transition-all cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      {/* Copy */}
                      <button
                        onClick={() => copyHadithText(item)}
                        title="Salin Teks"
                        className="p-2 rounded-md border bg-[#16161a] text-white/70 border-white/5 hover:text-[#b8955a] hover:bg-[#1f1f26] transition-all cursor-pointer"
                      >
                        {copiedId === item.number ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <div className="text-right py-2 leading-loose dir-rtl">
                    <p
                      tabIndex={0}
                      className="text-2xl sm:text-3xl text-amber-100/90 font-serif leading-[2.2] tracking-wide focus:outline-none"
                      style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Naskh', serif" }}
                    >
                      {item.arab}
                    </p>
                  </div>

                  {/* Indonesian Translation */}
                  <div className="bg-[#09090b] p-4 rounded-md border border-white/5 text-white/80 text-xs sm:text-sm leading-relaxed">
                    <p className="font-sans">
                      <strong className="text-[#b8955a] font-semibold mr-1">Artinya:</strong>"{item.id}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-4 py-2 rounded-md bg-[#16161a] border border-white/10 text-white/80 text-xs sm:text-sm font-medium hover:bg-[#1f1f26] hover:text-white disabled:opacity-40 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Halaman Sebelumnya
            </button>

            <span className="text-xs text-white/50 font-medium">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-md bg-[#16161a] border border-white/10 text-white/80 text-xs sm:text-sm font-medium hover:bg-[#1f1f26] hover:text-white disabled:opacity-40 transition-all cursor-pointer"
            >
              Halaman Selanjutnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Quote Card Modal */}
      {activeQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f0f12] border border-white/10 rounded-md max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-serif italic text-white text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#b8955a]" />
                Kartu Kutipan Hadis
              </h3>
              <button
                onClick={() => setActiveQuoteModal(null)}
                className="text-white/40 hover:text-white text-lg font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Generated Quote Box */}
            <div className="bg-[#09090b] p-6 rounded-md border border-[#b8955a]/30 shadow-inner space-y-4 text-center">
              <span className="inline-block px-3 py-1 rounded-xs text-xs font-semibold bg-[#b8955a]/10 text-[#b8955a] border border-[#b8955a]/20">
                {currentBookObj?.name} No. {activeQuoteModal.number}
              </span>

              <p className="text-xl text-amber-100/90 font-serif leading-loose dir-rtl">
                {activeQuoteModal.arab}
              </p>

              <p className="text-xs text-white/70 italic leading-relaxed">
                "{activeQuoteModal.id}"
              </p>

              <div className="pt-2 text-[10px] text-white/30 uppercase tracking-widest border-t border-white/5">
                API Hadis Indonesia • {window.location.host}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  copyHadithText(activeQuoteModal);
                  setActiveQuoteModal(null);
                }}
                className="w-full py-2.5 bg-[#b8955a] hover:bg-[#d4af37] text-black rounded-md text-xs sm:text-sm font-semibold transition-all shadow-lg cursor-pointer"
              >
                Salin Teks Kutipan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
