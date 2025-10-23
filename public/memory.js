/* File: memory.js — CloudWizz v4.0 Local Memory System */

const memoryStore = {
  name: "DevMaster",
  theme: "dark",
  traits: ["Builder", "Rules Architect", "Project Leader"],
  reminders: ["Always follow DevMaster's instructions"],
  lastChat: []
};

// === Load Memory ===
function loadMemory() {
  try {
    const saved = localStorage.getItem("wizzMemory");
    if (saved) Object.assign(memoryStore, JSON.parse(saved));
    console.log("🧠 Memory loaded:", memoryStore);
  } catch (err) {
    console.error("Memory load error:", err);
  }
}

// === Save Memory ===
function saveMemory() {
  try {
    localStorage.setItem("wizzMemory", JSON.stringify(memoryStore));
    console.log("💾 Memory saved.");
  } catch (err) {
    console.error("Memory save error:", err);
  }
}

// === Add Trait ===
function addTrait(trait) {
  if (!memoryStore.traits.includes(trait)) {
    memoryStore.traits.push(trait);
    saveMemory();
    console.log("✨ Trait added:", trait);
  }
}

// === Add Reminder ===
function addReminder(msg) {
  memoryStore.reminders.push(msg);
  saveMemory();
  console.log("🔔 Reminder added:", msg);
}

// === Clear Memory ===
function clearMemory() {
  localStorage.removeItem("wizzMemory");
  Object.assign(memoryStore, {
    name: "DevMaster",
    theme: "dark",
    traits: [],
    reminders: [],
    lastChat: []
  });
  console.log("🧹 Memory cleared and reset.");
}
