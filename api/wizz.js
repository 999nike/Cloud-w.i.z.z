// File: api/wizz.js
// 🧠 Wizz API with Rule Awareness + OpenRouter Chat Completion

const rules = require('../CloudWizz_RuleCore_v2');

module.exports = async (req, res) => {
  const question = req.query.question || 'Hello Wizz';
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ answer: "Wizz: API key not set." });
  }

  // 🧠 Check if user asked for rules
  const normalized = question.toLowerCase().trim();
  if (normalized === "what are your rules" || normalized === "show me the rules") {
    const ruleSummary = `
🧠 Wizz Rules Active:
• TIER 1: ${rules.TIER_1.length} System Core
• TIER 2: ${rules.TIER_2.length} Structure & Code
• TIER 3: ${rules.TIER_3.length} Memory & UX
(Full rule engine loaded from CloudWizz_RuleCore_v2.js)
    `.trim();
    return res.status(200).json({ answer: ruleSummary });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://cloud-wizz.vercel.app"  // Update if your domain changes
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // You can also try "meta-llama/llama-3-8b-instruct"
        messages: [{ role: "user", content: question }],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    const

