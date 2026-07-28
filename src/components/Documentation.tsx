import React from 'react';
import { FileText, CheckCircle, Database, ShieldCheck, Zap, Globe, Layers, ArrowRight } from 'lucide-react';
import { BOOKS_METADATA } from '../data/localHadiths';

export const Documentation: React.FC = () => {
  const origin = window.location.origin;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Hero Header */}
      <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 sm:p-8 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-[10px] font-bold uppercase tracking-[0.2em] bg-[#b8955a]/10 text-[#b8955a] border border-[#b8955a]/20">
          <FileText className="w-3.5 h-3.5" /> Dokumentasi REST API Hadis
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
          Petunjuk Lengkap Integrasi API
        </h2>
        <p className="text-white/60 text-xs sm:text-sm max-w-3xl leading-relaxed">
          API Hadis Indonesia menyediakan layanan RESTful API gratis, terbuka, dan cepat tanpa perlu API Key. Kompatibel dengan CORS untuk pemanggilan langsung dari frontend (React, Vue, Flutter, Android, iOS).
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f0f12] border border-white/5 p-5 rounded-md space-y-2">
          <Globe className="w-6 h-6 text-[#b8955a]" />
          <h3 className="font-serif italic text-sm text-white">Bebas Akses CORS</h3>
          <p className="text-xs text-white/50">Dapat dipanggil langsung dari browser, mobile app, atau server-side tanpa blokir CORS.</p>
        </div>

        <div className="bg-[#0f0f12] border border-white/5 p-5 rounded-md space-y-2">
          <Database className="w-6 h-6 text-[#b8955a]" />
          <h3 className="font-serif italic text-sm text-white">9 Kitab Kutubut Tis'ah</h3>
          <p className="text-xs text-white/50">Termasuk Bukhari, Muslim, Abu Daud, Tirmidzi, Nasai, Ibnu Majah, Ahmad, Malik, dan Darimi.</p>
        </div>

        <div className="bg-[#0f0f12] border border-white/5 p-5 rounded-md space-y-2">
          <Zap className="w-6 h-6 text-[#b8955a]" />
          <h3 className="font-serif italic text-sm text-white">Pencarian & Range</h3>
          <p className="text-xs text-white/50">Dukungan pagination, range batch, nomor hadis spesifik, dan pencarian kata kunci.</p>
        </div>

        <div className="bg-[#0f0f12] border border-white/5 p-5 rounded-md space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#b8955a]" />
          <h3 className="font-serif italic text-sm text-white">Siap Deploy Vercel</h3>
          <p className="text-xs text-white/50">Dilengkapi berkas vercel.json & Express serverless entry point.</p>
        </div>
      </div>

      {/* Base URL & Endpoints Detail */}
      <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 shadow-xl space-y-6">
        <h3 className="text-lg font-serif italic text-white border-b border-white/5 pb-3 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#b8955a]" />
          Daftar Endpoint REST API Utama
        </h3>

        <div className="space-y-6">
          {/* New Endpoint /hadith */}
          <div className="bg-[#09090b] p-4 rounded-md border border-[#b8955a]/30 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/hadith</code>
            </div>
            <p className="text-xs text-white/70">Daftar perawi (seluruh imam hadis beserta slug dan total ketersediaan hadis).</p>
            <p className="text-[11px] text-white/40">Contoh: <code className="text-[#b8955a] font-mono">{origin}/hadith</code></p>
          </div>

          {/* New Endpoint /hadith/{perawiSlug} */}
          <div className="bg-[#09090b] p-4 rounded-md border border-[#b8955a]/30 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/hadith/{'{perawiSlug}'}?page=1&limit=20</code>
            </div>
            <p className="text-xs text-white/70">Daftar hadis berdasarkan imam/perawi. Parameter <code className="text-[#b8955a] font-mono">page</code> (opsional, default 1) untuk halaman paginasi, dan <code className="text-[#b8955a] font-mono">limit</code> (opsional, default 20) untuk batas jumlah hadis per halaman.</p>
            <p className="text-[11px] text-white/40">Contoh: <code className="text-[#b8955a] font-mono">{origin}/hadith/abu-dawud?page=1&limit=20</code></p>
          </div>

          {/* New Endpoint /hadith/{perawiSlug}/{nomorHadis} */}
          <div className="bg-[#09090b] p-4 rounded-md border border-[#b8955a]/30 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/hadith/{'{perawiSlug}'}/{'{nomorHadis}'}</code>
            </div>
            <p className="text-xs text-white/70">Hadis spesifik berdasarkan imam/perawi dan nomor hadis.</p>
            <p className="text-[11px] text-white/40">Contoh: <code className="text-[#b8955a] font-mono">{origin}/hadith/abu-dawud/2</code></p>
          </div>

          {/* Endpoint 1 */}
          <div className="bg-[#09090b] p-4 rounded-md border border-white/5 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/books</code>
            </div>
            <p className="text-xs text-white/70">Mengembalikan daftar seluruh 9 kitab hadis beserta jumlah total hadis yang tersedia.</p>
            <div className="bg-[#16161a] p-3 rounded-md font-mono text-[11px] text-yellow-100/80 border border-white/5">
              Response: &#123; "code": 200, "message": "Success fetching all Hadith books", "data": [...] &#125;
            </div>
          </div>

          {/* Endpoint 2 */}
          <div className="bg-[#09090b] p-4 rounded-md border border-white/5 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/books/{'{name}'}/{'{number}'}</code>
            </div>
            <p className="text-xs text-white/70">Mengambil satu hadis spesifik berdasarkan ID kitab dan nomor hadis.</p>
            <p className="text-[11px] text-white/40">Contoh: <code className="text-[#b8955a] font-mono">{origin}/books/bukhari/1</code></p>
          </div>

          {/* Endpoint 3 */}
          <div className="bg-[#09090b] p-4 rounded-md border border-white/5 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/books/{'{name}'}/range/{'{start}'}-{'{end}'}</code>
            </div>
            <p className="text-xs text-white/70">Mengambil daftar range hadis dari nomor <code className="text-[#b8955a] font-mono">start</code> hingga <code className="text-[#b8955a] font-mono">end</code>.</p>
            <p className="text-[11px] text-white/40">Contoh: <code className="text-[#b8955a] font-mono">{origin}/books/bukhari/range/1-20</code></p>
          </div>

          {/* Endpoint 4 */}
          <div className="bg-[#09090b] p-4 rounded-md border border-white/5 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/books/{'{name}'}/random</code>
            </div>
            <p className="text-xs text-white/70">Mengambil satu hadis secara acak dari kitab tertentu atau seluruh kitab.</p>
            <p className="text-[11px] text-white/40">Contoh: <code className="text-[#b8955a] font-mono">{origin}/books/bukhari/random</code> atau <code className="text-[#b8955a] font-mono">{origin}/books/muslim/random</code></p>
          </div>

          {/* Endpoint 5 */}
          <div className="bg-[#09090b] p-4 rounded-md border border-white/5 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
              <code className="text-sm font-mono text-white">/api/search?q={'{query}'}&book={'{id}'}</code>
            </div>
            <p className="text-xs text-white/70">Mencari teks hadis (bahasa Indonesia atau Arab) berdasarkan kata kunci.</p>
            <p className="text-[11px] text-white/40">Contoh: <code className="text-[#b8955a] font-mono">{origin}/api/search?q=niat&book=bukhari</code></p>
          </div>
        </div>
      </div>

      {/* Table of Available Books */}
      <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-serif italic text-white border-b border-white/5 pb-3">
          Daftar ID Kitab (Kutubut Tis'ah)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/5 text-white/40 font-bold uppercase tracking-[0.15em]">
                <th className="py-3 px-4">Nama Kitab</th>
                <th className="py-3 px-4">ID Kitab (Slug)</th>
                <th className="py-3 px-4">Jumlah Hadis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {BOOKS_METADATA.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-serif italic text-white">{b.name}</td>
                  <td className="py-3 px-4 font-mono text-[#b8955a]">{b.id}</td>
                  <td className="py-3 px-4 text-white/60">{b.available.toLocaleString()} Hadis</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
