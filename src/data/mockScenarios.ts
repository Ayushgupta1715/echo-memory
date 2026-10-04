import type {
  QueryResult,
  IdeaEvolutionNode,
  SynthesizedIdeaMVP,
  HabitPattern,
  PastSelfPersona,
  DebateEvidence,
} from '../types';

export const ASK_PAST_SCENARIOS: Record<string, QueryResult> = {
  'why-quit-project': {
    id: 'res-1',
    query: 'Why did I decide to quit that project?',
    curatedDate: 'March 2025',
    answer:
      'You decided to pause and archive the dev-tool project on March 12, 2025 because of three compounding factors:',
    synthesizedPoints: [
      'The architectural scope had exploded into a distributed orchestrator rather than a clean utility.',
      'You were spending ~3 hours every night debugging race conditions instead of sleeping.',
      'You needed mental bandwidth to clear upcoming university exams before starting your summer internship in May.',
    ],
    interestingNuance:
      'Interestingly, on March 28 (16 days later) and March 30, you recorded that pausing restored your clarity, and you drafted plans to restart it as a single-binary CLI without the web bloat once exams concluded.',
    evidence: [
      {
        memoryId: 'mem-101',
        date: 'March 12, 2025',
        title: 'Late night call with Rohan about project burn-out',
        source: 'WhatsApp / Chat with Rohan',
        type: 'chat',
        exactQuote:
          "The scope has exploded into an entire microservice orchestrator. I'm spending nearly 3 hours every single night debugging race conditions instead of sleeping. Plus, my summer internship starts in May and I need to clear my semester exams first.",
        context: 'Direct message explaining why repository will be archived this weekend.',
        relevanceScore: 98,
        hash: 'sha256:7f83b165...069',
      },
      {
        memoryId: 'mem-102',
        date: 'March 28, 2025',
        title: 'Journal: Reflections on Product Scope & Simplicity',
        source: 'Apple Notes',
        type: 'note',
        exactQuote:
          'Realized the original core value of the orchestrator was just the 10-line CLI watcher, not the entire web dashboard... Maybe after final exams end in late May, I will restart it as a lightweight single-binary CLI without the bloat.',
        context: 'Retrospective written after a 2-week mental break.',
        relevanceScore: 92,
        hash: 'sha256:9c1185a5...8d31',
      },
      {
        memoryId: 'mem-103',
        date: 'March 30, 2025',
        title: 'Voice Memo #42: Late night park walk thoughts',
        source: 'Voice Memo #42',
        type: 'voice',
        exactQuote:
          'I was conflating feeling overwhelmed by technical debt with losing passion for the problem. The problem is still real. Next time: constrain the scope upfront.',
        context: 'Audio reflection on separating emotional fatigue from fundamental problem validity.',
        relevanceScore: 89,
        hash: 'sha256:3e23e816...09d',
      },
    ],
    suggestedFollowUps: [
      'Did I ever restart the CLI version after May?',
      'Show me all decisions related to the summer internship.',
      'What were the technical debt bottlenecks in the orchestrator?',
    ],
  },

  'startup-ideas-abandoned': {
    id: 'res-2',
    query: 'What startup ideas have I abandoned or shelved?',
    curatedDate: '2024 - 2026',
    answer:
      'Echo identified 3 major project concepts that you conceptualized, explored, and subsequently placed on hold:',
    synthesizedPoints: [
      'Dev-Tool Orchestrator (Shelved March 2025): Dropped due to scope creep and exam burnout, later distilled to a single-binary CLI concept.',
      'Offline Student Expense Tracker (Pivoted August 2024): Manual tallying PWA abandoned because high logging friction caused users to quit after 3 days.',
      'Bank SMS Parsing Engine (Refined March 2025): Evolved into an on-device AI financial copilot to bypass Android SMS permission hurdles.',
    ],
    interestingNuance:
      'Notice that none of your abandoned ideas were rejected because "the problem did not exist"—in every case, you paused because the interface was too friction-heavy or the scope outgrew your time budget.',
    evidence: [
      {
        memoryId: 'mem-201',
        date: 'August 14, 2024',
        title: 'Scratchpad: Student Expense Tracker idea',
        source: 'Obsidian Notes',
        type: 'idea',
        exactQuote: 'College students get pocket money once a month and run out by day 18... Idea: super simple offline PWA where you tap a single button to add ₹50 chai.',
        context: 'Initial thesis for a friction-free college student expense logger.',
        relevanceScore: 95,
        hash: 'sha256:b10a8db1...e3fe5',
      },
      {
        memoryId: 'mem-101',
        date: 'March 12, 2025',
        title: 'Late night call with Rohan about project burn-out',
        source: 'WhatsApp / Rohan',
        type: 'chat',
        exactQuote: "Decided to archive the repo this weekend... spending 3 hours/night debugging.",
        context: 'Decision to step back from complex multi-service project.',
        relevanceScore: 91,
        hash: 'sha256:7f83b165...069',
      },
    ],
    suggestedFollowUps: [
      'Synthesize the student expense iterations into a single MVP',
      'Which abandoned idea required the least engineering time?',
    ],
  },
};

export const STUDENT_MONEY_IDEA_NODES: IdeaEvolutionNode[] = [
  {
    year: '2024',
    date: 'August 14, 2024',
    title: 'Manual Student Expense Tally',
    description: 'Offline-first PWA with single-tap buttons for college expenses (canteen chai, printing, rickshaw). Zero login or bank sync.',
    sourceMemoryId: 'mem-201',
    sourceTitle: 'Obsidian Scratchpad #12',
    status: 'abandoned',
  },
  {
    year: '2025',
    date: 'March 4, 2025',
    title: 'Bank SMS → Automatic Burn-rate Bar',
    description: 'Replaced manual logging with local Android background SMS parser for UPI debits. Replaced complex charts with a single remaining daily allowance gauge.',
    sourceMemoryId: 'mem-202',
    sourceTitle: 'Notion / Ideas Incubator',
    status: 'pivoted',
  },
  {
    year: '2026',
    date: 'January 19, 2026',
    title: 'AI Spending Copilot & Weekend Interventions',
    description: 'Coupled local SMS extraction with an on-device private LLM to proactively warn about weekend party burn rates before they happen. Zero data sent to cloud.',
    sourceMemoryId: 'mem-203',
    sourceTitle: 'Voice Memo #89',
    status: 'resurfaced',
  },
];

export const SYNTHESIZED_STUDENT_FINANCE_MVP: SynthesizedIdeaMVP = {
  problem:
    'College students experience high "end-of-month financial anxiety": pocket money depletes by day 18 because micro-transactions (canteen food, ride shares, impulse food orders) go unnoticed until the bank account is drained.',
  targetUser:
    'Undergraduate & graduate students receiving fixed monthly allowance or internship stipends who use UPI/digital wallets daily.',
  evolutionSummary:
    'You progressed from manual entry (which died of user friction) to passive SMS parsing (which lacked proactive insight) to on-device AI guidance (combining zero-effort logging with private behavioural nudges).',
  unifiedConcept:
    'Echo-Vault Finance: An air-gapped, privacy-first mobile copilot that parses on-device transaction notifications and generates proactive weekend allowance forecasts without uploading financial statements to cloud servers.',
  mvpFeatures: [
    {
      title: 'Local Notification / SMS Listener',
      description: 'Parses UPI debit alerts and instant receipts completely on-device without cloud analytics.',
    },
    {
      title: 'Dynamic "Safe-to-Spend Today" Fuel Gauge',
      description: 'Replaces confusing pie charts with a single number: how much you can spend today to survive until month-end.',
    },
    {
      title: 'Predictive Weekend Burn-Rate Alerts',
      description: 'Notifies user at 6 PM on Friday if weekend pace will breach the mid-month threshold.',
    },
  ],
  next3Actions: [
    'Build a 1-screen React Native prototype displaying the live "Safe-to-Spend" meter calculated against mock UPI SMS payloads.',
    'Test accuracy of local regex parser on 20 authentic transaction notifications (Swiggy, Zomato, Google Pay, Paytm).',
    'Interview 5 campus peers to validate whether the Friday 6 PM alert changes behavior more effectively than a weekly report.',
  ],
};

export const SPANISH_PATTERN_DATA: HabitPattern = {
  id: 'pat-spanish',
  title: 'Aspirational Drift: Learning Spanish',
  topic: 'Language Acquisition & Routine Discipline',
  detectionCount: 7,
  timeframe: 'Jan 2025 – Oct 2025 (9 months)',
  summary:
    'You have documented the desire to learn Spanish 7 separate times across notes, voice memos, travel itineraries, and chat conversations, but each streak ended within 4 to 6 days.',
  occurrences: [
    { date: 'Jan 02, 2025', context: 'New Year resolutions: 15 mins daily on Duolingo before Barcelona trip.', memoryId: 'mem-301', source: 'Apple Notes' },
    { date: 'Mar 14, 2025', context: 'Told Priya after Money Heist chat: "Downloaded Babbel today."', memoryId: 'mem-302', source: 'WhatsApp / Priya' },
    { date: 'Apr 22, 2025', context: 'Podcast takeaway: Feriss 1000-word Anki flashcard method.', memoryId: 'mem-303', source: 'Readwise' },
    { date: 'Jun 10, 2025', context: 'Mid-year review: "Haven’t started, feeling guilty. Starting this Monday."', memoryId: 'mem-304', source: 'Obsidian Daily' },
    { date: 'Jul 28, 2025', context: 'Flight confirmation: "Note to self: learn basic restaurant phrases."', memoryId: 'mem-305', source: 'PDF / Itinerary' },
    { date: 'Sep 08, 2025', context: 'Voice Memo #64: "Every year work sprints take over and streak dies."', memoryId: 'mem-306', source: 'Voice Memo' },
    { date: 'Oct 01, 2025', context: 'Q4 planning: "Admit defeat on 1-hour blocks; try 5-min cooking podcasts."', memoryId: 'mem-307', source: 'Notion Review' },
  ],
  detectedBarrier:
    'Every spike in enthusiasm coincides with an external trigger (vacation planning, media exposure), but scheduling attempts consistently set an unrealistic 30–60 minute daily study block right before exam or engineering release cycles.',
  suggestedUnlock:
    'Stop waiting for an open 45-minute study window. Anchor learning to an existing frictionless ritual: listen to 1 five-minute Spanish audio episode while making morning tea.',
};

export const PAST_SELF_PERSONAS: Record<string, PastSelfPersona> = {
  'june-2024': {
    periodId: 'june-2024',
    name: 'June 2024 You',
    dateLabel: 'June 2024',
    periodYear: '2024',
    headline: 'Eager student, exploring early hackathons, high imposter syndrome about system architecture.',
    stateOfMind: 'Restless, curious, anxious about securing a solid summer internship for next year.',
    dominantConcerns: [
      'Am I learning enough production-grade engineering or just tutorial code?',
      'How will I stand out in internship applications without an existing brand?',
      'Feeling intimidated by classmates who already contribute to major repos.',
    ],
    coreProjects: [
      'Offline student expense logger concept',
      'Data structures practice on LeetCode',
      'Campus open-source club workshops',
    ],
    memoriesCutoffDate: '2024-06-30',
  },
  'march-2025': {
    periodId: 'march-2025',
    name: 'March 2025 You',
    dateLabel: 'March 2025',
    periodYear: '2025',
    headline: 'Burnt out from microservice over-engineering, pausing side projects, preparing for upcoming finals.',
    stateOfMind: 'Mentally fatigued but gaining mature discernment on product simplicity over technical complexity.',
    dominantConcerns: [
      'Managing sprint burnout while balancing academic semester exams',
      'Whether pausing the orchestrator means giving up or being smart',
      'Getting ready for the May internship start date',
    ],
    coreProjects: [
      'Dev-tool microservice orchestrator (in process of archiving)',
      'Bank SMS auto-categorization research',
      'Engineering symposium guest keynote preparations',
    ],
    memoriesCutoffDate: '2025-03-31',
  },
  'january-2026': {
    periodId: 'january-2026',
    name: 'January 2026 You',
    dateLabel: 'January 2026',
    periodYear: '2026',
    headline: 'High-conviction edge AI builder, focused on on-device open-source intelligence and data sovereignty.',
    stateOfMind: 'Confident, deeply focused on private architecture, skeptical of cloud vendor lock-in.',
    dominantConcerns: [
      'How to make local SLMs (Small Language Models) feel as responsive as cloud APIs',
      'Protecting users from aggressive data harvesting by cloud AI incumbents',
      'Packaging complex memory graphs into intuitive, human interfaces',
    ],
    coreProjects: [
      'Echo Private Memory Layer architecture',
      'On-device SQLite vector embeddings runtime',
      'Student financial copilot concept',
    ],
    memoriesCutoffDate: '2026-01-31',
  },
};

export const PUBLIC_SPEAKING_DEBATE: DebateEvidence = {
  for: [
    {
      point: 'Freshman seminar opening slide freeze',
      memoryId: 'mem-401',
      source: 'Apple Notes',
      date: 'Oct 18, 2024',
      quote: 'Froze for 10 seconds during opening slide. Throat dry, hands shaking. Public speaking is definitely my biggest weakness.',
    },
    {
      point: 'Pre-standup racing heart rate spike',
      memoryId: 'mem-402',
      source: 'Notion Daily Journal',
      date: 'Jan 14, 2025',
      quote: 'Heart rate spiked to 125 bpm right before 2-minute status update on sprint backlog... kept repeating sentences.',
    },
  ],
  against: [
    {
      point: 'Best Pitch & Communication Award at DevSprint Hackathon',
      memoryId: 'mem-403',
      source: 'Photo / Award Certificate',
      date: 'Nov 24, 2024',
      quote: 'Jury praised presenter\'s clarity, storytelling, and ability to handle adversarial Q&A under high pressure.',
    },
    {
      point: 'Auditorium keynote praised by CS mentor Dr. Sharma',
      memoryId: 'mem-404',
      source: 'Voice Memo #38',
      date: 'Mar 22, 2025',
      quote: 'Your natural conversational cadence kept 200 engineers awake at 4 PM on a Saturday. Double down on this.',
    },
    {
      point: 'Department Chair formal invitation to deliver freshman keynote',
      memoryId: 'mem-405',
      source: 'WhatsApp / Prof. Kulkarni',
      date: 'May 18, 2025',
      quote: 'Invited to deliver the orientation guest lecture: "You have a rare gift for making complex concepts approachable."',
    },
    {
      point: 'Client VP instant contract approval after live architecture walk',
      memoryId: 'mem-406',
      source: 'Zoom Transcript',
      date: 'Aug 30, 2025',
      quote: 'Clearest product breakdown we\'ve seen all quarter. Approved the contract extension on the spot.',
    },
    {
      point: 'Student Council auditorium speech: 342 out of 410 votes won',
      memoryId: 'mem-407',
      source: 'Obsidian Journal',
      date: 'Sep 15, 2025',
      quote: 'Delivered 5-minute campaign speech in auditorium with zero notes. Felt adrenaline, but zero panic.',
    },
  ],
  verdict:
    'Your historical data directly contradicts your belief. You possess 5 verified instances of high public recognition and external praise versus only 2 private diary entries recording internal anticipatory anxiety.',
  cognitiveShiftAnalysis:
    'You are conflating the physiological sensation of autonomic nervousness (rapid pulse, dry mouth) with your actual external communication effectiveness. Audiences consistently rate you as clear, captivating, and natural.',
};
