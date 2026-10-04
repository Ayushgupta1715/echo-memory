import React, { useState } from 'react';
import { STUDENT_MONEY_IDEA_NODES, SYNTHESIZED_STUDENT_FINANCE_MVP } from '../data/mockScenarios';
import { 
  GitMerge, 
  Lightbulb, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Rocket, 
  FileText, 
  Share2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface IdeaEvolutionViewProps {
  onOpenMemoryById?: (memoryId: string) => void;
}

export const IdeaEvolutionView: React.FC<IdeaEvolutionViewProps> = ({ onOpenMemoryById }) => {
  const [draftInput, setDraftInput] = useState('I want to build an app that helps students manage money');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [hasSynthesized, setHasSynthesized] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'all' | 'mvp' | 'actions'>('all');

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setHasSynthesized(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#10b981', '#6366f1']
      });
    }, 900);
  };

  const copyBriefToClipboard = () => {
    const brief = `
# Project Blueprint: ${SYNTHESIZED_STUDENT_FINANCE_MVP.unifiedConcept}

## Problem
${SYNTHESIZED_STUDENT_FINANCE_MVP.problem}

## Target User
${SYNTHESIZED_STUDENT_FINANCE_MVP.targetUser}

## Evolutionary Arc
${SYNTHESIZED_STUDENT_FINANCE_MVP.evolutionSummary}

## Core MVP Feature Set
${SYNTHESIZED_STUDENT_FINANCE_MVP.mvpFeatures.map(f => `- ${f.title}: ${f.description}`).join('\n')}

## Immediate Next 3 Actions
${SYNTHESIZED_STUDENT_FINANCE_MVP.next3Actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" /> Hero Feature: Proactive Idea Synthesis
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          You Already Knew This
        </h1>
        <p className="text-lg text-amber-200/90 font-serif-display italic">
          "Don't restart from zero. Echo connects your forgotten iterations into a unified breakthrough."
        </p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          When you write down an idea, Echo scans your historical memory vault across years, detects prior iterations, and synthesizes them into an actionable MVP specification.
        </p>
      </div>

      {/* Simulator Input Box */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="p-4 rounded-2xl bg-[#12141e] border border-[#23293c] shadow-xl space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Imagine you start jotting down a new note or brainstorm:
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={draftInput}
              onChange={(e) => setDraftInput(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#0b0c12] border border-[#1f2436] focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 text-white text-sm sm:text-base outline-none resize-none"
            />
          </div>
        </div>

        {/* Echo Interruption Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold shrink-0">
                <Lightbulb className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Echo Interruption: You already explored this idea.
                </h2>
                <p className="text-xs text-amber-200/80">
                  Echo discovered 3 distinct iterations of this concept across your 2024–2026 notes and voice memos.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-400 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 whitespace-nowrap">
              3 Versions Found
            </span>
          </div>

          {/* Chronological Evolution Nodes */}
          <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-slate-600 before:via-amber-500 before:to-emerald-400">
            {STUDENT_MONEY_IDEA_NODES.map((node, idx) => (
              <div key={idx} className="relative group">
                {/* Node dot */}
                <div className={`absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  node.year === '2024'
                    ? 'border-slate-500 bg-[#0b0c10]'
                    : node.year === '2025'
                    ? 'border-amber-400 bg-[#0b0c10]'
                    : 'border-emerald-400 bg-emerald-400'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${node.year === '2026' ? 'bg-black' : 'bg-slate-400'}`} />
                </div>

                <div className="p-4 rounded-xl bg-[#141724] border border-[#23293c] group-hover:border-amber-500/40 transition-all space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-amber-400">
                      {node.year} — {node.date}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                      node.status === 'abandoned'
                        ? 'bg-rose-950/30 text-rose-300 border-rose-800/40'
                        : node.status === 'pivoted'
                        ? 'bg-blue-950/30 text-blue-300 border-blue-800/40'
                        : 'bg-emerald-950/30 text-emerald-300 border-emerald-800/40'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white">
                    "{node.title}"
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {node.description}
                  </p>
                  <div className="text-[11px] text-slate-500 font-mono pt-1">
                    Source: {node.sourceTitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Merge & Synthesize Trigger CTA */}
          <div className="p-4 rounded-xl bg-[#10131c] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-sm font-semibold text-white">
                You have 3 versions of the same idea.
              </div>
              <p className="text-xs text-slate-400">
                Want Echo to merge their lessons, address past failure points, and synthesize a unified MVP roadmap?
              </p>
            </div>
            <button
              onClick={handleSynthesize}
              disabled={isSynthesizing}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/25 disabled:opacity-50"
            >
              {isSynthesizing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-black" />
                  <span>Synthesizing Past & Future...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Build The Combined Concept</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Synthesized MVP Result Blueprint */}
        {hasSynthesized && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#11141f] border-2 border-emerald-500/30 shadow-2xl space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#21273a]">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Synthesized Idea Roadmap
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {SYNTHESIZED_STUDENT_FINANCE_MVP.unifiedConcept}
                </h2>
              </div>
              <button
                onClick={copyBriefToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c2234] hover:bg-[#273049] text-xs text-slate-200 border border-[#2b3550] transition-colors"
              >
                {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBrief ? 'Copied Brief' : 'Export Brief'}</span>
              </button>
            </div>

            {/* Problem & Target User */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#161a28] border border-[#262d44] space-y-1.5">
                <span className="text-xs font-mono uppercase text-amber-400 font-semibold">
                  1. The True Core Problem
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {SYNTHESIZED_STUDENT_FINANCE_MVP.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#161a28] border border-[#262d44] space-y-1.5">
                <span className="text-xs font-mono uppercase text-blue-400 font-semibold">
                  2. Validated Target Persona
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {SYNTHESIZED_STUDENT_FINANCE_MVP.targetUser}
                </p>
              </div>
            </div>

            {/* Evolutionary Trajectory Summary */}
            <div className="p-4 rounded-xl bg-[#161a28] border border-[#262d44] space-y-1.5">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                3. Lessons from Previous Iterations
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {SYNTHESIZED_STUDENT_FINANCE_MVP.evolutionSummary}
              </p>
            </div>

            {/* MVP Feature Set */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                4. Lean MVP Feature Specification (v1.0)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SYNTHESIZED_STUDENT_FINANCE_MVP.mvpFeatures.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#151926] border border-[#242b3e] space-y-1">
                    <div className="text-xs font-bold text-amber-300">
                      {idx + 1}. {feat.title}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next 3 Immediate Actions */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Rocket className="w-4 h-4" /> Next 3 Concrete Execution Steps
              </span>
              <div className="space-y-2">
                {SYNTHESIZED_STUDENT_FINANCE_MVP.next3Actions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
