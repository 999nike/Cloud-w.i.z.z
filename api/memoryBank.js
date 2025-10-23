/* =======================================================
   File: /api/memoryBank.js — CloudWizz v4.1
   Purpose: Long-term memory persistence (server-side)
   Author: DevMaster 🧠
   ======================================================= */

import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "memoryBank.json");

  try {
    if (req.method === "POST") {
      const body = req.body;

      // 🧠 Save to server JSON
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
      console.log("💾 Wizz long-term memory updated.");
      return res.status(200).json({ message: "Memory saved successfully." });
    }

    if (req.method === "GET") {
      if (!fs.existsSync(filePath)) {
        return res.status(200).json({ message: "No memory file found.", data: {} });
      }

      const data = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(data);
      console.log("📥 Wizz memory retrieved.");
      return res.status(200).json({ message: "Memory loaded.", data: parsed });
    }

    res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("⚠️ Memory bank error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
