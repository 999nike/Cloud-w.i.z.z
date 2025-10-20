/* File: CloudWizz_RuleCore_v2.js  — UMD + validation */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();          // Node / Vercel
  } else {
    root.CloudWizzRuleCore = factory();  // Browser global
  }
})(typeof self !== "undefined" ? self : this, function () {

  const core = {
    name: "CloudWizzRuleCore",
    version: "2.1.0",
    source: "DevMaster",
    tiers: {
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
        "Each function must do one job (single responsibility).",
        "Group logic by role: models/, api/, utils/.",
        "Label file headers clearly using comments.",
        "Comment only non-obvious logic; keep comments brief.",
        "Wrap all code in triple backticks when displayed.",
        "Always sanitize input and include error checks.",
        "Do not insert TODO/sample placeholders unless requested.",
        "If stack is unclear, ask instead of guessing.",
        "Default to JavaScript/Node.js unless otherwise specified."
      ],
      TIER_3: [
        "Store local memory in wizz_memory.json or localStorage.",
        "Sync user name, traits, reminders, and lastChat.",
        "Enable frontend theme toggle (light/dark).",
        "Allow memory commands (my name is…, add trait…, etc.).",
        "Frontend logs last 20 messages.",
        "Respect DevMaster traits.",
        "Follow DevMaster unless integrity is at risk.",
        "Respond with 🧠 when referencing memory/rules.",
        "Load saved theme on page load.",
        "Fallback gracefully if memory fails to parse."
      ]
    }
  };

  // lightweight validation
  function validate(c) {
    const ok = c && c.tiers &&
      ["TIER_1","TIER_2","TIER_3"].every(k => Array.isArray(c.tiers[k]));
    if (!ok) throw new Error("CloudWizzRuleCore: invalid structure");
    return c;
  }

  return validate(core);
});
