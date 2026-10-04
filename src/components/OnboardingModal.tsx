import React from 'react';
import { X, Sparkles, ShieldCheck, ArrowRight, UploadCloud, Database, BrainCircuit } from 'lucide-react';
import { playChime } from '../utils/audioSynth';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onStartDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#12141e] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playChime(260, 'sine', 0.1);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1f2436] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black mx-auto flex items-center justify-center font-extrabold shadow-lg shadow-amber-500/20">
            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 10v4" />
              <path d="M6 6v12" />
              <path d="M10 2v20" />
              <path d="M14 7v10" />
              <path d="M18 5v14" />
              <path d="M22 10v4" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            ECHO
          </h2>
          <p className="text-base text-amber-200/90 font-serif-display italic">
            Your past deserves a voice.
          </p>
          <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
            The problem isn't that information is missing. The problem is: we forget what we already knew.
          </p>
        </div>

        {/* 3 Step Flow Diagram */}
        <div className="p-4 rounded-2xl bg-[#0b0c10] border border-[#1f2436] space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#181d2c] border border-[#262f48] flex items-center justify-center text-amber-400 shrink-0">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">1. Ingest Your Fragmented Past</div>
              <p className="text-[11px] text-slate-400">WhatsApp chats, voice memos, Apple notes, PDFs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#181d2c] border border-[#262f48] flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">2. 100% Private On-Device Vector Index</div>
              <p className="text-[11px] text-slate-400">Zero cloud storage, encrypted local SQLite embeddings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#181d2c] border border-[#262f48] flex items-center justify-center text-amber-400 shrink-0">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">3. Search, Connect & Challenge Your Memory</div>
              <p className="text-[11px] text-slate-400">Evidence-backed answers with exact historical receipts</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              playChime(440, 'sine', 0.2);
              onStartDemo();
            }}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>Explore Preloaded Demo Memory Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white font-mono cursor-pointer"
          >
            Dismiss & Enter Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
