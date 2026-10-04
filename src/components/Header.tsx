import React from 'react';
import type { LLMModel } from '../types';
import { 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  PlusCircle, 
  GitMerge, 
  Brain, 
  History, 
  Compass, 
  Scale, 
  Layers
} from 'lucide-react';
import { playChime } from '../utils/audioSynth';

export type ActiveTab = 'home' | 'ask' | 'evolution' | 'patterns' | 'past-self' | 'debate' | 'vault';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
  onOpenPrivacy: () => void;
  onOpenIngest: () => void;
  selectedModel: LLMModel;
  memoryCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isOfflineMode,
  onToggleOffline,
  onOpenPrivacy,
  onOpenIngest,
  selectedModel,
  memoryCount,
}) => {
  const getModelLabel = () => {
    switch (selectedModel) {
      case 'gemma-2b': return 'Local SLM (Edge Demo)';
      case 'llama-3.2-3b': return 'Llama 3.2 3B (Local)';
      case 'qwen-2.5-7b': return 'Qwen 2.5 7B (Local)';
      case 'mistral-nemo': return 'Mistral Nemo (Local)';
    }
  };

  const handleTabClick = (tab: ActiveTab) => {
    playChime(320, 'sine', 0.15);
    onSelectTab(tab);
  };

  const handleOfflineToggle = () => {
    playChime(isOfflineMode ? 440 : 280, 'triangle', 0.25);
    onToggleOffline();
  };

  return (
    /* 1. Header is permanently fixed at the top of the viewport with high z-index and zero overlap */
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c10]/98 backdrop-blur-xl border-b border-[#1c1f2e] shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleTabClick('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black font-extrabold shadow-sm shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 10v4" />
                <path d="M6 6v12" />
                <path d="M10 2v20" />
                <path d="M14 7v10" />
                <path d="M18 5v14" />
                <path d="M22 10v4" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                ECHO
              </span>
              <span className="text-[11px] font-mono text-slate-400 font-medium">
                memory layer
              </span>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 14. Real Interactive Air-Gap Toggle Switch */}
            <button
              onClick={handleOfflineToggle}
              title={isOfflineMode ? "Air-Gap Active: 100% on-device queries" : "Click to test air-gapped offline capability"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                isOfflineMode
                  ? 'bg-emerald-950/70 text-emerald-200 border-emerald-500/80 shadow-md shadow-emerald-500/20'
                  : 'bg-[#141724] text-slate-300 border-[#262c3e] hover:border-slate-500'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isOfflineMode ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="font-semibold">
                {isOfflineMode ? 'Offline Mode: ON' : 'Offline Mode: OFF'}
              </span>
              {/* Mechanical toggle slider visual */}
              <div className={`w-7 h-3.5 rounded-full p-0.5 flex items-center transition-colors ${
                isOfflineMode ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
              }`}>
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
              </div>
            </button>

            {/* 15. Honest Model Badge */}
            <button
              onClick={() => {
                playChime(380, 'sine', 0.15);
                onOpenPrivacy();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#131622] hover:bg-[#1a1f30] text-slate-200 border border-[#22283a] transition-colors font-mono cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{getModelLabel()}</span>
            </button>

            {/* Ingest Memory CTA */}
            <button
              onClick={() => {
                playChime(420, 'sine', 0.15);
                onOpenIngest();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Ingest</span>
            </button>
          </div>
        </div>

        {/* Secondary Subnav Strip */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-[#181c2a] text-xs">
          <button
            onClick={() => handleTabClick('home')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'home'
                ? 'bg-amber-500/15 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => handleTabClick('ask')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ask'
                ? 'bg-amber-500/15 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Ask My Past</span>
          </button>

          <button
            onClick={() => handleTabClick('evolution')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'evolution'
                ? 'bg-amber-500/15 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5 text-amber-400" />
            <span>You Already Knew This</span>
          </button>

          <button
            onClick={() => handleTabClick('patterns')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'patterns'
                ? 'bg-amber-500/15 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Pattern Radar</span>
          </button>

          <button
            onClick={() => handleTabClick('past-self')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'past-self'
                ? 'bg-amber-500/15 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Talk to Past Self</span>
          </button>

          <button
            onClick={() => handleTabClick('debate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'debate'
                ? 'bg-amber-500/15 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Memory Debate</span>
          </button>

          <button
            onClick={() => handleTabClick('vault')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-amber-500/15 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Timeline Vault ({memoryCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
