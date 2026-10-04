import React, { useState } from 'react';
import type { MemoryItem } from '../types';
import type { ActiveTab } from './Header';
import { 
  Search, 
  Brain, 
  GitMerge, 
  Compass, 
  History, 
  Scale, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Lock,
  MessageSquare,
  Mic,
  FileText,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { playChime } from '../utils/audioSynth';

interface HomeOverviewProps {
  memories: MemoryItem[];
  onSelectTab: (tab: ActiveTab) => void;
  onSelectMemory: (item: MemoryItem) => void;
  onSearchQuery: (query: string) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  memories,
  onSelectTab,
  onSelectMemory,
  onSearchQuery,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    playChime(400, 'sine', 0.2);
    onSearchQuery(searchInput);
  };

  const handleExampleChipClick = (queryText: string) => {
    playChime(420, 'sine', 0.15);
    setSearchInput(queryText);
    onSearchQuery(queryText);
  };

  const handleAction = (tab: ActiveTab, queryPreset?: string) => {
    playChime(360, 'sine', 0.15);
    if (queryPreset) {
      onSearchQuery(queryPreset);
    } else {
      onSelectTab(tab);
    }
  };

  // Curated timeline milestones for the homepage spine with source metadata
  const timelineMilestones = [
    {
      date: 'Sep 15, 2025',
      displayMonth: 'Sep 2025',
      title: 'Auditorium speech victory (342/410 votes)',
      category: 'Leadership / Speaking',
      sourceType: 'note',
      sourceName: 'Obsidian Journal',
      memoryId: 'mem-407',
      hint: 'Delivered 5-min talk with zero notes. Felt adrenaline, zero panic.',
    },
    {
      date: 'Aug 30, 2025',
      displayMonth: 'Aug 2025',
      title: 'Client VP approves architecture review on the spot',
      category: 'Work / Architecture',
      sourceType: 'note',
      sourceName: 'Zoom Transcript',
      memoryId: 'mem-406',
      hint: 'Praise for clearest product breakdown seen all quarter.',
    },
    {
      date: 'Jul 28, 2025',
      displayMonth: 'Jul 2025',
      title: 'Europe travel itinerary & Spanish study intention',
      category: 'Habit / Travel',
      sourceType: 'pdf',
      sourceName: 'Flight PDF Itinerary',
      memoryId: 'mem-305',
      hint: 'Aspirational drift #5: Spanish restaurant phrases.',
    },
    {
      date: 'May 18, 2025',
      displayMonth: 'May 2025',
      title: 'Department Chair invitation for freshman keynote',
      category: 'Recognition / Speaking',
      sourceType: 'chat',
      sourceName: 'WhatsApp / Prof. Kulkarni',
      memoryId: 'mem-405',
      hint: 'Rare gift for making complex engineering approachable to beginners.',
    },
    {
      date: 'Mar 12, 2025',
      displayMonth: 'Mar 2025',
      title: 'Why I decided to quit the dev-tool project',
      category: 'Decision / Side-project',
      sourceType: 'chat',
      sourceName: 'WhatsApp / Rohan',
      memoryId: 'mem-101',
      hint: 'Scope explosion, 3 hrs/night debugging, summer internship focus.',
    },
    {
      date: 'Nov 24, 2024',
      displayMonth: 'Nov 2024',
      title: 'Best Pitch & Storytelling Award at DevSprint',
      category: 'Achievement / Hackathon',
      sourceType: 'screenshot',
      sourceName: 'Award Certificate',
      memoryId: 'mem-403',
      hint: 'Jury unanimously praised narrative and handling adversarial Q&A.',
    },
    {
      date: 'Aug 14, 2024',
      displayMonth: 'Aug 2024',
      title: 'Student Expense Tracker (Iteration 1)',
      category: 'Idea / Fintech',
      sourceType: 'idea',
      sourceName: 'Obsidian Scratchpad',
      memoryId: 'mem-201',
      hint: 'Initial manual tallying concept before SMS and on-device AI evolution.',
    },
  ];

  const getSpineIcon = (type: string) => {
    switch (type) {
      case 'voice':
        return <Mic className="w-3.5 h-3.5 text-amber-400" />;
      case 'chat':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-400" />;
      case 'idea':
        return <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-300 py-1 sm:py-4">
      {/* 4. Editorial Title Section (Tighter spacing) */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight font-sans">
          ECHO
        </h1>
        <p className="text-xl sm:text-2xl text-amber-200/95 font-serif-display italic">
          Talk to the person you used to be.
        </p>
        
        {/* 6. "Built for Ayush" Subtitle badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161a29] border border-[#272f48] text-xs font-mono text-slate-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-300">Built for Ayush</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">21 historical memories indexed</span>
          </div>
          <p className="text-xs text-slate-400 italic max-w-md mx-auto">
            &ldquo;I know I&apos;ve thought about this before&hellip; I just can&apos;t remember where.&rdquo;
          </p>
        </div>
      </div>

      {/* 5. Main Search Bar & Example Chips */}
      <div className="space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ask your past anything... (e.g. Why did I decide to quit that project?)"
              className="w-full pl-12 pr-24 py-4 rounded-2xl bg-[#12141e] border border-[#23293d] focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-400 text-sm sm:text-base outline-none shadow-xl transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md cursor-pointer"
            >
              Ask
            </button>
          </div>
        </form>

        {/* 5. Example Chips Row */}
        <div className="flex flex-wrap items-center gap-1.5 px-1 pt-1">
          <span className="text-[11px] font-mono text-slate-400 font-semibold mr-1">
            Try asking:
          </span>
          {[
            'Why did I quit that project?',
            'What did I believe in 2024?',
            'What startup ideas have I abandoned?',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleExampleChipClick(prompt)}
              className="px-2.5 py-1 rounded-lg bg-[#141826] hover:bg-[#1f253a] text-xs text-slate-200 hover:text-white border border-[#242b3e] hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {/* 12. Contrast-enhanced Security Strip */}
        <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-300 font-mono">
          <span>Encrypted on SSD • Zero Cloud Storage</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Private
          </span>
        </div>
      </div>

      {/* 2 & 7. Feature Cards: 3 + 2 Grid on Desktop */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {/* Row 1: 3 cards (col-span-2 each) */}
          <button
            onClick={() => handleAction('ask', 'Why did I decide to quit that project?')}
            className="md:col-span-2 p-4 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-slate-500 text-left transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                  Ask My Past
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Why did I quit that project? Evidence-backed query answers.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span>Try Query</span> <ChevronRight className="w-3 h-3 text-slate-500" />
            </div>
          </button>

          {/* 7. Highlighted Hero Card: You Already Knew This */}
          <button
            onClick={() => handleAction('evolution')}
            className="md:col-span-2 p-4 rounded-xl bg-[#171a29] hover:bg-[#1f2338] border-2 border-amber-500/60 shadow-lg shadow-amber-500/10 text-left transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitMerge className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-xs text-amber-200">
                    You Already Knew This
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                  Hero
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Connects 3 student finance iterations across 2024–2026 into a unified MVP.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1">
              <span>Synthesize Idea</span> <ChevronRight className="w-3 h-3" />
            </div>
          </button>

          <button
            onClick={() => handleAction('patterns')}
            className="md:col-span-2 p-4 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-slate-500 text-left transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                  Find Pattern
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Detects "Learn Spanish" mentioned 7 times in 9 months without starting.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span>View Drift</span> <ChevronRight className="w-3 h-3 text-slate-500" />
            </div>
          </button>

          {/* Row 2: 2 cards (col-span-3 each) */}
          <button
            onClick={() => handleAction('debate')}
            className="md:col-span-3 p-4 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-slate-500 text-left transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                  Challenge My Memory
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "I was always bad at public speaking" — 2 anxiety memories vs 7 documented awards.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span>Run Debate</span> <ChevronRight className="w-3 h-3 text-slate-500" />
            </div>
          </button>

          {/* 3. Shortened text for Talk to Past Self */}
          <button
            onClick={() => handleAction('past-self')}
            className="md:col-span-3 p-4 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-slate-500 text-left transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                  Talk to Past Self
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Time-capsule persona: June 2024 / March 2025 with zero hindsight bias.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span>Open Time Machine</span> <ChevronRight className="w-3 h-3 text-slate-500" />
            </div>
          </button>
        </div>
      </div>

      {/* 9, 10, 11, 13. Your Chronological Timeline Spine */}
      <div className="space-y-5 pt-4 border-t border-[#1a1e2d]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-bold">
            YOUR TIMELINE
          </h2>
          <button
            onClick={() => onSelectTab('vault')}
            className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Full Vault ({memories.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal spine list with drawn icons (9) and source chip modal triggers (10) */}
        <div className="relative pl-8 sm:pl-10 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#22273d]">
          {timelineMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* 9. Drawn icon inside marker circle */}
              <div className="absolute -left-8 sm:-left-10 top-2 w-6 h-6 rounded-full border-2 border-amber-400/80 bg-[#12141f] flex items-center justify-center group-hover:scale-115 transition-transform">
                {getSpineIcon(item.sourceType)}
              </div>

              <div className="p-4 rounded-xl bg-[#12141f] hover:bg-[#181c2d] border border-[#202538] hover:border-amber-500/40 transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  {/* 11. Larger date and tag fonts */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm">
                      {item.displayMonth}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs font-medium text-slate-300 bg-[#191d2c] px-2 py-0.5 rounded border border-[#272e44]">
                      {item.category}
                    </span>
                  </div>

                  {/* 10. Source chip that triggers modal */}
                  <button
                    onClick={() => {
                      playChime(350, 'sine', 0.15);
                      const mem = memories.find((m) => m.id === item.memoryId);
                      if (mem) onSelectMemory(mem);
                    }}
                    className="text-[11px] font-mono text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-md border border-amber-500/30 flex items-center gap-1.5 w-fit transition-colors cursor-pointer"
                  >
                    <span>Source: {item.sourceName}</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </button>
                </div>

                <div 
                  onClick={() => {
                    playChime(350, 'sine', 0.15);
                    const mem = memories.find((m) => m.id === item.memoryId);
                    if (mem) onSelectMemory(mem);
                  }}
                  className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {item.title}
                </div>

                {/* 13. Larger card description text */}
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {item.hint}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
