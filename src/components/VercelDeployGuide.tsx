import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Copy, Check, Terminal, FileCode2, ExternalLink, ArrowRight, Github } from 'lucide-react';

export const VercelDeployGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [copiedConfig, setCopiedConfig] = useState<boolean>(false);

  const vercelJsonSnippet = `{
  "version": 2,
  "builds": [
    {
      "src": "server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server.ts" },
    { "src": "/books/(.*)", "dest": "/server.ts" },
    { "src": "/books", "dest": "/server.ts" },
    { "src": "/random", "dest": "/server.ts" },
    { "src": "/ping", "dest": "/server.ts" },
    { "src": "/(.*)", "dest": "/server.ts" }
  ]
}`;

  const copyText = (text: string, type: 'cmd' | 'config') => {
    navigator.clipboard.writeText(text);
    if (type === 'cmd') {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } else {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Hero Banner */}
      <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 sm:p-8 shadow-xl space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-[10px] font-bold uppercase tracking-[0.2em] bg-[#b8955a]/10 text-[#b8955a] border border-[#b8955a]/20">
          <UploadCloud className="w-4 h-4 text-[#b8955a]" /> Vercel Deployment Ready
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
          Panduan Deploy API Hadis ke Vercel
        </h2>
        <p className="text-white/60 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Project ini telah dilengkapi konfigurasi Vercel Serverless Function (<code className="text-[#b8955a] font-mono">vercel.json</code>) dan Express entry point (<code className="text-[#b8955a] font-mono">server.ts</code>) sehingga Anda bisa mendeploy API dan Web UI ini langsung ke Vercel dengan mudah dan gratis.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#b8955a] hover:bg-[#d4af37] text-black font-semibold text-xs sm:text-sm shadow-lg transition-all"
          >
            <span>Buka Dashboard Vercel</span>
            <ExternalLink className="w-4 h-4 text-black" />
          </a>
        </div>
      </div>

      {/* Deploy Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 space-y-3">
          <div className="w-8 h-8 rounded-xs bg-[#b8955a]/10 text-[#b8955a] border border-[#b8955a]/20 font-bold text-xs flex items-center justify-center">
            1
          </div>
          <h3 className="font-serif italic text-base text-white">Push ke GitHub</h3>
          <p className="text-xs text-white/50 leading-relaxed">
            Eksport atau upload repositori project ini ke repositori GitHub Anda (Public atau Private).
          </p>
          <div className="bg-[#09090b] p-3 rounded-md border border-white/5 font-mono text-[11px] text-white/70 space-y-1">
            <div>git add .</div>
            <div>git commit -m "feat: setup hadis api"</div>
            <div>git push origin main</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 space-y-3">
          <div className="w-8 h-8 rounded-xs bg-[#b8955a]/10 text-[#b8955a] border border-[#b8955a]/20 font-bold text-xs flex items-center justify-center">
            2
          </div>
          <h3 className="font-serif italic text-base text-white">Import di Vercel</h3>
          <p className="text-xs text-white/50 leading-relaxed">
            Buka vercel.com/new, pilih repositori GitHub Anda, klik **Deploy**. Vercel akan secara otomatis mendeteksi file <code className="text-[#b8955a]">vercel.json</code>.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#b8955a] font-semibold bg-[#b8955a]/10 p-3 rounded-md border border-[#b8955a]/20">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#b8955a]" />
            <span>Auto-detect @vercel/node & routing</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 space-y-3">
          <div className="w-8 h-8 rounded-xs bg-[#b8955a]/10 text-[#b8955a] border border-[#b8955a]/20 font-bold text-xs flex items-center justify-center">
            3
          </div>
          <h3 className="font-serif italic text-base text-white">Atau Gunakan Vercel CLI</h3>
          <p className="text-xs text-white/50 leading-relaxed">
            Anda juga dapat mendeploy langsung via terminal dengan Vercel CLI:
          </p>
          <div className="bg-[#09090b] p-3 rounded-md border border-white/5 font-mono text-[11px] text-[#b8955a] flex items-center justify-between">
            <span>npm i -g vercel && vercel --prod</span>
            <button
              onClick={() => copyText('npm i -g vercel && vercel --prod', 'cmd')}
              className="text-white/40 hover:text-white cursor-pointer"
            >
              {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* vercel.json Inspection */}
      <div className="bg-[#0f0f12] border border-white/5 rounded-md p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-[#b8955a]" />
            <h3 className="font-serif italic text-base text-white">
              Konfigurasi vercel.json Terpasang
            </h3>
          </div>
          <button
            onClick={() => copyText(vercelJsonSnippet, 'config')}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-[#16161a] border border-white/5 hover:bg-[#1f1f26] text-white/70 hover:text-white transition-all cursor-pointer"
          >
            {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedConfig ? 'Tersalin' : 'Salin vercel.json'}</span>
          </button>
        </div>

        <p className="text-xs text-white/60">
          Berkas <code className="text-[#b8955a] font-mono">vercel.json</code> di akar repositori mengarahkan semua request API ke <code className="text-[#b8955a] font-mono">server.ts</code> yang dieksekusi sebagai Vercel Node.js Serverless Function.
        </p>

        <div className="bg-[#09090b] p-4 rounded-md border border-white/5 font-mono text-xs text-amber-100/80 overflow-x-auto">
          <pre>{vercelJsonSnippet}</pre>
        </div>
      </div>
    </div>
  );
};
