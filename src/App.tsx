import React, { useState } from 'react';
import type { MemoryItem, EvidenceCitation, LLMModel, QueryResult } from './types';
import { INITIAL_MEMORIES } from './data/mockMemories';
import { ASK_PAST_SCENARIOS } from './data/mockScenarios';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { HomeOverview } from './components/HomeOverview';
import { AnswerScreen } from './components/AnswerScreen';
import { AskPastView } from './components/AskPastView';
import { IdeaEvolutionView } from './components/IdeaEvolutionView';
import { PatternDetectionView } from './components/PatternDetectionView';
import { PastSelfView } from './components/PastSelfView';
import { MemoryDebateView } from './components/MemoryDebateView';
import { MemoryVaultView } from './components/MemoryVaultView';
import { EvidenceModal } from './components/EvidenceModal';
import { PrivacyDrawer } from './components/PrivacyDrawer';
import { IngestModal } from './components/IngestModal';
import { OnboardingModal } from './components/OnboardingModal';
import { WifiOff, HelpCircle } from 'lucide-react';
import { playChime } from './utils/audioSynth';

export type AppViewTab = ActiveTab | 'answer';

export function App() {
  const [activeTab, setActiveTab] = useState<AppViewTab>('home');
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceCitation | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [isPrivacyDrawerOpen, setIsPrivacyDrawerOpen] = useState(false);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState<LLMModel>('gemma-2b');

  // Active answer screen state
  const [activeQueryResult, setActiveQueryResult] = useState<QueryResult>(
    ASK_PAST_SCENARIOS['why-quit-project']
  );
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);

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

  // 16. Dedicated search query flow triggering the Answer Screen
  const handlePerformQuery = (queryText: string) => {
    const lower = queryText.toLowerCase();
    setIsAnswerLoading(true);
    setActiveTab('answer');

    setTimeout(() => {
      if (lower.includes('quit') || lower.includes('stop') || lower.includes('leave') || (lower.includes('project') && lower.includes('dev'))) {
        setActiveQueryResult(ASK_PAST_SCENARIOS['why-quit-project']);
      } else if (lower.includes('believe') || lower.includes('2024') || lower.includes('past belief')) {
        setActiveQueryResult(ASK_PAST_SCENARIOS['what-believed-2024']);
      } else if (lower.includes('startup') || lower.includes('ideas') || lower.includes('abandoned') || lower.includes('shelved')) {
        setActiveQueryResult(ASK_PAST_SCENARIOS['startup-ideas-abandoned']);
      } else if (lower.includes('speaking') || lower.includes('public')) {
        setActiveQueryResult({
          id: 'res-speaking',
          query: queryText,
          curatedDate: '2024 – 2025',
          confidenceScore: 94,
          confidenceLabel: 'High',
          supportingMemoriesCount: 7,
          answer: 'Your historical records directly contradict the belief that you are bad at public speaking:',
          synthesizedPoints: [
            'You won the Best Pitch & Storytelling Award at DevSprint 2024 in November.',
            'Dr. Sharma praised your keynote delivery in March 2025 for keeping 200 engineers captivated.',
            'You received an official university invite to deliver the orientation guest lecture.',
            'Your anxiety stems from internal anticipatory jitters (10-second freeze in Oct 2024), not your actual audience perception.'
          ],
          interestingNuance: 'You have 3.5x more documented instances of high external acclaim than documented stumbles.',
          evidence: [
            {
              memoryId: 'mem-403',
              date: 'November 24, 2024',
              title: 'DevSprint Pitch Award',
              source: 'Certificate / Photo Upload',
              type: 'screenshot',
              exactQuote: 'Awarded Best Pitch & Communication. Jury praised clarity and storytelling under pressure.',
              context: 'Empirical hackathon jury evaluation.',
              relevanceScore: 98,
              hash: 'sha256:0d1e2f3a...4f5a'
            },
            {
              memoryId: 'mem-404',
              date: 'March 22, 2025',
              title: 'Mentor debrief post-symposium',
              source: 'Voice Memo #38',
              type: 'voice',
              exactQuote: 'Your natural conversational cadence kept 200 engineers awake at 4 PM on a Saturday.',
              context: 'Dr. Sharma verbal feedback.',
              relevanceScore: 92,
              hash: 'sha256:1e2f3a4b...5a6b'
            }
          ],
          suggestedFollowUps: [
            'Show full adversarial breakdown in Memory Debate',
            'Did my standup nervousness decrease over time?'
          ]
        });
      } else {
        // Dynamic search across memories
        const matched = memories.filter(
          m => m.title.toLowerCase().includes(lower) || 
               m.content.toLowerCase().includes(lower) ||
               m.tags.some(t => t.toLowerCase().includes(lower))
        );

        if (matched.length > 0) {
          const first = matched[0];
          setActiveQueryResult({
            id: `dyn-${Date.now()}`,
            query: queryText,
            curatedDate: first.displayDate,
            confidenceScore: Math.min(95, 60 + matched.length * 10),
            confidenceLabel: matched.length >= 2 ? 'High' : 'Medium',
            supportingMemoriesCount: matched.length,
            answer: `Echo examined your historical memory index and synthesized ${matched.length} directly related memory record(s):`,
            synthesizedPoints: matched.slice(0, 3).map(m => `${m.title} (${m.displayDate}): ${m.excerpt}`),
            interestingNuance: `These memories were captured across ${Array.from(new Set(matched.map(m => m.source))).join(', ')}.`,
            evidence: matched.slice(0, 3).map(m => ({
              memoryId: m.id,
              date: m.displayDate,
              title: m.title,
              source: m.source,
              type: m.type,
              exactQuote: m.excerpt,
              context: `Retrieved via local vector similarity match.`,
              relevanceScore: 94,
              hash: m.hash,
            })),
            suggestedFollowUps: [
              `Show full context of ${first.title}`,
              `Did I mention this in other voice memos?`
            ]
          });
        } else {
          // 18. Empty / Weak evidence fallback state
          setActiveQueryResult({
            id: 'not-found',
            query: queryText,
            curatedDate: 'Today',
            confidenceScore: 22,
            confidenceLabel: 'Low',
            supportingMemoriesCount: 0,
            answer: `Echo couldn't find enough verified evidence matching "${queryText}".`,
            synthesizedPoints: [
              'Try asking: "Why did I decide to quit that project?"',
              'Try asking: "What did I believe in 2024?"',
              'Or ingest new WhatsApp chats, voice notes, or PDFs into your local vault.',
            ],
            evidence: [],
          });
        }
      }
      setIsAnswerLoading(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e2e8f0] flex flex-col font-sans">
      {/* 1. Header is permanently fixed at the top of the viewport */}
      <Header
        activeTab={activeTab === 'answer' ? 'ask' : activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
        onOpenPrivacy={() => setIsPrivacyDrawerOpen(true)}
        onOpenIngest={() => setIsIngestModalOpen(true)}
        selectedModel={selectedModel}
        memoryCount={memories.length}
      />

      {/* Main Container with generous top padding to ensure zero overlap with fixed header */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12">
        {/* Air-gap active indicator */}
        {isOfflineMode && (
          <div className="mb-6 bg-emerald-950/70 border border-emerald-600/50 rounded-xl px-4 py-2 text-center text-xs font-mono text-emerald-200 flex items-center justify-center gap-2 shadow-sm">
            <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
            <span>Air-Gapped Mode: Zero Network Calls • On-Device Vector Space Active</span>
          </div>
        )}

        {/* Home Overview */}
        {activeTab === 'home' && (
          <HomeOverview
            memories={memories}
            onSelectTab={(tab) => setActiveTab(tab)}
            onSelectMemory={handleOpenMemory}
            onSearchQuery={handlePerformQuery}
          />
        )}

        {/* 16. Dedicated Answer Screen */}
        {activeTab === 'answer' && (
          <AnswerScreen
            result={activeQueryResult}
            isLoading={isAnswerLoading}
            onBack={() => setActiveTab('home')}
            onOpenEvidence={handleOpenEvidence}
            onFollowUpClick={handlePerformQuery}
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
              onClick={() => setIsOnboardingOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300 flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How Echo Works</span>
            </button>
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

      {/* 17. First-Time Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartDemo={() => {
          setIsOnboardingOpen(false);
          handlePerformQuery('Why did I decide to quit that project?');
        }}
      />
    </div>
  );
}

export default App;
