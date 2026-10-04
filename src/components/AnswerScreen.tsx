import React from 'react';
import type { QueryResult, EvidenceCitation } from '../types';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Mic,
  MessageSquare,
  Lightbulb,
  Play
} from 'lucide-react';
import { playChime } from '../utils/audioSynth';

interface AnswerScreenProps {
  result: QueryResult;
  isLoading?: boolean;
  onBack: () => void;
  onOpenEvidence: (citation: EvidenceCitation) => void;
  onFollowUpClick: (query: string) => void;
}

export const AnswerScreen: React.FC<AnswerScreenProps> = ({
  result,
  isLoading = false,
  onBack,
  onOpenEvidence,
  onFollowUpClick,
}) => {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Mic className="w-4 h-4 text-amber-400" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'idea': return <Lightbulb className="w-4 h-4 text-emerald-400" />;
      default: return <FileText className="w-4 h-4 text-purple-400" />;
    }
  };

  const confidenceScore = result.confidenceScore ?? 87;
  const confidenceLabel = result.confidenceLabel ?? (confidenceScore >= 80 ? 'High' : confidenceScore >= 50 ? 'Medium' : 'Low');
  const supportingCount = result.supportingMemoriesCount ?? result.evidence.length;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-16 space-y-6 text-center animate-in fade-in duration-200">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center animate-pulse">
          <Sparkles className="w-6 h-6 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">
            Searching your historical memory index...
          </h2>
          <p className="text-sm text-slate-400 font-mono">
            Scanning 21 encrypted records, audio transcripts & notes on-device...
          </p>
        </div>
        <div className="flex justify-center gap-1.5 pt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 py-2 sm:py-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => {
            playChime(320, 'sine', 0.15);
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141724] hover:bg-[#1f2438] text-xs font-mono text-slate-300 hover:text-white border border-[#22283a] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* 1. YOUR QUESTION CONTAINER */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#121522] border border-[#242b3e] shadow-xl space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold block">
          YOUR QUESTION
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          "{result.query}"
        </h1>
        <div className="flex items-center gap-2 pt-1 text-xs text-slate-400 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Temporal Focus: {result.curatedDate}</span>
        </div>
      </div>

      {/* 2. ECHO'S ANSWER CONTAINER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#11131c] border-2 border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#202538]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold">
              ECHO SYNTHESIS
            </span>
          </div>

          {/* CONFIDENCE INDICATOR */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
              confidenceLabel === 'High'
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-600/50'
                : confidenceLabel === 'Medium'
                ? 'bg-amber-950/40 text-amber-300 border-amber-600/50'
                : 'bg-rose-950/40 text-rose-300 border-rose-600/50'
            }`}>
              {confidenceLabel === 'High' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{confidenceScore}% {confidenceLabel} Confidence</span>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              ({supportingCount} memories)
            </span>
          </div>
        </div>

        {/* Answer Content */}
        <div className="space-y-4">
          <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
            {result.answer}
          </p>

          {/* Synthesized bullet points */}
          {result.synthesizedPoints && result.synthesizedPoints.length > 0 && (
            <ul className="space-y-2.5 pt-1">
              {result.synthesizedPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Echo Nuance Highlight Box */}
          {result.interestingNuance && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm leading-relaxed space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Echo Nuance Insight
              </div>
              <p className="text-amber-100/90 text-xs sm:text-sm">
                {result.interestingNuance}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. VERIFIABLE EVIDENCE LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Supporting Historical Evidence ({result.evidence.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Ground truth verified on-device
          </span>
        </div>

        {result.evidence.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {result.evidence.map((ev) => (
              <div
                key={ev.memoryId}
                onClick={() => onOpenEvidence(ev)}
                className="group p-4 sm:p-5 rounded-xl bg-[#131622] hover:bg-[#1a1f30] border border-[#23293c] hover:border-amber-500/50 transition-all cursor-pointer space-y-2.5 shadow-md"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1 rounded bg-[#1f2436]">
                      {getSourceIcon(ev.type)}
                    </div>
                    <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                      {ev.source}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {ev.date}
                    </span>
                  </div>

                  <button className="px-2.5 py-1 rounded bg-[#1f2436] group-hover:bg-amber-500 group-hover:text-black text-[11px] font-mono text-amber-300 font-semibold transition-colors flex items-center gap-1">
                    <span>View Original</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 italic pl-3 border-l-2 border-amber-500/50 line-clamp-2 leading-relaxed">
                  "{ev.exactQuote}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>Relevance: {ev.relevanceScore}%</span>
                  <span className="truncate max-w-[200px] text-slate-500">Hash: {ev.hash}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl bg-[#12141f] border border-[#22283a] text-slate-400 text-sm space-y-2">
            <p>Echo couldn't find enough verified evidence matching this query.</p>
            <p className="text-xs text-amber-300/80 font-mono">
              Try asking: "Why did I quit that project?" or "What startup ideas have I abandoned?"
            </p>
          </div>
        )}
      </div>

      {/* 4. SUGGESTED FOLLOW-UPS */}
      {result.suggestedFollowUps && result.suggestedFollowUps.length > 0 && (
        <div className="p-4 rounded-xl bg-[#131622] border border-[#22283a] space-y-2.5">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Suggested Next Inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {result.suggestedFollowUps.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onFollowUpClick(prompt)}
                className="px-3 py-1.5 rounded-lg bg-[#1a1f30] hover:bg-[#252c44] text-xs text-slate-200 hover:text-white border border-[#2a334d] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-3 h-3 text-amber-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
