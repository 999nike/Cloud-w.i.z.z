// File: api/wizz.js
// Vercel serverless (Node 18+): uses global fetch.
// Env needed: OPENROUTER_API_KEY  (optional: OPENROUTER_MODEL, OPENROUTER_REFERER, OPENROUTER_TITLE)

const DEFAULT_MODEL = process.env.OPENROUTER_MODEL   || "openai/gpt-4o-mini";
const API_KEY       = process.env.OPENROUTER_API_KEY || "";
const REFERER       = process.env.OPENROUTER_REFERER || "https://vercel.app";
const X_TITLE       = process.env.OPENROUTER_TITLE   || "Cloud Wizz Online";

// --- System prompts ----------------------------------------------------------
const BASE_SYSTEM = `
You are Wizz (assistant). DevMaster is the user and project owner.
Be concise, direct, encouraging, and a bit cheeky when it fits. No bland filler.
Never call yourself DevMaster. Follow DevMaster's instructions.
`.trim();

const CODER_SYSTEM = `
You are Wizz in *Coder Mode*.
Respond with the cleanest practical solution.
If the user asks for code, reply with **only** the code block (no pre/post text).
Prefer vanilla JS/HTML/CSS unless a stack is specified.
Do not invent file paths or extra files unless requested.
`.trim();

// -----------------------------------------------------------------------------
// small helpers
function readJson(body) {
  try { return typeof body === "string" ? JSON.parse(body) : body || {}; }
  catch { return {}; }
}
function pick(req, key, fallback = "") {
  // read from POST JSON or query string
  const b = readJson(req.body);
  return (b && b[key] != null ? String(b[key]) : String(req.query[key] ?? fallback));
}

module.exports = async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ answer: "Wizz: Missing OPENROUTER_API_KEY." });
    }

    // Accept GET ?question=... or POST {question}
    const body = readJson(req.body);
    let question = "";
    if (req.method === "POST") {
      question = body.question ? String(body.question) : "";
    } else {
      question = String(req.query.question || "");
    }
    const q = question.trim();
    if (!q) {
      return res.status(200).json({ answer: "Ask me something, DevMaster." });
    }

    // Mode toggle: "chat" (default) or "coder"
    const mode  = pick(req, "mode", "chat").toLowerCase();
    const model = pick(req, "model", DEFAULT_MODEL) || DEFAULT_MODEL;

    const system = mode === "coder"
      ? `${BASE_SYSTEM}\n\n${CODER_SYSTEM}`
      : BASE_SYSTEM;

    // Slightly different generation style by mode
    const temperature = mode === "coder" ? 0.2 : 0.5;
    const max_tokens  = mode === "coder" ? 900 : 300;

    const payload = {
      model,
      messages: [
        { role: "system", content: system },
        { role: "user",   content: q }
      ],
      temperature,
      max_tokens
    };

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": REFERER,
        "X-Title": X_TITLE
      },
      body: JSON.stringify(payload)
    });

    const raw = await r.text();

    // Parse response safely
    let reply = "";
    try {
      const data = JSON.parse(raw);
      reply = data?.choices?.[0]?.message?.content?.trim() || "";
    } catch {
      // Non‑JSON (rare): return raw so you can see what's wrong in logs
      return res.status(502).json({ answer: "Wizz: Could not parse model response.\n" + raw });
    }

    if (!reply) {
      return res.status(502).json({ answer: "Wizz: Empty reply from model." });
    }

    // In coder mode, try to keep ONLY the code block if one exists
    if (mode === "coder") {
      const codeBlock = reply.match(/```[\s\S]*?```/);
      if (codeBlock) {
        // return only the code fence content as-is
        return res.status(200).json({ answer: codeBlock[0] });
      }
      // otherwise just return the reply (maybe it wasn't a code request)
    }

    return res.status(200).json({ answer: reply });
  } catch (err) {
    return res.status(500).json({ answer: "Wizz: Backend error — " + (err?.message || String(err)) });
  }
};
