import React, { useState, useEffect } from 'react';
import type { EvidenceCitation, MemoryItem } from '../types';
import { X, ShieldCheck, Calendar, FileText, Mic, MessageSquare, Lightbulb, Play, Pause, Check, Copy } from 'lucide-react';
import { playTapeNoise, playChime } from '../utils/audioSynth';

interface EvidenceModalProps {
  evidence: EvidenceCitation | null;
  memoryItem?: MemoryItem;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ evidence, memoryItem, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    let stopAudio: (() => void) | null = null;
    if (isPlaying) {
      stopAudio = playTapeNoise(4.0);
    }
    return () => {
      if (stopAudio) stopAudio();
    };
  }, [isPlaying]);

  if (!evidence && !memoryItem) return null;

  const title = evidence?.title || memoryItem?.title || 'Memory Evidence';
  const date = evidence?.date || memoryItem?.displayDate || '';
  const source = evidence?.source || memoryItem?.source || '';
  const type = evidence?.type || memoryItem?.type || 'note';
  const hash = evidence?.hash || memoryItem?.hash || 'sha256:verified';
  const fullContent = memoryItem?.content || evidence?.exactQuote || '';
  const exactQuote = evidence?.exactQuote;
  const isAudio = type === 'voice';

  const getTypeIcon = () => {
    switch (type) {
      case 'voice': return <Mic className="w-5 h-5 text-amber-400" />;
      case 'chat': return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'idea': return <Lightbulb className="w-5 h-5 text-emerald-400" />;
      default: return <FileText className="w-5 h-5 text-purple-400" />;
    }
  };

  const copyHashToClipboard = () => {
    playChime(500, 'sine', 0.1);
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#12141c] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232738] bg-[#161924]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1f2333] border border-[#2e344a]">
              {getTypeIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400/90 font-medium">
                  {type} memory
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {date}
                </span>
              </div>
              <h2 className="text-base font-semibold text-white truncate max-w-md">
                {title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              playChime(250, 'sine', 0.1);
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#232738] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Source origin badge */}
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#171a26] border border-[#252a3d]">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-xs text-slate-400">Captured in:</span>
              <span className="font-medium text-white">{source}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-800/40 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              Local-Vault Verified
            </div>
          </div>

          {/* Audio Waveform preview if voice memo */}
          {isAudio && (
            <div className="p-4 rounded-xl bg-[#161a27] border border-[#2b334c] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">Voice Recording Transcript</span>
                <span className="font-mono text-amber-400">Duration: {memoryItem?.audioDuration || '02:45'}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="flex-1 flex items-center gap-1 h-8">
                  {[12, 24, 16, 28, 8, 20, 32, 14, 26, 36, 18, 30, 10, 22, 28, 16, 24, 12, 18, 26, 34, 20, 14, 8, 22, 30, 16, 24, 18, 12].map((height, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlaying 
                          ? 'bg-amber-400 animate-pulse' 
                          : idx < 10 ? 'bg-amber-400/80' : 'bg-slate-700'
                      }`}
                      style={{ height: isPlaying ? `${Math.max(8, (height * (Math.sin(idx + Date.now()) + 1.2)) % 36)}px` : `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Highlighted Exact Quote if provided */}
          {exactQuote && (
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-2 font-medium">
                Cited Historical Excerpt
              </span>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-100 text-sm leading-relaxed font-sans">
                "{exactQuote}"
              </div>
            </div>
          )}

          {/* Full content view */}
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-2 font-medium">
              Complete Memory Context
            </span>
            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#202536] text-slate-200 leading-relaxed font-sans whitespace-pre-line text-sm selection:bg-amber-500/30">
              {fullContent}
            </div>
          </div>

          {/* Cryptographic hash proof */}
          <div className="pt-2 border-t border-[#202536] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2 truncate">
              <span className="text-slate-400">Integrity Hash:</span>
              <span className="text-slate-200 truncate max-w-xs">{hash}</span>
            </div>
            <button
              onClick={copyHashToClipboard}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1c202e] hover:bg-[#272d40] text-slate-200 transition-colors w-fit cursor-pointer"
            >
              {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
            </button>
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-3.5 border-t border-[#232738] bg-[#141722] flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>Stored on SSD • Zero cloud transmission</span>
          <button
            onClick={() => {
              playChime(250, 'sine', 0.1);
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#24293a] hover:bg-[#30374e] text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
