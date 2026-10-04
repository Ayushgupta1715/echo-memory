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

export type ActiveTab = 'ask' | 'evolution' | 'patterns' | 'past-self' | 'debate' | 'vault';

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
      case 'gemma-2b': return 'Gemma 2B';
      case 'llama-3.2-3b': return 'Llama 3.2 3B';
      case 'qwen-2.5-7b': return 'Qwen 2.5 7B';
      case 'mistral-nemo': return 'Mistral Nemo';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#1b1f2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Brand + Privacy badge & controls */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Manifesto */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectTab('ask')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-black font-bold">
                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10v3" />
                  <path d="M6 6v11" />
                  <path d="M10 3v18" />
                  <path d="M14 8v7" />
                  <path d="M18 5v13" />
                  <path d="M22 10v4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                    ECHO
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                    v0.9 Local
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline font-sans">
                  Private AI memory layer
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Cluster: Offline Demo toggle + Privacy Drawer + Ingest */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Air-gap / Offline Status button */}
            <button
              onClick={onToggleOffline}
              title={isOfflineMode ? "Air-Gap Active: 100% on-device queries" : "Click to test air-gapped offline capability"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                isOfflineMode
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/50 shadow-sm shadow-emerald-500/10'
                  : 'bg-[#141724] text-slate-400 border-[#242b3e] hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400 hidden sm:inline">Air-Gapped</span>
                  <span className="sm:hidden font-semibold text-emerald-400">Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Simulate Offline</span>
                  <span className="sm:hidden">Offline</span>
                </>
              )}
            </button>

            {/* Model Architecture pill */}
            <button
              onClick={onOpenPrivacy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#141724] hover:bg-[#1c2236] text-slate-300 border border-[#23293e] transition-colors font-mono cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline text-slate-400">Engine:</span>
              <span className="font-semibold text-amber-300">{getModelLabel()}</span>
            </button>

            {/* Ingest Memory CTA */}
            <button
              onClick={onOpenIngest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ingest Past</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Bottom row: Primary Navigation Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-[#161a27] text-xs">
          <button
            onClick={() => onSelectTab('ask')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ask'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-[#141724]'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>1. Ask My Past</span>
          </button>

          <button
            onClick={() => onSelectTab('evolution')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap relative cursor-pointer ${
              activeTab === 'evolution'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-[#141724]'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5 text-amber-400" />
            <span>2. You Already Knew This</span>
            <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-mono font-bold">
              Hero
            </span>
          </button>

          <button
            onClick={() => onSelectTab('patterns')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'patterns'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-[#141724]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3. Pattern Radar</span>
          </button>

          <button
            onClick={() => onSelectTab('past-self')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'past-self'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-[#141724]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>4. Talk to Past Self</span>
          </button>

          <button
            onClick={() => onSelectTab('debate')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'debate'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-[#141724]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>5. Memory Debate</span>
          </button>

          <button
            onClick={() => onSelectTab('vault')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-[#141724]'
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
