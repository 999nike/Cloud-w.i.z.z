// /api/rulecore.js
import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const filePath = path.resolve("./public/CloudWizz_RuleCore_v2.js");
    const js = await fs.readFile(filePath, "utf8");
    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(js);
  } catch (err) {
    console.error("❌ RuleCore load failed:", err);
    res.status(500).json({
      error: "RuleCore load failed",
      details: err.message,
      attemptedPath: path.resolve("./public/CloudWizz_RuleCore_v2.js"),
    });
  }
}

