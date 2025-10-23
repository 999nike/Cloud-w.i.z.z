// /api/rulecore.js
import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    // ✅ Correct path for your structure (index.html and vercel.json in root)
    const filePath = path.join(process.cwd(), "public/CloudWizz_RuleCore_v2.js");

    const js = await fs.readFile(filePath, "utf8");

    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(js);
  } catch (err) {
    console.error("❌ RuleCore load failed:", err.message);
    res.status(500).json({
      error: "RuleCore load failed",
      details: err.message,
      attemptedPath: path.join(process.cwd(), "public/CloudWizz_RuleCore_v2.js"),
    });
  }
}
