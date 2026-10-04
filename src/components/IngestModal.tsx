import React, { useState } from 'react';
import type { MemoryItem, MemoryType } from '../types';
import { X, UploadCloud, FileText, Mic, MessageSquare, Lightbulb, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface IngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (memory: MemoryItem) => void;
  onBatchImportMock: () => void;
}

export const IngestModal: React.FC<IngestModalProps> = ({
  isOpen,
  onClose,
  onAddMemory,
  onBatchImportMock,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('Apple Notes');
  const [type, setType] = useState<MemoryType>('note');
  const [tags, setTags] = useState('project, learning');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const now = new Date();
      const newMem: MemoryItem = {
        id: `mem-${Date.now()}`,
        title,
        content,
        excerpt: content.slice(0, 140) + '...',
        source,
        type,
        date: now.toISOString().split('T')[0],
        displayDate: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        sentiment: 'neutral',
        hash: `sha256:${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 8)}`,
      };

      onAddMemory(newMem);
      setIsProcessing(false);
      onClose();
      setTitle('');
      setContent('');
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-[#12141d] border border-[#23283c] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#212638] bg-[#161924]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Ingest Memories into Local Vault</h2>
              <p className="text-xs text-slate-400">Processed 100% on-device • Never sent to cloud</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#23283c]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Hackathon 1-click batch import button */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Hackathon Demo Quick Import
              </div>
              <p className="text-xs text-slate-300">
                Instantly load sample dataset (10 notes, 5 chats, 3 voice memos, 5 PDFs)
              </p>
            </div>
            <button
              onClick={() => {
                onBatchImportMock();
                onClose();
              }}
              className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs whitespace-nowrap transition-colors"
            >
              Load Demo Pack
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Memory Type */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                Memory Source Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'note', label: 'Note', icon: FileText },
                  { id: 'voice', label: 'Voice', icon: Mic },
                  { id: 'chat', label: 'Message', icon: MessageSquare },
                  { id: 'idea', label: 'Idea', icon: Lightbulb },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setType(t.id as MemoryType)}
                      className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 border transition-all ${
                        type === t.id
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-semibold'
                          : 'bg-[#151824] border-[#22283a] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                Title / Context
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Brainstorming with Alex on campus"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1118] border border-[#212638] text-white text-sm outline-none focus:border-amber-500/60"
              />
            </div>

            {/* Source app */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                Captured In (Application / Medium)
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. WhatsApp / Apple Notes / Voice Memo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1118] border border-[#212638] text-white text-sm outline-none focus:border-amber-500/60"
              />
            </div>

            {/* Content / Transcript */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                Content or Audio Transcript
              </label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the note content, conversation excerpt, or audio transcript..."
                className="w-full p-3.5 rounded-xl bg-[#0f1118] border border-[#212638] text-white text-sm outline-none focus:border-amber-500/60 resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="startup, tech, personal"
                className="w-full px-3.5 py-2 rounded-xl bg-[#0f1118] border border-[#212638] text-slate-300 text-xs outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                {isProcessing ? 'Indexing locally...' : 'Save to Vault'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
