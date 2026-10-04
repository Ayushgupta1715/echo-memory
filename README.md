# Echo 🧠⚡

> **What if your AI didn't know more about the world—but remembered more about you?**

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Privacy: Zero Cloud Egress](https://img.shields.io/badge/Privacy-100%25%20On--Device-emerald.svg)]()
[![Architecture: Open Weights](https://img.shields.io/badge/Models-Gemma%20%7C%20Llama%20%7C%20Qwen-amber.svg)]()

---

### The Product Thesis

We live in a world where information is everywhere, but human memory is fragmented:

```
WhatsApp / Messages ──► Voice Notes ──► Screenshots ──► Notes ──► PDFs ──► Ideas
```

**The problem is not that information isn't available.**  
**The problem is: we forget what we already knew.**

- 3 months ago you conceptualized a brilliant architecture.
- 2 months ago a mentor gave you career-defining advice.
- Last month you made an intentional project decision.
- *Today, you've forgotten why.*

**Echo is a private, open-source AI memory layer that lets you search, connect, and challenge your own past.**

```
Traditional AI:  You ask ───────► AI answers (from the public web)
Echo:            Understands ───► Connects ───► Reminds ───► Challenges you (from YOUR life)
```

---

## 🌟 The 5 Signature Capabilities

### 1. 🧠 Ask My Past (Evidence-Backed Semantic Retrieval)
Ask: *"Why did I decide to quit that project?"*  
Echo doesn't say "Trust me, I'm AI." Echo replies with verified chronological evidence:
- You considered quitting on March 12 because the scope exploded, you were spending 3 hours/night debugging, and needed bandwidth for finals.
- Interestingly, on March 28 you mentioned wanting to restart it as a single-binary CLI.
- **Every answer is backed by inspectable evidence chips** with cryptographic SHA-256 integrity hashes, audio waveforms, and raw dialogue transcripts.

### 2. 💡 You Already Knew This (*The Hero Feature*)
When you start jotting down a thought like *"I want to build an app that helps students manage money"*, Echo interrupts:
> 💡 *You already explored this idea across 3 iterations over the last 14 months.*
- **2024:** Manual Expense Tally PWA *(Abandoned: high friction)*
- **2025:** Bank SMS Auto-Parser *(Pivoted: lacked proactive nudges)*
- **2026:** On-Device AI Financial Copilot *(Resurfaced: private)*

**Action: [Build the Combined Concept]**  
Echo synthesizes your past learnings into a structured MVP specification:
- Core Problem Statement
- Validated Target Persona
- Trajectory of Past Lessons
- Unified Concept
- 3 Lean MVP Features
- Next 3 Immediate Execution Actions

### 3. 🔮 Pattern Radar (*Future Echo*)
Notices behavioral and aspirational drift across months:
> 🔔 *Pattern Detected: You have mentioned 'I should learn Spanish' 7 times in the last 9 months, but haven't started.*
- Maps occurrences from January to October across notes, chats, and flight bookings.
- Diagnoses root barriers: enthusiasm spikes during travel planning, but unrealistic 1-hour study blocks get choked by semester deadlines.
- Formulates a micro-habit unlock: 5-minute audio listening during morning tea.

### 4. 🪞 Talk to Your Past Self (Time-Capsule Persona)
Step into a conversation with the exact person you used to be:
- Select an era: **June 2024 You**, **March 2025 You**, or **January 2026 You**.
- Constrained **strictly to memories existing before that date**—with zero hindsight bias.
- Ask: *"What were you most worried about?"*, *"What were you trying to achieve?"*, *"What advice would you give current me?"*

### 5. ⚔️ Memory Debate (*Adversarial Self-Narrative Audit*)
You state a limiting belief: *"I think I was always bad at public speaking."*  
Echo: *"I don't think your memories support that conclusion."*
- **Evidence FOR claim (2 memories):** Freshman seminar freeze, standup heart rate spike.
- **Evidence AGAINST claim (7 memories):** Hackathon best pitch award, mentor keynote debrief, university orientation invite, client contract extension, election victory.
- **Empirical Verdict:** Your confidence fluctuates with sleep and stress, not your actual objective performance.

---

## 🔐 Privacy is Architecture

Your private life shouldn't be sent to proprietary cloud APIs.

```
                  YOUR DEVICE (AIR-GAPPED CAPABLE)
 ──────────────────────────────────────────────────────────────────
   Documents / Messages / Voice / Notes / PDFs
                       │
                       ▼
            Local Parsing & Chunking
                       │
                       ▼
         Local Embeddings (BGE / Nomic)
                       │
                       ▼
      Local Vector Store (SQLite-VSS in IndexedDB)
                       │
                       ▼
         Open-Weight LLMs (Gemma / Llama / Qwen)
                       │
                       ▼
         Verifiable Evidence-Backed Answer
```

- **Zero Cloud Egress:** All embeddings and vector search execute on your machine.
- **Simulated Air-Gap Mode:** Built-in network cut switch for demonstration purposes.
- **Model Flexibility:** Swap between **Gemma 2 2B**, **Llama 3.2 3B**, **Qwen 2.5 7B**, and **Mistral Nemo** without vendor lock-in.

---

## 🚀 Quickstart & Local Setup

```bash
# Clone the repository
git clone https://github.com/Ayushgupta1715/echo-memory.git
cd echo-memory

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore Echo.

---

## 🏆 International Hackathon Demo Script (5-Minute Winning Pitch)

1. **0:00 — The Human Pain Point:**
   *"I built this for a friend who constantly says: 'I know I've thought about this before... I just can't remember where.' We have notes, voice memos, WhatsApp chats, screenshots, and PDFs. We don't lack information—we forget what we already knew."*
2. **0:30 — Ingesting Fragmented Memories:**
   Click **"Ingest Past"** -> **"Load Demo Pack"** to load 10 notes, 5 chats, 3 voice memos, and 5 PDFs into the local vault.
3. **1:00 — Ask My Past:**
   Ask: *"Why did I decide to quit that project?"* Show the exact 3 reasons and click the **March 12 WhatsApp** and **March 30 Voice Memo** chips with verifiable hashes.
4. **2:00 — You Already Knew This (Hero):**
   Type: *"I want to build an app that helps students manage money."* Watch Echo interrupt with 3 historical iterations from 2024 to 2026, then click **"Build The Combined Concept"** to generate the complete MVP roadmap.
5. **3:00 — Memory Debate (The Wow Moment):**
   Claim: *"I've always been terrible at public speaking."* Show Echo auditing 2 anxious memories against 7 external praise records.
6. **4:00 — The Air-Gap Climax:**
   Toggle **"Simulate Offline / Air-Gap Mode"** (or physically disconnect WiFi). Re-run a query. Echo answers instantly with zero network packets sent.

---

## 📜 License

Distributed under the Apache 2.0 License. See `LICENSE` for details.
