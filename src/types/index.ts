export type MemoryType = 'note' | 'voice' | 'chat' | 'pdf' | 'screenshot' | 'idea';

export interface MemoryItem {
  id: string;
  title: string;
  date: string; // ISO string or human date e.g. "2025-03-12"
  displayDate: string;
  type: MemoryType;
  source: string; // e.g. "WhatsApp / Rohan", "Apple Notes", "Voice Memo #42", "PDF / Syllabus"
  content: string;
  excerpt: string;
  tags: string[];
  sentiment?: 'positive' | 'neutral' | 'struggle' | 'inspired';
  hash: string; // Cryptographic verification hash e.g. "sha256:4a8b...19c"
  audioDuration?: string;
  metadata?: {
    location?: string;
    participants?: string[];
    wordCount?: number;
    fileSize?: string;
  };
}

export interface EvidenceCitation {
  memoryId: string;
  date: string;
  title: string;
  source: string;
  type: MemoryType;
  exactQuote: string;
  context: string;
  relevanceScore: number; // 0-100%
  hash: string;
}

export interface QueryResult {
  id: string;
  query: string;
  answer: string;
  synthesizedPoints: string[];
  evidence: EvidenceCitation[];
  curatedDate: string;
  interestingNuance?: string;
  suggestedFollowUps?: string[];
}

export interface IdeaEvolutionNode {
  year: string;
  date: string;
  title: string;
  description: string;
  sourceMemoryId: string;
  sourceTitle: string;
  status: 'abandoned' | 'pivoted' | 'resurfaced';
}

export interface SynthesizedIdeaMVP {
  problem: string;
  targetUser: string;
  evolutionSummary: string;
  unifiedConcept: string;
  mvpFeatures: {
    title: string;
    description: string;
  }[];
  next3Actions: string[];
}

export interface HabitPattern {
  id: string;
  title: string;
  topic: string;
  detectionCount: number;
  timeframe: string;
  summary: string;
  occurrences: {
    date: string;
    context: string;
    memoryId: string;
    source: string;
  }[];
  detectedBarrier: string;
  suggestedUnlock: string;
}

export interface PastSelfPersona {
  periodId: string;
  name: string;
  dateLabel: string;
  periodYear: string;
  headline: string;
  stateOfMind: string;
  dominantConcerns: string[];
  coreProjects: string[];
  memoriesCutoffDate: string;
}

export interface DebateEvidence {
  for: {
    point: string;
    memoryId: string;
    source: string;
    date: string;
    quote: string;
  }[];
  against: {
    point: string;
    memoryId: string;
    source: string;
    date: string;
    quote: string;
  }[];
  verdict: string;
  cognitiveShiftAnalysis: string;
}

export type LLMModel = 'gemma-2b' | 'llama-3.2-3b' | 'qwen-2.5-7b' | 'mistral-nemo';
