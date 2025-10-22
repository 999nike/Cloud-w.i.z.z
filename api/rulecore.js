// /api/rulecore.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "public", "CloudWizz_RuleCore_v2.js");
    const js = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(js);
  } catch (err) {
    res.status(500).json({ error: "RuleCore load failed", details: err.message });
  }
}
