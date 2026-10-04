import React, { useState } from 'react';
import type { MemoryItem, MemoryType } from '../types';
import { 
  Layers, 
  Search, 
  Calendar, 
  Filter, 
  FileText, 
  Mic, 
  MessageSquare, 
  Lightbulb, 
  ShieldCheck, 
  Play, 
  ChevronRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface MemoryVaultViewProps {
  memories: MemoryItem[];
  onSelectMemory: (item: MemoryItem) => void;
  onOpenIngest: () => void;
}

export const MemoryVaultView: React.FC<MemoryVaultViewProps> = ({
  memories,
  onSelectMemory,
  onOpenIngest,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMemories = memories.filter((m) => {
    const matchesType = filterType === 'all' || m.type === filterType;
    const matchesSearch =
      searchQuery === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getSourceIcon = (type: MemoryType) => {
    switch (type) {
      case 'voice': return <Mic className="w-4 h-4 text-amber-400" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'idea': return <Lightbulb className="w-4 h-4 text-emerald-400" />;
      default: return <FileText className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium">
          <Layers className="w-3.5 h-3.5" /> Immutable Chronological Archive
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Memory Timeline Vault
        </h1>
        <p className="text-lg text-amber-200/90 font-serif-display italic">
          "Your fragmented past, indexed and secured in one place."
        </p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          Browsing {memories.length} captured memories across voice memos, WhatsApp conversations, Apple notes, and brainstorms.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vault..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#131622] border border-[#212638] text-white text-xs outline-none focus:border-amber-500/60"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'note', label: 'Notes' },
              { id: 'voice', label: 'Voice' },
              { id: 'chat', label: 'WhatsApp' },
              { id: 'idea', label: 'Ideas' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  filterType === f.id
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold'
                    : 'bg-[#12141e] border-[#22273a] text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Spine List */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#202538]">
          {filteredMemories.map((mem) => (
            <div key={mem.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-6 sm:-left-8 top-3.5 w-4 h-4 rounded-full border-2 border-amber-400/80 bg-[#0b0c10] group-hover:scale-125 transition-transform" />

              <div
                onClick={() => onSelectMemory(mem)}
                className="p-5 rounded-2xl bg-[#121522] hover:bg-[#181c2d] border border-[#22283e] hover:border-amber-500/40 transition-all cursor-pointer shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-[#1d2234] border border-[#2b334e]">
                      {getSourceIcon(mem.type)}
                    </div>
                    <span className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {mem.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-slate-400 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{mem.displayDate}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {mem.content}
                </p>

                {/* Footer metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1b2032] text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400/90">{mem.source}</span>
                    {mem.audioDuration && (
                      <span className="flex items-center gap-1 text-slate-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Play className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        {mem.audioDuration}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-[150px] text-slate-500">
                      {mem.hash.slice(0, 16)}...
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1 group-hover:underline">
                      Inspect <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredMemories.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-[#11131c] border border-[#212638] text-slate-400 space-y-2">
              <p>No memories found matching your filter.</p>
              <button
                onClick={onOpenIngest}
                className="text-xs text-amber-400 hover:underline font-mono"
              >
                + Ingest a new memory to your vault
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
