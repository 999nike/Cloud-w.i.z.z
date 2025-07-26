// File: api/rules.js
// 🧪 Rule viewer endpoint for DevMaster

const rules = require('../CloudWizz_RuleCore_v2');

module.exports = (req, res) => {
  return res.status(200).json({
    status: "🧠 Rule engine loaded",
    rules
  });
};