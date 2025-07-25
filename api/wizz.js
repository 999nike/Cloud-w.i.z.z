// File: api/wizz.js

module.exports = async (req, res) => {
  const question = req.query.question || 'Hello Wizz';
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ answer: "Wizz: API key not set." });
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

    const data = await response.json();
    console.log("🧠 OpenRouter Response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(200).json({ answer: "Wizz: No valid reply received. Try again?" });
    }

    res.status(200).json({ answer: reply });

  } catch (err) {
    console.error("❌ Wizz Error:", err);
    res.status(500).json({ answer: "Wizz: Failed to contact the brain server." });
  }
};
