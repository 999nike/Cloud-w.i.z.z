// File: api/wizz.js
// 🧠 Wizz API with Rule Awareness + OpenRouter Chat Completion

const rules = require('../CloudWizz_RuleCore_v2');

module.exports = async (req, res) => {
  const question = req.query.question || 'Hello Wizz';
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ answer: "Wizz: API key not set." });
  }

  // 🧠 Rules: Respond if user asks about rules
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
        "HTTP-Referer": "https://cloud-wizz.vercel.app"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Or use another OpenRouter model
        messages: [{ role: "user", content: question }],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      const reply = data?.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        return res.status(200).json({ answer: "Wizz: No valid reply received. Try again?" });
      }

      return res.status(200).json({ answer: reply });

    } catch (jsonErr) {
      console.error("⚠️ JSON parse failed:", text);
      return res.status(500).json({ answer: "Wizz: Failed to parse response from brain." });
    }

  } catch (err) {
    console.error("❌ Wizz Error:", err);
    res.status(500).json({ answer: "Wizz: Server error, brain disconnected." });
  }
};
