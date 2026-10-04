import React, { useState } from 'react';
import { SPANISH_PATTERN_DATA } from '../data/mockScenarios';
import { 
  Compass, 
  BellRing, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Lightbulb, 
  TrendingUp, 
  Target,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const PatternDetectionView: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(SPANISH_PATTERN_DATA);
  const [expandedOccurrence, setExpandedOccurrence] = useState<number | null>(null);

  const alternatePatterns = [
    {
      id: 'pat-spanish',
      title: 'Aspirational Drift: Learning Spanish',
      count: '7 mentions',
      timeframe: '9 months',
      badge: 'Language / Habit',
    },
    {
      id: 'pat-speaking',
      title: 'Anticipatory Anxiety before Big Launches',
      count: '4 spikes',
      timeframe: '12 months',
      badge: 'Mindset / Adrenaline',
    },
    {
      id: 'pat-caffeine',
      title: 'Weekend Sleep & Caffeine Cycling',
      count: '5 notes',
      timeframe: '6 months',
      badge: 'Energy / Health',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium">
          <Compass className="w-3.5 h-3.5" /> Future Echo: Cross-Temporal Radar
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Pattern Radar
        </h1>
        <p className="text-lg text-amber-200/90 font-serif-display italic">
          "Echo doesn't just retrieve your history. It discovers who you repeatedly try to become."
        </p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          Uncovering aspirational drift, chronic postponement, and hidden psychological friction across months of scattered entries.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Pattern Selector Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {alternatePatterns.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPattern(SPANISH_PATTERN_DATA)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                selectedPattern.id === p.id
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/5'
                  : 'bg-[#131622] border-[#22283a] text-slate-400 hover:text-white'
              }`}
            >
              <span>{p.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-300">
                {p.count}
              </span>
            </button>
          ))}
        </div>

        {/* Hero Pattern Notification Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#11131c] border-2 border-amber-500/30 shadow-2xl space-y-6">
          {/* Alert Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#202538]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <BellRing className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Recurring Behavioral Pattern Detected
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  "{selectedPattern.title}"
                </h2>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">Occurrences</span>
              <span className="text-lg font-bold text-amber-400 font-mono">
                {selectedPattern.detectionCount} times
              </span>
            </div>
          </div>

          {/* The Pattern Revelation */}
          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-200 text-sm sm:text-base leading-relaxed space-y-2">
            <p className="font-semibold text-white">
              {selectedPattern.summary}
            </p>
            <p className="text-xs text-amber-300/90 font-mono">
              Timeline span: {selectedPattern.timeframe} across notes, chats, flight receipts & audio memos.
            </p>
          </div>

          {/* Chronological Occurrence Strip */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Documented Timeline of Mentions:
            </span>
            <div className="space-y-2">
              {selectedPattern.occurrences.map((occ, idx) => (
                <div
                  key={idx}
                  onClick={() => setExpandedOccurrence(expandedOccurrence === idx ? null : idx)}
                  className="p-3.5 rounded-xl bg-[#151926] hover:bg-[#1b2030] border border-[#23293c] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#20263c] text-amber-300 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="font-mono text-amber-400 font-semibold shrink-0">
                      {occ.date}
                    </span>
                    <span className="text-slate-300 truncate max-w-sm">
                      {occ.context}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-mono shrink-0 self-end sm:self-auto">
                    <span>{occ.source}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Root-Cause Barrier Diagnosis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#171a27] border border-[#272e42] space-y-2">
              <span className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Why You Stalled (Root Barrier)
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedPattern.detectedBarrier}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171a27] border border-[#272e42] space-y-2">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Suggested Habit Unlock
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedPattern.suggestedUnlock}
              </p>
            </div>
          </div>

          {/* Proactive Inquiry */}
          <div className="p-4 rounded-xl bg-[#0e111a] border border-[#1f2538] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400">
              Echo can monitor upcoming weekly calendar schedules to nudge you at the optimal tea-time window.
            </div>
            <button
              onClick={() => alert("Scheduled local micro-habit reminder anchored to your tea routine!")}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold whitespace-nowrap transition-colors"
            >
              Activate Micro-Habit Anchor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
