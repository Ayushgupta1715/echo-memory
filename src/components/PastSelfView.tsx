import React, { useState } from 'react';
import { PAST_SELF_PERSONAS } from '../data/mockScenarios';
import { 
  History, 
  Sparkles, 
  Send, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  Clock, 
  HelpCircle,
  Compass,
  ArrowRight
} from 'lucide-react';

export const PastSelfView: React.FC = () => {
  const [selectedPeriodKey, setSelectedPeriodKey] = useState<string>('march-2025');
  const persona = PAST_SELF_PERSONAS[selectedPeriodKey];

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'past-self'; text: string; dateRef?: string }>>([
    {
      sender: 'past-self',
      text: "Hey... I'm your March 2025 self. My head is honestly swimming with semester exams and this microservice repo I've been grinding on until 2 AM every night. What do you want to ask me?",
      dateRef: 'March 2025 Vault Context',
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'What were you most worried about?',
    'What were you trying to achieve?',
    'What did you believe would happen by 2026?',
    'What advice would you give current me?',
  ];

  const handleSendQuestion = (questionText: string) => {
    if (!questionText.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user' as const, text: questionText }];
    setChatMessages(newMessages);
    setInputQuestion('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const qLower = questionText.toLowerCase();

      if (qLower.includes('worried') || qLower.includes('fear') || qLower.includes('anxious')) {
        if (selectedPeriodKey === 'march-2025') {
          reply = "I'm terrified that pausing the dev-tool project makes me a quitter. Rohan and I promised we'd launch it, but spending 3 hours every single night fixing race conditions is destroying my sleep right before exams and my May internship. I'm worried I can't balance real-world software with college.";
        } else if (selectedPeriodKey === 'june-2024') {
          reply = "I'm worried I'm just a 'tutorial engineer'. Everyone around me seems to talk about distributed systems while I'm just grinding LeetCode and struggling with simple UI state. I'm stressed about whether anyone will give me a summer internship.";
        } else {
          reply = "I'm worried big tech cloud monopolies will suck up all user context. If personal memory is stored in centralized LLM clouds, individuals will lose autonomy over their own digital history.";
        }
      } else if (qLower.includes('achieve') || qLower.includes('goal')) {
        if (selectedPeriodKey === 'march-2025') {
          reply = "Honestly? Right now, my immediate goal is to finish semester finals with a clean slate, survive the transition into my summer internship in May, and distill the orchestrator into a simple single-binary CLI without the web dashboard bloat.";
        } else if (selectedPeriodKey === 'june-2024') {
          reply = "I want to build that student expense tracker PWA where you can tap one button for chai without typing amounts. And I want to get my first open-source PR merged into a recognized project.";
        } else {
          reply = "My mission is proving that an on-device local memory engine running quantized open-weights can outperform cloud RAG while providing mathematical privacy guarantees.";
        }
      } else if (qLower.includes('believe') || qLower.includes('future') || qLower.includes('happen')) {
        if (selectedPeriodKey === 'march-2025') {
          reply = "I believed that once I started the internship, I would magically have infinite energy to code side projects every night. (Looking back, that was probably naive!)";
        } else {
          reply = "I believed that hard work would eventually compound, but I didn't realize how much the tools we build need to protect human freedom instead of corporate metrics.";
        }
      } else if (qLower.includes('advice')) {
        if (selectedPeriodKey === 'march-2025') {
          reply = "My advice to you right now: don't overcomplicate the architecture before you have 10 real users. If a 10-line CLI watcher solves the problem, don't build a Kubernetes cluster. And please get 8 hours of sleep.";
        } else if (selectedPeriodKey === 'june-2024') {
          reply = "Stop comparing your day 1 to everyone else's year 5. Just keep building small projects and writing down what you learn.";
        } else {
          reply = "Double down on local-first sovereignty. The market is waking up to privacy.";
        }
      } else {
        reply = `Based strictly on my memories up to ${persona.dateLabel}: I'm primarily focused on ${persona.coreProjects[0]} and feeling ${persona.stateOfMind.toLowerCase()}. Every decision right now revolves around resolving ${persona.dominantConcerns[0].toLowerCase()}.`;
      }

      setChatMessages([...newMessages, { sender: 'past-self', text: reply, dateRef: `${persona.dateLabel} Memory Record` }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium">
          <History className="w-3.5 h-3.5" /> Time Capsule Simulator
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Talk to Your Past Self
        </h1>
        <p className="text-lg text-amber-200/90 font-serif-display italic">
          "Step into a conversation with the exact person you used to be."
        </p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          Select any era. Echo instantiates a time-capsule persona constrained <span className="text-amber-400 font-semibold">strictly to historical records existing before that date</span>—with zero hindsight bias.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Era Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(PAST_SELF_PERSONAS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPeriodKey(key);
                setChatMessages([
                  {
                    sender: 'past-self',
                    text: `Time machine calibrated to ${p.dateLabel}. I'm feeling ${p.stateOfMind.toLowerCase()} Ask me anything about what's going on in my world.`,
                    dateRef: `${p.dateLabel} Persona`,
                  },
                ]);
              }}
              className={`p-4 rounded-xl border text-left transition-all space-y-1.5 ${
                selectedPeriodKey === key
                  ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                  : 'bg-[#12141f] border-[#22273c] hover:border-slate-600 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {p.dateLabel}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                  Cutoff {p.periodYear}
                </span>
              </div>
              <div className="text-sm font-semibold text-white truncate">
                {p.name}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {p.headline}
              </p>
            </button>
          ))}
        </div>

        {/* Persona Temporal Boundary Badge */}
        <div className="p-3.5 rounded-xl bg-[#141724] border border-[#23293c] flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Temporal Boundary:</span>
            <span className="font-mono font-semibold text-white">Strict cutoff before {persona.memoriesCutoffDate}</span>
          </div>
          <span className="text-[11px] font-mono text-amber-400">
            Zero Hindsight Leakage
          </span>
        </div>

        {/* Chat / Dialogue Interface */}
        <div className="p-6 rounded-2xl bg-[#11131c] border border-[#202538] shadow-2xl space-y-4">
          {/* Dialogue Message Thread */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-mono text-slate-500">
                    {msg.sender === 'user' ? 'Current You (Today)' : persona.name}
                  </span>
                  {msg.dateRef && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400/90 border border-amber-500/20">
                      {msg.dateRef}
                    </span>
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-black font-medium rounded-tr-none'
                      : 'bg-[#181c2b] text-slate-200 border border-[#283048] rounded-tl-none font-sans'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 text-xs text-slate-400 font-mono italic">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{persona.name} is recalling memories from {persona.dateLabel}...</span>
              </div>
            )}
          </div>

          {/* Quick Question Prompts */}
          <div className="pt-3 border-t border-[#1f2436] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
              Suggested questions to ask {persona.name}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendQuestion(q)}
                  className="px-3 py-1.5 rounded-lg bg-[#151926] hover:bg-[#1e2336] text-xs text-slate-300 border border-[#23293c] hover:border-amber-500/40 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Question Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion(inputQuestion);
            }}
            className="flex items-center gap-2 pt-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder={`Ask ${persona.name} anything about that period...`}
              className="flex-1 px-4 py-3 rounded-xl bg-[#151824] border border-[#252b3e] text-white text-sm outline-none focus:border-amber-500/60"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim()}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
