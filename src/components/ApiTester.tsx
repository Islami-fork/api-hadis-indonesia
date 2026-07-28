import React, { useState, useEffect } from 'react';
import { Terminal, Play, Copy, Check, Clock, Code2, Layers, AlertCircle, RefreshCw } from 'lucide-react';
import { BOOKS_METADATA } from '../data/localHadiths';

export const ApiTester: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'books' | 'hadith_list' | 'hadith_perawi' | 'hadith_detail' | 'single' | 'range' | 'random' | 'search' | 'ping'>('hadith_perawi');
  const [selectedBook, setSelectedBook] = useState<string>('abu-daud');
  const [hadithNumber, setHadithNumber] = useState<number>(2);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('niat');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'js' | 'axios' | 'python' | 'php'>('js');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedResponse, setCopiedResponse] = useState<boolean>(false);

  // Derive constructed URL
  const getConstructedUrl = () => {
    const origin = window.location.origin;
    const perawiSlug = selectedBook === 'abu-daud' ? 'abu-dawud' : selectedBook;

    switch (selectedEndpoint) {
      case 'hadith_list':
        return `${origin}/hadith`;
      case 'hadith_perawi':
        return `${origin}/hadith/${perawiSlug}?page=${page}&limit=${limit}`;
      case 'hadith_detail':
        return `${origin}/hadith/${perawiSlug}/${hadithNumber}`;
      case 'books':
        return `${origin}/books`;
      case 'single':
        return `${origin}/books/${selectedBook}/${hadithNumber}`;
      case 'range':
        return `${origin}/books/${selectedBook}/range/${rangeStart}-${rangeEnd}`;
      case 'random':
        return `${origin}/books/${selectedBook}/random`;
      case 'search':
        return `${origin}/api/search?q=${encodeURIComponent(searchQuery)}&book=${selectedBook}`;
      case 'ping':
        return `${origin}/ping`;
      default:
        return `${origin}/hadith`;
    }
  };

  const constructedUrl = getConstructedUrl();

  const handleExecuteRequest = async () => {
    setLoading(true);
    setErrorMsg(null);
    const startTime = performance.now();

    try {
      const res = await fetch(constructedUrl);
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponseStatus(res.status);

      const json = await res.json();
      setResponseData(json);
    } catch (err: any) {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponseStatus(500);
      setErrorMsg(err.message || 'Gagal terhubung ke endpoint API');
      setResponseData({ code: 500, message: err.message || 'Network error', error: true });
    } finally {
      setLoading(false);
    }
  };

  // Auto execute on initial mount
  useEffect(() => {
    handleExecuteRequest();
  }, []);

  // Generate code snippet string based on selected code tab
  const getCodeSnippet = () => {
    const url = constructedUrl;
    switch (activeCodeTab) {
      case 'curl':
        return `curl -X GET "${url}" \\
  -H "Accept: application/json"`;
      case 'js':
        return `// JavaScript Fetch Example
fetch("${url}")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`;
      case 'axios':
        return `// Axios Example
import axios from 'axios';

axios.get("${url}")
  .then(response => {
    console.log(response.data);
  });`;
      case 'python':
        return `# Python Requests Example
import requests

response = requests.get("${url}")
data = response.json()
print(data)`;
      case 'php':
        return `<?php
// PHP cURL Example
$ch = curl_init("${url}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);
?>`;
    }
  };

  const copyToClipboard = (text: string, type: 'code' | 'response') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Hero Banner */}
      <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#b8955a]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] bg-[#b8955a]/10 text-[#b8955a] border border-[#b8955a]/20">
            <Terminal className="w-3.5 h-3.5" /> Interactive REST API Sandbox
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
            Uji Endpoint API Hadis Real-Time
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            API Hadis Indonesia siap digunakan untuk aplikasi web, mobile, atau bot Anda. Dilengkapi endpoint RESTful lengkap untuk 9 Kitab Kutubut Tis'ah dengan format JSON terstruktur.
          </p>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Endpoint Controller */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f0f12] border border-white/5 rounded-md p-5 text-white shadow-xl space-y-5">
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#b8955a]" />
              1. Pilih Preset Endpoint
            </h3>

            {/* Endpoint Selector Buttons */}
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setSelectedEndpoint('hadith_list')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'hadith_list'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/hadith</span>
                </div>
                <span className="text-[11px] text-white/40">Daftar Perawi</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('hadith_perawi')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'hadith_perawi'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/hadith/{'{perawiSlug}'}</span>
                </div>
                <span className="text-[11px] text-white/40">Daftar Hadis Per Imam</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('hadith_detail')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'hadith_detail'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/hadith/{'{slug}'}/{'{nomor}'}</span>
                </div>
                <span className="text-[11px] text-white/40">Hadis Per Imam & Nomor</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('books')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'books'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/books</span>
                </div>
                <span className="text-[11px] text-white/40">Daftar Semua Kitab</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('single')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'single'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/books/{'{id}'}/{'{number}'}</span>
                </div>
                <span className="text-[11px] text-white/40">Detail Hadis</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('range')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'range'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/books/{'{id}'}/range/...</span>
                </div>
                <span className="text-[11px] text-white/40">Range Hadis</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('random')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'random'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/books/{'{id}'}/random</span>
                </div>
                <span className="text-[11px] text-white/40">Hadis Acak</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('search')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'search'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/api/search?q=...</span>
                </div>
                <span className="text-[11px] text-white/40">Pencarian Hadis</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('ping')}
                className={`flex items-center justify-between p-3 rounded-md border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedEndpoint === 'ping'
                    ? 'bg-[#b8955a]/10 border-[#b8955a] text-[#b8955a]'
                    : 'bg-[#16161a] border-white/5 text-white/70 hover:bg-[#1f1f26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#b8955a]/20 text-[#b8955a]">GET</span>
                  <span className="font-mono text-xs">/ping</span>
                </div>
                <span className="text-[11px] text-white/40">Server Health</span>
              </button>
            </div>

            {/* Dynamic Parameter Controls */}
            {selectedEndpoint !== 'books' && selectedEndpoint !== 'hadith_list' && selectedEndpoint !== 'ping' && (
              <div className="border-t border-white/5 pt-4 space-y-4">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                  2. Parameter Request
                </h3>

                {/* Perawi / Kitab Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs text-white/70 font-medium">Pilih Perawi / Kitab:</label>
                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full bg-[#16161a] border border-white/10 rounded-md px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#b8955a]"
                  >
                    {selectedEndpoint === 'search' || selectedEndpoint === 'random' ? (
                      <option value="all">Semua Perawi / Kitab (all)</option>
                    ) : null}
                    {BOOKS_METADATA.map((b) => {
                      const slug = b.id === 'abu-daud' ? 'abu-dawud' : b.id;
                      return (
                        <option key={b.id} value={b.id}>
                          {b.name} ({slug}) - {b.available.toLocaleString()} Hadis
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Page and Limit for hadith_perawi */}
                {selectedEndpoint === 'hadith_perawi' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-white/70 font-medium">Halaman (page):</label>
                      <input
                        type="number"
                        min={1}
                        value={page}
                        onChange={(e) => setPage(Number(e.target.value))}
                        className="w-full bg-[#16161a] border border-white/10 rounded-md px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#b8955a]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-white/70 font-medium">Batas / hal (limit):</label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="w-full bg-[#16161a] border border-white/10 rounded-md px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#b8955a]"
                      />
                    </div>
                  </div>
                )}

                {/* Number parameter for single & hadith_detail */}
                {(selectedEndpoint === 'single' || selectedEndpoint === 'hadith_detail') && (
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">Nomor Hadis:</label>
                    <input
                      type="number"
                      min={1}
                      max={30000}
                      value={hadithNumber}
                      onChange={(e) => setHadithNumber(Number(e.target.value))}
                      className="w-full bg-[#16161a] border border-white/10 rounded-md px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#b8955a]"
                    />
                  </div>
                )}

                {/* Range parameters */}
                {selectedEndpoint === 'range' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-white/70 font-medium">Range Awal:</label>
                      <input
                        type="number"
                        min={1}
                        value={rangeStart}
                        onChange={(e) => setRangeStart(Number(e.target.value))}
                        className="w-full bg-[#16161a] border border-white/10 rounded-md px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#b8955a]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-white/70 font-medium">Range Akhir:</label>
                      <input
                        type="number"
                        min={1}
                        value={rangeEnd}
                        onChange={(e) => setRangeEnd(Number(e.target.value))}
                        className="w-full bg-[#16161a] border border-white/10 rounded-md px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#b8955a]"
                      />
                    </div>
                  </div>
                )}

                {/* Search Query */}
                {selectedEndpoint === 'search' && (
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">Kata Kunci Pencarian:</label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Misal: niat, shalat, puasa..."
                      className="w-full bg-[#16161a] border border-white/10 rounded-md px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#b8955a]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Constructed URL Display & Execute Button */}
            <div className="border-t border-white/5 pt-4 space-y-3">
              <div className="bg-[#09090b] p-3 rounded-md border border-white/10 font-mono text-[11px] text-[#b8955a] break-all select-all">
                <span className="text-white/40 font-bold mr-2">GET</span>
                {constructedUrl}
              </div>

              <button
                onClick={handleExecuteRequest}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-[#b8955a] hover:bg-[#d4af37] text-black font-semibold text-sm transition-all shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Mengirim Request...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black text-black" />
                    <span>Kirim Request API</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Response Viewer & Code Snippets */}
        <div className="lg:col-span-7 space-y-6">
          {/* Response Box Header */}
          <div className="bg-[#0f0f12] border border-white/5 rounded-md overflow-hidden shadow-xl">
            <div className="bg-[#09090b] px-5 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                  HTTP Response
                </span>
                {responseStatus && (
                  <span
                    className={`px-2 py-0.5 rounded-xs text-xs font-bold ${
                      responseStatus >= 200 && responseStatus < 300
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {responseStatus} {responseStatus === 200 ? 'OK' : 'ERROR'}
                  </span>
                )}
                {responseTime !== null && (
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3.5 h-3.5 text-white/30" />
                    {responseTime} ms
                  </span>
                )}
              </div>

              {responseData && (
                <button
                  onClick={() => copyToClipboard(JSON.stringify(responseData, null, 2), 'response')}
                  className="flex items-center gap-1 text-xs text-white/50 hover:text-[#b8955a] transition-colors cursor-pointer"
                >
                  {copiedResponse ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedResponse ? 'Tersalin' : 'Salin JSON'}</span>
                </button>
              )}
            </div>

            {/* Response JSON Body */}
            <div className="p-4 bg-[#09090b] font-mono text-xs text-[#b8955a] max-h-[420px] overflow-auto">
              {loading ? (
                <div className="py-12 text-center text-white/40 flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#b8955a]" />
                  <span>Mengambil data dari server API...</span>
                </div>
              ) : responseData ? (
                <pre className="whitespace-pre-wrap break-words leading-relaxed text-yellow-100/90">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              ) : (
                <div className="py-12 text-center text-white/30 italic">
                  Tekan "Kirim Request API" untuk menguji endpoint.
                </div>
              )}
            </div>
          </div>

          {/* Code Snippet Tabs */}
          <div className="bg-[#0f0f12] border border-white/5 rounded-md p-5 shadow-xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#b8955a]" />
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                  Kode Integration Snippet
                </h3>
              </div>

              <button
                onClick={() => copyToClipboard(getCodeSnippet(), 'code')}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[#16161a] text-white/70 hover:text-white hover:bg-[#1f1f26] border border-white/5 transition-all cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Tersalin' : 'Salin Kode'}</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(['js', 'axios', 'curl', 'python', 'php'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveCodeTab(lang)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCodeTab === lang
                      ? 'bg-[#b8955a] text-black font-bold'
                      : 'bg-[#16161a] text-white/50 hover:text-white border border-white/5'
                  }`}
                >
                  {lang === 'js' ? 'JS Fetch' : lang}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="bg-[#09090b] p-4 rounded-md border border-white/5 font-mono text-xs text-amber-200/90 overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words">
                {getCodeSnippet()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
