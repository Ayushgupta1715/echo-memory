import React, { useState } from 'react';
import type { MemoryItem, EvidenceCitation, LLMModel } from './types';
import { INITIAL_MEMORIES } from './data/mockMemories';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { AskPastView } from './components/AskPastView';
import { IdeaEvolutionView } from './components/IdeaEvolutionView';
import { PatternDetectionView } from './components/PatternDetectionView';
import { PastSelfView } from './components/PastSelfView';
import { MemoryDebateView } from './components/MemoryDebateView';
import { MemoryVaultView } from './components/MemoryVaultView';
import { EvidenceModal } from './components/EvidenceModal';
import { PrivacyDrawer } from './components/PrivacyDrawer';
import { IngestModal } from './components/IngestModal';
import { 
  GitMerge, 
  Scale, 
  WifiOff, 
  ArrowRight
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('ask');
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceCitation | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [isPrivacyDrawerOpen, setIsPrivacyDrawerOpen] = useState(false);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState<LLMModel>('gemma-2b');

  const handleAddMemory = (newMem: MemoryItem) => {
    setMemories([newMem, ...memories]);
  };

  const handleBatchImportMock = () => {
    setMemories(INITIAL_MEMORIES);
  };

  const handleOpenEvidence = (citation: EvidenceCitation) => {
    setSelectedEvidence(citation);
    setSelectedMemory(null);
  };

  const handleOpenMemory = (item: MemoryItem) => {
    setSelectedMemory(item);
    setSelectedEvidence(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e2e8f0] flex flex-col font-sans">
      {/* Offline Alert Strip if air-gap is active */}
      {isOfflineMode && (
        <div className="bg-emerald-950/60 border-b border-emerald-800/60 px-4 py-2 text-center text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Air-Gapped Offline Mode Activated — All vector calculations & inference strictly on-device (Zero Cloud Leakage)</span>
        </div>
      )}

      {/* Main App Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
        onOpenPrivacy={() => setIsPrivacyDrawerOpen(true)}
        onOpenIngest={() => setIsIngestModalOpen(true)}
        selectedModel={selectedModel}
        memoryCount={memories.length}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'ask' && (
          <div className="space-y-12">
            <AskPastView
              memories={memories}
              onOpenEvidence={handleOpenEvidence}
              onOpenMemory={handleOpenMemory}
            />

            {/* Quick Feature Jump Banners */}
            <div className="max-w-3xl mx-auto pt-6 border-t border-[#181c2b]">
              <div className="text-center pb-4">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold">
                  Echo Core Capabilities
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab('evolution')}
                  className="p-4 rounded-xl bg-[#121522] hover:bg-[#181c2c] border border-[#22283a] hover:border-amber-500/40 text-left transition-all group flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GitMerge className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold text-white text-sm group-hover:text-amber-300">
                        You Already Knew This
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Detect duplicate and evolving thoughts across years to create actionable MVPs.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors mt-1" />
                </button>

                <button
                  onClick={() => setActiveTab('debate')}
                  className="p-4 rounded-xl bg-[#121522] hover:bg-[#181c2c] border border-[#22283a] hover:border-amber-500/40 text-left transition-all group flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold text-white text-sm group-hover:text-amber-300">
                        Memory Debate
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Challenge self-limiting stories using empirical evidence from your past.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors mt-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evolution' && (
          <IdeaEvolutionView
            onOpenMemoryById={(id) => {
              const found = memories.find((m) => m.id === id);
              if (found) handleOpenMemory(found);
            }}
          />
        )}

        {activeTab === 'patterns' && <PatternDetectionView />}

        {activeTab === 'past-self' && <PastSelfView />}

        {activeTab === 'debate' && <MemoryDebateView />}

        {activeTab === 'vault' && (
          <MemoryVaultView
            memories={memories}
            onSelectMemory={handleOpenMemory}
            onOpenIngest={() => setIsIngestModalOpen(true)}
          />
        )}
      </main>

      {/* Footer Manifesto & Open Source Attribution */}
      <footer className="mt-auto border-t border-[#181b28] bg-[#090a0e] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider font-sans">ECHO</span>
            <span>•</span>
            <span>Private AI Memory Layer</span>
            <span>•</span>
            <span className="font-mono text-emerald-400">100% On-Device Capable</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <button
              onClick={() => setIsPrivacyDrawerOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Architecture & Open Weights
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Inspect Vault ({memories.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Evidence & Context Inspector Modal */}
      {(selectedEvidence || selectedMemory) && (
        <EvidenceModal
          evidence={selectedEvidence}
          memoryItem={selectedMemory || undefined}
          onClose={() => {
            setSelectedEvidence(null);
            setSelectedMemory(null);
          }}
        />
      )}

      {/* Local-First Architecture & Open Weights Drawer */}
      <PrivacyDrawer
        isOpen={isPrivacyDrawerOpen}
        onClose={() => setIsPrivacyDrawerOpen(false)}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />

      {/* Ingestion Dropzone Modal */}
      <IngestModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        onAddMemory={handleAddMemory}
        onBatchImportMock={handleBatchImportMock}
      />
    </div>
  );
}

export default App;
