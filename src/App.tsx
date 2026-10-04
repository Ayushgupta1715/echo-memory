import React, { useState } from 'react';
import type { MemoryItem, EvidenceCitation, LLMModel } from './types';
import { INITIAL_MEMORIES } from './data/mockMemories';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { HomeOverview } from './components/HomeOverview';
import { AskPastView } from './components/AskPastView';
import { IdeaEvolutionView } from './components/IdeaEvolutionView';
import { PatternDetectionView } from './components/PatternDetectionView';
import { PastSelfView } from './components/PastSelfView';
import { MemoryDebateView } from './components/MemoryDebateView';
import { MemoryVaultView } from './components/MemoryVaultView';
import { EvidenceModal } from './components/EvidenceModal';
import { PrivacyDrawer } from './components/PrivacyDrawer';
import { IngestModal } from './components/IngestModal';
import { WifiOff } from 'lucide-react';
import { playChime } from './utils/audioSynth';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
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
    playChime(420, 'sine', 0.15);
    setSelectedEvidence(citation);
    setSelectedMemory(null);
  };

  const handleOpenMemory = (item: MemoryItem) => {
    playChime(420, 'sine', 0.15);
    setSelectedMemory(item);
    setSelectedEvidence(null);
  };

  const handleSearchFromHome = (query: string) => {
    setActiveTab('ask');
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e2e8f0] flex flex-col font-sans">
      {/* Offline Alert Strip if air-gap is active */}
      {isOfflineMode && (
        <div className="bg-emerald-950/70 border-b border-emerald-700/60 px-4 py-2 text-center text-xs font-mono text-emerald-200 flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
          <span>Air-Gapped Mode: Zero Network Calls • In-Memory IndexedDB Vector Space</span>
        </div>
      )}

      {/* Main Navigation */}
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

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'home' && (
          <HomeOverview
            memories={memories}
            onSelectTab={setActiveTab}
            onSelectMemory={handleOpenMemory}
            onSearchQuery={handleSearchFromHome}
          />
        )}

        {activeTab === 'ask' && (
          <AskPastView
            memories={memories}
            onOpenEvidence={handleOpenEvidence}
            onOpenMemory={handleOpenMemory}
          />
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

      {/* Footer */}
      <footer className="mt-auto border-t border-[#181b28] bg-[#090a0e] py-6 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white tracking-wider font-sans">ECHO</span>
            <span>•</span>
            <span>Talk to the person you used to be</span>
            <span>•</span>
            <span className="font-mono text-emerald-400">Air-Gapped Capable</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <button
              onClick={() => setIsPrivacyDrawerOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300"
            >
              Open Weights Architecture
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300"
            >
              Vault Archive ({memories.length})
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

      {/* Local-First Architecture Drawer */}
      <PrivacyDrawer
        isOpen={isPrivacyDrawerOpen}
        onClose={() => setIsPrivacyDrawerOpen(false)}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />

      {/* Ingestion Modal */}
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
