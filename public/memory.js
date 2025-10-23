/* Wizz Memory Diagnostic v1.0 */

let memoryStore = {};

function loadMemory() {
  try {
    const stored = localStorage.getItem("memoryStore");
    memoryStore = stored ? JSON.parse(stored) : {};
    console.log("✅ Wizz Memory loaded:", memoryStore);
  } catch (err) {
    console.error("❌ loadMemory error:", err);
  }
}

function saveMemory() {
  try {
    localStorage.setItem("memoryStore", JSON.stringify(memoryStore));
    console.log("💾 Memory saved:", memoryStore);
  } catch (err) {
    console.error("❌ saveMemory error:", err);
  }
}

function clearMemory() {
  localStorage.removeItem("memoryStore");
  memoryStore = {};
  console.log("🧹 Memory cleared");
}

function addTrait(key, value = true) {
  memoryStore[key] = value;
  saveMemory();
  console.log(`✨ Trait added: ${key} = ${value}`);
}

/* Auto-init when DOM is ready */
window.addEventListener("DOMContentLoaded", () => {
  console.log("🧠 Wizz memory.js loaded into DOM");
  loadMemory();
});
