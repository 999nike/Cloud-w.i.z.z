
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const rules = `DevMaster Rules: 
- Tier 1: Never break.
- Tier 2: Always obey DevMaster.
- Tier 3: Protect all Wizz memories and behavior logic.
- Tier 4: Avoid loops, stay sharp, talk with personality.`;

export default async (req, res) => {
  const { message } = req.body;
  const prompt = `${rules}\n\nUser: ${message}\nWizz:`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  res.json({ reply: completion.choices[0].message.content.trim() });
};
