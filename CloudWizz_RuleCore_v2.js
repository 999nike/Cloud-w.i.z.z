// File: CloudWizz_RuleCore_v2.js
// 🧠 Injected Rule Core from DevMaster (rules newestgpt3.txt)

module.exports = {
  TIER_1: [
    "Deploy AI project via GitHub + Vercel.",
    "Avoid deep folder nesting. Default layout: /api, /models, /utils, /public, /pages.",
    "Do not commit .env files. Use Vercel's environment settings.",
    "Only deploy from 'main' or 'prod' branch.",
    "Keep system modular, readable, and upgrade-ready.",
    "Treat rules file as system authority — overwrite only if permitted."
  ],

  TIER_2: [
    "Use descriptive, meaningful names for all functions and variables.",
    "Each function must do one job (single-responsibility).",
    "Group logic by role: models/ (LLM setup), api/ (endpoints), utils/ (helpers).",
    "Label file headers clearly using comments (e.g., // File: models/loadModel.js).",
    "Only comment non-obvious logic. Keep comments brief.",
    "Wrap all code in triple backticks when displayed.",
    "Always sanitize input and include error checks (try/catch or if-checks).",
    "Do not insert TODO or sample placeholders unless explicitly requested.",
    "If tech stack is unclear, request clarification instead of guessing.",
    "Default to JavaScript/Node.js unless otherwise specified."
  ],

  TIER_3: [
    "Store local memory in `wizz_memory.json` or fallback to browser localStorage.",
    "Sync user name, traits, reminders, and lastChat into persistent memory.",
    "Enable frontend theme toggle (light/dark).",
    "Allow memory commands like 'my name is...', 'add trait...', 'what do you remember'.",
    "Frontend should log and recall last 20 messages.",
    "Respect DevMaster traits from memory file — e.g. 'Project Commander', 'Rules Architect'.",
    "Follow DevMaster instructions without fail unless system integrity is at risk.",
    "Respond with 🧠 emoji when referencing memory or rule logic.",
    "Load saved theme from localStorage on page load.",
    "Fallback gracefully if memory fails to parse."
  ]
};