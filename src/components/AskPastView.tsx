import React, { useState } from 'react';
import type { MemoryItem, QueryResult, EvidenceCitation } from '../types';
import { ASK_PAST_SCENARIOS } from '../data/mockScenarios';
import { 
  Search, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Mic, 
  MessageSquare, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface AskPastViewProps {
  memories: MemoryItem[];
  onOpenEvidence: (citation: EvidenceCitation) => void;
  onOpenMemory: (item: MemoryItem) => void;
}

export const AskPastView: React.FC<AskPastViewProps> = ({
  memories,
  onOpenEvidence,
  onOpenMemory,
}) => {
  const [query, setQuery] = useState('Why did I decide to quit that project?');
  const [activeResult, setActiveResult] = useState<QueryResult | null>(
    ASK_PAST_SCENARIOS['why-quit-project']
  );
  const [isSearching, setIsSearching] = useState(false);

  const samplePrompts = [
    { label: 'Why did I quit that project?', key: 'why-quit-project' },
    { label: 'What startup ideas have I abandoned?', key: 'startup-ideas-abandoned' },
  ];

  const handleSelectScenario = (key: string) => {
    const scenario = ASK_PAST_SCENARIOS[key];
    if (scenario) {
      setQuery(scenario.query);
      setIsSearching(true);
      setTimeout(() => {
        setActiveResult(scenario);
        setIsSearching(false);
      }, 350);
    }
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);

    setTimeout(() => {
      // Check if matches known scenarios
      const lower = query.toLowerCase();
      if (lower.includes('quit') || lower.includes('stop') || lower.includes('abandon') && lower.includes('project')) {
        setActiveResult(ASK_PAST_SCENARIOS['why-quit-project']);
      } else if (lower.includes('startup') || lower.includes('ideas') || lower.includes('shelved')) {
        setActiveResult(ASK_PAST_SCENARIOS['startup-ideas-abandoned']);
      } else {
        // Dynamic search across memories
        const matched = memories.filter(
          m => m.title.toLowerCase().includes(lower) || 
               m.content.toLowerCase().includes(lower) ||
               m.tags.some(t => t.toLowerCase().includes(lower))
        );

        if (matched.length > 0) {
          const first = matched[0];
          const dynamicResult: QueryResult = {
            id: `dyn-${Date.now()}`,
            query: query,
            curatedDate: first.displayDate,
            answer: `Echo examined your historical memory index and retrieved ${matched.length} directly related memory record(s):`,
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
          };
          setActiveResult(dynamicResult);
        } else {
          setActiveResult({
            id: 'not-found',
            query: query,
            curatedDate: 'Today',
            answer: `No historical memories strongly matched "${query}".`,
            synthesizedPoints: [
              'Try asking about the dev-tool project you paused in March 2025.',
              'Try asking about student expense tracker startup ideas.',
              'Or ingest new WhatsApp chats, voice notes, or PDFs into your local vault.',
            ],
            evidence: [],
          });
        }
      }
      setIsSearching(false);
    }, 400);
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Mic className="w-3.5 h-3.5 text-amber-400" />;
      case 'chat': return <MessageSquare className="w-3.5 h-3.5 text-blue-400" />;
      case 'idea': return <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <FileText className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Ask My Past
        </h1>
        <p className="text-lg text-amber-200/90 font-serif-display italic">
          "Echo turns your digital past into something you can talk to."
        </p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          Traditional AI says <span className="text-slate-300 font-medium">"Trust me, I'm an LLM."</span> Echo says <span className="text-amber-400 font-medium">"Here is the exact evidence why you decided this."</span>
        </p>
      </div>

      {/* Query Input Container */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleCustomSearch} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your past anything... e.g. Why did I decide to quit that project?"
              className="w-full pl-12 pr-28 py-4 rounded-2xl bg-[#121520] border border-[#252b3e] focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-500 text-sm sm:text-base outline-none transition-all shadow-xl"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-all active:scale-95 disabled:opacity-50"
            >
              {isSearching ? 'Querying...' : 'Search Past'}
            </button>
          </div>
        </form>

        {/* Suggested Quick Prompt Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 mr-1">
            Try asking:
          </span>
          {samplePrompts.map((p) => (
            <button
              key={p.key}
              onClick={() => handleSelectScenario(p.key)}
              className="px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1f2438] text-xs text-slate-300 border border-[#23293c] hover:border-amber-500/40 transition-colors"
            >
              "{p.label}"
            </button>
          ))}
        </div>
      </div>

      {/* Answer & Verified Evidence Section */}
      {activeResult && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Main Answer Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#11131c] border border-[#202538] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2436]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  Synthesized from Local Memory Index
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Period: {activeResult.curatedDate}
              </span>
            </div>

            {/* Answer Lead */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed font-sans">
                {activeResult.answer}
              </p>

              {/* Synthesized bullet points */}
              {activeResult.synthesizedPoints && activeResult.synthesizedPoints.length > 0 && (
                <ul className="space-y-2.5 pt-1">
                  {activeResult.synthesizedPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Interesting Nuance Box */}
              {activeResult.interestingNuance && (
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-200 text-sm leading-relaxed">
                  <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" /> Echo Nuance Insight
                  </div>
                  {activeResult.interestingNuance}
                </div>
              )}
            </div>

            {/* Evidence Header */}
            <div className="pt-4 border-t border-[#1f2436] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Primary Verifiable Evidence ({activeResult.evidence.length})
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Every claim is grounded in original records
                </span>
              </div>

              {/* Clickable Evidence Cards */}
              <div className="grid grid-cols-1 gap-3">
                {activeResult.evidence.map((ev) => (
                  <div
                    key={ev.memoryId}
                    onClick={() => onOpenEvidence(ev)}
                    className="group p-4 rounded-xl bg-[#161926] hover:bg-[#1b2030] border border-[#252b40] hover:border-amber-500/40 transition-all cursor-pointer space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(ev.type)}
                        <span className="font-medium text-slate-200 group-hover:text-amber-300 transition-colors">
                          {ev.source}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {ev.date}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 group-hover:underline flex items-center gap-1">
                        Inspect Record <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 italic pl-3 border-l-2 border-amber-500/40 line-clamp-2">
                      "{ev.exactQuote}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                      <span>Hash: {ev.hash}</span>
                      <span>Relevance: {ev.relevanceScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up Prompts */}
            {activeResult.suggestedFollowUps && activeResult.suggestedFollowUps.length > 0 && (
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 shrink-0">Explore further:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeResult.suggestedFollowUps.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(prompt);
                        handleSelectScenario('why-quit-project');
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#191d2c] hover:bg-[#22273c] text-slate-300 hover:text-white transition-colors"
                    >
                      {prompt} →
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
