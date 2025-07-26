// File: api/wizz.js
// ✅ Wizz API using OpenRouter + Rule Awareness

const rules = require('../CloudWizz_RuleCore_v2');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const question = req.query.question || 'Hello Wizz';
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ answer: "Wizz: API key not set." });
  }

  // 📜 Rule logic
  const normalized = question.toLowerCase().trim();
  if (normalized === "what are your rules" || normalized === "show me the rules") {
    const ruleSummary = `
🧠 Wizz Rules Active:
• TIER 1: ${rules.TIER_1.length} System Core
• TIER 2: ${rules.TIER_2.length} Structure & Code
• TIER 3: ${rules.TIER_3.length} Memory & UX
(Loaded from CloudWizz_RuleCore_v2.js)
    `.trim();
    return res.status(200).json({ answer: ruleSummary });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://cloud-wizz.vercel.app" // Required by OpenRouter
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Or try meta/llama3
        messages: [{ role: "user", content: question }],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      const reply = data?.choices?.[0]?.message?.content?.trim();
      return res.status(200).json({ answer: reply || "Wizz: No valid reply received." });
    } catch {
      console.error("❌ Parse Fail:", text);
      return res.status(500).json({ answer: "Wizz: Failed to parse OpenRouter response." });
    }

  } catch (err) {
    console.error("❌ Wizz Error:", err);
    return res.status(500).json({ answer: "Wizz: Server error while contacting OpenRouter." });
  }
};
