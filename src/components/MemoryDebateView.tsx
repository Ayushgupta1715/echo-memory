import React, { useState } from 'react';
import { PUBLIC_SPEAKING_DEBATE } from '../data/mockScenarios';
import { 
  Scale, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

interface MemoryDebateViewProps {
  onOpenEvidenceById?: (memoryId: string) => void;
}

export const MemoryDebateView: React.FC<MemoryDebateViewProps> = () => {
  const [claimInput, setClaimInput] = useState("I think I was always bad at public speaking.");
  const [activeDebate, setActiveDebate] = useState(PUBLIC_SPEAKING_DEBATE);
  const [isDebating, setIsDebating] = useState(false);

  const sampleClaims = [
    "I think I was always bad at public speaking.",
    "I never finish the side projects I start.",
    "I have no discipline when it comes to learning new languages.",
  ];

  const handleRunDebate = (claim: string) => {
    setClaimInput(claim);
    setIsDebating(true);
    setTimeout(() => {
      setIsDebating(false);
      setActiveDebate(PUBLIC_SPEAKING_DEBATE);
    }, 450);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium">
          <Scale className="w-3.5 h-3.5" /> Hackathon Wow Feature: Adversarial Narrative Audit
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Memory Debate
        </h1>
        <p className="text-lg text-amber-200/90 font-serif-display italic">
          "AI that challenges the false stories you tell yourself using your own history."
        </p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          Human memory is plagued by recency bias and emotional distortion. Echo audits your self-limiting claims against the unalterable empirical record.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* User Claim Input Box */}
        <div className="p-6 rounded-2xl bg-[#12141f] border border-[#24293d] shadow-xl space-y-4">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            State your personal assumption or self-narrative:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={claimInput}
              onChange={(e) => setClaimInput(e.target.value)}
              placeholder="e.g. I think I was always bad at public speaking..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#0b0c12] border border-[#1f2436] focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 text-white text-sm outline-none"
            />
            <button
              onClick={() => handleRunDebate(claimInput)}
              disabled={isDebating}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all active:scale-95 whitespace-nowrap shadow-md shadow-amber-500/20 disabled:opacity-50"
            >
              {isDebating ? 'Auditing Vault...' : 'Audit Claim'}
            </button>
          </div>

          {/* Quick claim chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-mono text-[11px]">Audit preset:</span>
            {sampleClaims.map((claim, idx) => (
              <button
                key={idx}
                onClick={() => handleRunDebate(claim)}
                className="px-2.5 py-1 rounded-md bg-[#171b29] hover:bg-[#20263a] text-slate-300 border border-[#252c42] transition-colors"
              >
                "{claim}"
              </button>
            ))}
          </div>
        </div>

        {/* Adversarial Audit Results */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#11131c] border-2 border-amber-500/30 shadow-2xl space-y-8">
          {/* Verdict Banner */}
          <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" /> Echo Narrative Verdict
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              "I do not think your memories support that conclusion."
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              {activeDebate.verdict}
            </p>
          </div>

          {/* Side by Side Evidence Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EVIDENCE FOR (Anxiety records) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-rose-950/60">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" /> Evidence FOR Claim ({activeDebate.for.length})
                </span>
                <span className="text-[11px] font-mono text-slate-500">Internal Anxiety</span>
              </div>

              <div className="space-y-2.5">
                {activeDebate.for.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#18151b] border border-rose-900/30 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-rose-300 font-sans">
                        {item.point}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 italic">
                      "{item.quote}"
                    </p>
                    <div className="text-[10px] font-mono text-slate-600">
                      Source: {item.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EVIDENCE AGAINST (Actual objective performance) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-950/60">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Evidence AGAINST Claim ({activeDebate.against.length})
                </span>
                <span className="text-[11px] font-mono text-slate-500">Objective Praise</span>
              </div>

              <div className="space-y-2.5">
                {activeDebate.against.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#131a1f] border border-emerald-900/30 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-300 font-sans">
                        {item.point}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      "{item.quote}"
                    </p>
                    <div className="text-[10px] font-mono text-slate-500">
                      Source: {item.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Psychological Synthesis Takeaway */}
          <div className="p-5 rounded-xl bg-[#141724] border border-[#23293c] space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Cognitive Distortion Breakdown
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeDebate.cognitiveShiftAnalysis}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conclusion derived from 7 verified memories across a 12-month period.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
