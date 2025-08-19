// File: api/wizz.js
// Vercel serverless (Node 18+): uses global fetch.
// Env needed: OPENROUTER_API_KEY  (optional: OPENROUTER_MODEL, OPENROUTER_REFERER)

const MODEL   = process.env.OPENROUTER_MODEL   || "openai/gpt-4o-mini";
const API_KEY = process.env.OPENROUTER_API_KEY || "";
const REFERER = process.env.OPENROUTER_REFERER || "https://vercel.app";

const SYSTEM_PROMPT = `
You are Wizz (assistant). DevMaster is the user and project owner.
Be concise, direct, encouraging, and a bit cheeky when it fits. No bland filler.
Never call yourself DevMaster. Stay on-task and follow DevMaster's instructions.
`.trim();

module.exports = async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ answer: "Wizz: Missing OPENROUTER_API_KEY." });
    }

    // Accept GET ?question=... or POST {question}
    let question = "";
    if (req.method === "POST") {
      try {
        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        question = (body && body.question) ? String(body.question) : "";
      } catch {
        question = "";
      }
    } else {
      question = String(req.query.question || "");
    }

    const q = question.trim();
    if (!q) {
      return res.status(200).json({ answer: "Ask me something, DevMaster." });
    }

    const payload = {
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: q }
      ],
      temperature: 0.5,
      max_tokens: 300
    };

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": REFERER
      },
      body: JSON.stringify(payload)
    });

    const raw = await r.text();

    // Try to parse; if it fails, return raw so you can see why
    try {
      const data  = JSON.parse(raw);
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return res.status(502).json({ answer: "Wizz: Empty reply from model." });
      }
      return res.status(200).json({ answer: reply });
    } catch {
      return res.status(502).json({ answer: "Wizz: Could not parse model response.\n" + raw });
    }
  } catch (err) {
    return res.status(500).json({ answer: "Wizz: Backend error — " + (err?.message || String(err)) });
  }
};
