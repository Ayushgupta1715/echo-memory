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
  Play
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

  const handleAction = (tab: ActiveTab, queryPreset?: string) => {
    playChime(360, 'sine', 0.15);
    if (queryPreset) {
      onSearchQuery(queryPreset);
    } else {
      onSelectTab(tab);
    }
  };

  // Curated timeline milestones for the homepage spine
  const timelineMilestones = [
    {
      date: 'Sep 2025',
      title: 'Auditorium speech victory (342/410 votes)',
      category: 'Speaking / Leadership',
      memoryId: 'mem-407',
      hint: 'Delivered 5-min talk with zero notes. Felt adrenaline, zero panic.',
    },
    {
      date: 'Aug 2025',
      title: 'Client VP approves architecture review on the spot',
      category: 'Career / Engineering',
      memoryId: 'mem-406',
      hint: 'Praise for clearest product breakdown seen all quarter.',
    },
    {
      date: 'Jul 2025',
      title: 'Europe travel itinerary & Spanish study intention',
      category: 'Habit / Travel',
      memoryId: 'mem-305',
      hint: 'Aspirational drift #5: Spanish restaurant phrases.',
    },
    {
      date: 'May 2025',
      title: 'Department Chair invitation for freshman keynote',
      category: 'Recognition / Speaking',
      memoryId: 'mem-405',
      hint: 'Rare gift for making complex engineering approachable.',
    },
    {
      date: 'Mar 2025',
      title: 'Why I decided to quit the dev-tool project',
      category: 'Decision / Side-project',
      memoryId: 'mem-101',
      hint: 'Scope explosion, 3 hrs/night debugging, summer internship focus.',
    },
    {
      date: 'Nov 2024',
      title: 'Best Pitch & Storytelling Award at DevSprint',
      category: 'Achievement / Hackathon',
      memoryId: 'mem-403',
      hint: 'Jury unanimously praised narrative and handling adversarial Q&A.',
    },
    {
      date: 'Aug 2024',
      title: 'Student Expense Tracker (Iteration 1)',
      category: 'Idea / Fintech',
      memoryId: 'mem-201',
      hint: 'Initial manual tallying concept before SMS and on-device AI evolution.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-300 py-4 sm:py-8">
      {/* Editorial Title Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight font-sans">
          ECHO
        </h1>
        <p className="text-xl sm:text-2xl text-amber-200/95 font-serif-display italic">
          Talk to the person you used to be.
        </p>
        <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          Your digital past—WhatsApp chats, voice memos, notes, and ideas—secured on your machine and ready to challenge your assumptions.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ask your past anything... (e.g. Why did I decide to quit that project?)"
              className="w-full pl-12 pr-28 py-4 rounded-2xl bg-[#12141e] border border-[#23293d] focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-400 text-sm sm:text-base outline-none shadow-xl transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md cursor-pointer"
            >
              Ask
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between px-2 text-xs text-slate-400 font-mono">
          <span>Encrypted on SSD • Zero Cloud Storage</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Private
          </span>
        </div>
      </div>

      {/* Quick Action Navigation Strip */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => handleAction('ask', 'Why did I decide to quit that project?')}
            className="p-3.5 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-amber-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                Ask My Past
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Why did I quit that project?
            </p>
          </button>

          <button
            onClick={() => handleAction('evolution')}
            className="p-3.5 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-amber-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <GitMerge className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                You Already Knew This
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Student money app evolution (3 iterations)
            </p>
          </button>

          <button
            onClick={() => handleAction('patterns')}
            className="p-3.5 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-amber-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                Find Pattern
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Spanish mentioned 7 times in 9 months
            </p>
          </button>

          <button
            onClick={() => handleAction('debate')}
            className="p-3.5 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-amber-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                Challenge My Memory
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              "I was always bad at public speaking"
            </p>
          </button>

          <button
            onClick={() => handleAction('past-self')}
            className="p-3.5 rounded-xl bg-[#131624] hover:bg-[#1a1f33] border border-[#22283e] hover:border-amber-500/50 text-left transition-all group cursor-pointer col-span-2 sm:col-span-1"
          >
            <div className="flex items-center gap-2 mb-1">
              <History className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white text-xs group-hover:text-amber-300">
                Talk to Past Self
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Time machine persona: June 2024 / March 2025
            </p>
          </button>
        </div>
      </div>

      {/* Your Chronological Timeline Spine */}
      <div className="space-y-5 pt-4 border-t border-[#1a1e2d]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 font-bold">
            YOUR TIMELINE
          </h2>
          <button
            onClick={() => onSelectTab('vault')}
            className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Full Vault ({memories.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal spine list */}
        <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#22273d]">
          {timelineMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Spine marker */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full border-2 border-amber-400 bg-[#0b0c10] group-hover:scale-125 transition-transform" />

              <div
                onClick={() => {
                  playChime(350, 'sine', 0.15);
                  const mem = memories.find((m) => m.id === item.memoryId);
                  if (mem) onSelectMemory(mem);
                }}
                className="p-3.5 rounded-xl bg-[#12141f] hover:bg-[#181c2d] border border-[#202538] hover:border-amber-500/40 transition-all cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-amber-400">
                    ● {item.date}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.category}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
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
