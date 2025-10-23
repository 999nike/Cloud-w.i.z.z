/* =======================================================
   File: memory.js — CloudWizz v4.0 Local Memory System
   Author: DevMaster 🧠
   Purpose: Manage short-term memory and persist state
   ======================================================= */

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
    if (saved) {
      Object.assign(memoryStore, JSON.parse(saved));
      console.log("🧠 Memory loaded:", memoryStore);
    } else {
      console.log("💡 No saved memory found, using defaults.");
    }
  } catch (err) {
    console.error("⚠️ Memory load error:", err);
  }
}

// === Save Memory ===
function saveMemory() {
  try {
    localStorage.setItem("wizzMemory", JSON.stringify(memoryStore));
    console.log("💾 Memory saved.");
  } catch (err) {
    console.error("⚠️ Memory save error:", err);
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
  if (!memoryStore.reminders.includes(msg)) {
    memoryStore.reminders.push(msg);
    saveMemory();
    console.log("🔔 Reminder added:", msg);
  }
}

// === Clear Memory ===
function clearMemory() {
  try {
    localStorage.removeItem("wizzMemory");
    Object.assign(memoryStore, {
      name: "DevMaster",
      theme: "dark",
      traits: ["Builder", "Rules Architect", "Project Leader"],
      reminders: ["Always follow DevMaster's instructions"],
      lastChat: []
    });
    saveMemory();
    console.log("🧹 Memory cleared and reset.");
  } catch (err) {
    console.error("⚠️ Memory clear error:", err);
  }
}

// === Export (Browser Global) ===
window.memoryStore = memoryStore;
window.loadMemory = loadMemory;
window.saveMemory = saveMemory;
window.addTrait = addTrait;
window.addReminder = addReminder;
window.clearMemory = clearMemory;

console.log("✅ CloudWizz memory.js loaded and ready.");

