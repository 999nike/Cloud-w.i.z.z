// /api/rulecore.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Safe absolute path — compatible with Vercel runtime
    const rulecorePath = path.resolve("./public/CloudWizz_RuleCore_v2.js");

    // Confirm file exists before read
    if (!fs.existsSync(rulecorePath)) {
      return res.status(404).json({ error: "RuleCore file not found", path: rulecorePath });
    }

    const js = fs.readFileSync(rulecorePath, "utf8");
    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(js);
  } catch (err) {
    res.status(500).json({
      error: "RuleCore load failed",
      details: err.message,
    });
  }
}
