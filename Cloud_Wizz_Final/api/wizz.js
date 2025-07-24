const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const question = req.query.question || 'Hello Wizz';
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ answer: "API key not set" });
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 50
      })
    });

    const data = await completion.json();
    res.status(200).json({ answer: data.choices ? data.choices[0].text.trim() : "No response" });
  } catch (err) {
    res.status(500).json({ answer: "Error: " + err.toString() });
  }
};