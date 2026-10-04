import React from 'react';
import type { LLMModel } from '../types';
import { Shield, ShieldAlert, Cpu, HardDrive, Wifi, WifiOff, CheckCircle2, ChevronRight, X, Terminal, Lock } from 'lucide-react';

interface PrivacyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
  selectedModel: LLMModel;
  onSelectModel: (model: LLMModel) => void;
}

export const PrivacyDrawer: React.FC<PrivacyDrawerProps> = ({
  isOpen,
  onClose,
  isOfflineMode,
  onToggleOffline,
  selectedModel,
  onSelectModel,
}) => {
  if (!isOpen) return null;

  const models: { id: LLMModel; name: string; params: string; weights: string; desc: string; provider: string }[] = [
    {
      id: 'gemma-2b',
      name: 'Gemma 2 2B Instruct',
      params: '2.6B',
      weights: 'Google DeepMind (Open Weights)',
      desc: 'Blazing fast, running directly inside client WebAssembly with zero RAM strain.',
      provider: 'Local Wasm / ONNX',
    },
    {
      id: 'llama-3.2-3b',
      name: 'Llama 3.2 3B',
      params: '3.2B',
      weights: 'Meta Open Weights',
      desc: 'Exceptional reasoning and memory synthesis with 128k context window.',
      provider: 'Local Device Executable',
    },
    {
      id: 'qwen-2.5-7b',
      name: 'Qwen 2.5 7B',
      params: '7.6B',
      weights: 'Alibaba Cloud Open Weights',
      desc: 'Top-tier bilingual & code reasoning; excels in deep memory conflict debate.',
      provider: 'Local GPU Accelerated',
    },
    {
      id: 'mistral-nemo',
      name: 'Mistral Nemo 12B',
      params: '12.2B',
      weights: 'Mistral AI (Apache 2.0)',
      desc: 'State of the art multilingual reasoning for complex multi-year timelines.',
      provider: 'Local GGML / Ollama Bridge',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-[#0f1118] border-l border-[#24293c] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer header */}
        <div className="p-6 border-b border-[#23273a] flex items-center justify-between bg-[#141722]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                Privacy is Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Local-first memory engine & open-weight intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#202536] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Air-gap simulation banner */}
          <div className={`p-4 rounded-xl border transition-all ${
            isOfflineMode
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-[#181c2b] border-[#293049] text-slate-300'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  {isOfflineMode ? (
                    <>
                      <WifiOff className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Air-Gapped Offline Mode ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-4 h-4 text-amber-400" />
                      <span>Local-First (Network Connected)</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isOfflineMode
                    ? 'All external network calls are disabled. Queries are vectorized and answered 100% on-device without internet access.'
                    : 'Toggle this mode during hackathon demos to demonstrate that Echo requires zero cloud APIs.'}
                </p>
              </div>
              <button
                onClick={onToggleOffline}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                  isOfflineMode
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                    : 'bg-[#282f45] hover:bg-[#343e5c] text-white border border-[#3e486b]'
                }`}
              >
                {isOfflineMode ? 'Disconnect Air-Gap' : 'Simulate Air-Gap'}
              </button>
            </div>
          </div>

          {/* Architectural flow diagram */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-mono text-slate-400 font-semibold mb-3">
              Zero-Cloud Data Flow
            </h3>
            <div className="p-4 rounded-xl bg-[#090a0f] border border-[#1e2335] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-[#1b2032]">
                <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <HardDrive className="w-3.5 h-3.5" /> YOUR MACHINE
                </span>
                <span className="text-[11px] text-emerald-400">100% Encrypted</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-slate-300">
                <div className="p-2.5 rounded bg-[#131622] border border-[#22283e] flex items-center justify-between">
                  <span>1. Source Memories (WhatsApp, Voice, Notes, PDFs)</span>
                  <span className="text-slate-500">Unencrypted in RAM only</span>
                </div>
                <div className="flex justify-center text-slate-600">↓</div>
                <div className="p-2.5 rounded bg-[#131622] border border-[#22283e] flex items-center justify-between">
                  <span>2. Local Embedding Engine (BGE-Small / Nomic)</span>
                  <span className="text-slate-500">Local Vectorization</span>
                </div>
                <div className="flex justify-center text-slate-600">↓</div>
                <div className="p-2.5 rounded bg-[#131622] border border-[#22283e] flex items-center justify-between">
                  <span>3. Local Vector Store (SQLite-VSS in IndexedDB)</span>
                  <span className="text-slate-500">HNSW Index on SSD</span>
                </div>
                <div className="flex justify-center text-slate-600">↓</div>
                <div className="p-2.5 rounded bg-[#131622] border border-[#22283e] flex items-center justify-between">
                  <span>4. Open-Weight LLM (Llama, Gemma, Qwen)</span>
                  <span className="text-slate-500">Private Synthesis</span>
                </div>
                <div className="flex justify-center text-slate-600">↓</div>
                <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 flex items-center justify-between">
                  <span className="font-semibold">5. Evidence-Backed Answer</span>
                  <span className="text-emerald-400">Zero Cloud Egress</span>
                </div>
              </div>
            </div>
          </div>

          {/* Model Switcher */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-wider font-mono text-slate-400 font-semibold">
                Open-Weight Model Engine
              </h3>
              <span className="text-xs text-amber-400 font-mono">No Vendor Lock-in</span>
            </div>

            <div className="space-y-2.5">
              {models.map((m) => {
                const isSelected = selectedModel === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => onSelectModel(m.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5'
                        : 'bg-[#141724] border-[#22283c] hover:border-[#333c5a]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{m.name}</span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#212638] text-slate-300">
                            {m.params}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-snug">{m.desc}</p>
                        <div className="text-[11px] font-mono text-slate-500 pt-1">
                          {m.weights} • {m.provider}
                        </div>
                      </div>
                      <div className="pt-1">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-amber-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-600" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hackathon Pitch Box */}
          <div className="p-4 rounded-xl bg-[#131624] border border-[#232a3e] space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Terminal className="w-4 h-4" />
              <span>The Hackathon Argument</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              "Why didn't you just use ChatGPT API?"
            </p>
            <p className="leading-relaxed text-white italic">
              "Because Echo isn't an AI chatbot. It's a private human memory system. The more intimate and valuable memory data becomes, the less acceptable it is to send your life's transcripts to third-party cloud servers."
            </p>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="p-4 border-t border-[#23273a] bg-[#141722] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Source (Apache 2.0)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#242a3d] hover:bg-[#323a54] text-white font-medium transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
