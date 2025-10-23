// /api/rulecore.js
import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    // Build the absolute path to the public file
    const filePath = path.join(process.cwd(), "public", "CloudWizz_RuleCore_v2.js");

    // Read the file contents
    const js = await fs.readFile(filePath, "utf8");

    // Return as JavaScript
    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(js);
  } catch (err) {
    console.error("❌ RuleCore load failed:", err.message);
    res.status(500).json({
      error: "RuleCore load failed",
      details: err.message,
      attemptedPath: path.join(process.cwd(), "public", "CloudWizz_RuleCore_v2.js"),
    });
  }
}


