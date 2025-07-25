// File: api/wizz.js

module.exports = async (req, res) => {
  const question = req.query.question || 'Hello Wizz';
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ answer: "Wizz: API key not set." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        max_tokens: 100,
        temperature: 0.8
      })
    });

    const data = await response.json();

    // Debug: Log raw OpenAI response
    console.log("🔍 OpenAI Response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(200).json({ answer: "Wizz: I'm here, but didn’t get a proper reply. Try rewording that?" });
    }

    return res.status(200).json({ answer: reply });

  } catch (err) {
    console.error("❌ Wizz Error:", err);
    res.status(500).json({ answer: "Wizz: There was an error talking to the brain server." });
  }
};
