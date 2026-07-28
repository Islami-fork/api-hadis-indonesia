import React, { useState } from 'react';
import { Header } from './components/Header';
import { ApiTester } from './components/ApiTester';
import { HadithExplorer } from './components/HadithExplorer';
import { Documentation } from './components/Documentation';
import { VercelDeployGuide } from './components/VercelDeployGuide';
import { Heart, BookOpen, Terminal, Sparkles, UploadCloud, Github } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tester' | 'explorer' | 'docs' | 'vercel'>('tester');

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white font-sans flex flex-col selection:bg-[#b8955a] selection:text-black">
      {/* Sticky Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'tester' && <ApiTester />}
        {activeTab === 'explorer' && <HadithExplorer />}
        {activeTab === 'docs' && <Documentation />}
        {activeTab === 'vercel' && <VercelDeployGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0f0f12] py-8 text-white/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#b8955a]" />
            <span className="font-serif italic text-white/80">API Hadis Indonesia</span>
            <span className="text-white/20">•</span>
            <span>Kutubut Tis'ah (9 Kitab)</span>
          </div>

          <div className="flex items-center gap-4 text-white/50">
            <button
              onClick={() => setActiveTab('tester')}
              className="hover:text-[#b8955a] transition-colors cursor-pointer"
            >
              API Sandbox
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className="hover:text-[#b8955a] transition-colors cursor-pointer"
            >
              Dokumentasi
            </button>
            <button
              onClick={() => setActiveTab('vercel')}
              className="hover:text-[#b8955a] transition-colors cursor-pointer"
            >
              Deploy Vercel
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
