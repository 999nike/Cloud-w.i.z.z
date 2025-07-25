// File: CloudWizz_MemoryBank_v1.js
// ☁️ Wizz Persistent Memory Layer (Local v1 - Can upgrade to server/DB later)

const memoryStore = {
  name: null,
  traits: [],
  reminders: [],
  lastChat: []
};

// Load from localStorage if available
function loadMemory() {
  const raw = localStorage.getItem("cloudWizzMemory");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      Object.assign(memoryStore, parsed);
    } catch (e) {
      console.warn("🧠 Failed to parse memory:", e);
    }
  }
}

// Save current memory state
function saveMemory() {
  localStorage.setItem("cloudWizzMemory", JSON.stringify(memoryStore));
}

// Helper: Update memory items
function rememberName(name) {
  memoryStore.name = name;
  saveMemory();
  return `✅ Got it. I'll call you ${name}.`;
}

function addTrait(trait) {
  if (!memoryStore.traits.includes(trait)) memoryStore.traits.push(trait);
  saveMemory();
}

function addReminder(msg) {
  memoryStore.reminders.push(msg);
  saveMemory();
}

function logChat(entry) {
  memoryStore.lastChat.push(entry);
  if (memoryStore.lastChat.length > 20) memoryStore.lastChat.shift();
  saveMemory();
}

function recallMemorySummary() {
  const name = memoryStore.name || "stranger";
  const traits = memoryStore.traits.join(", ") || "none";
  const reminders = memoryStore.reminders.map((r, i) => `• ${r}`).join("\n") || "none";
  return `👤 You are ${name}.
🧬 Traits: ${traits}
📌 Reminders:
${reminders}`;
}

// Memory Match Trigger (natural language)
function checkMemoryTriggers(input) {
  const lower = input.toLowerCase();

  if (lower.startsWith("my name is ")) {
    const name = input.split("is ")[1].trim();
    return rememberName(name);
  }

  if (lower.includes("add trait ")) {
    const trait = input.split("add trait ")[1].trim();
    addTrait(trait);
    return `🧠 Trait "${trait}" added.`;
  }

  if (lower.includes("add reminder")) {
    const note = input.split("add reminder")[1].trim();
    addReminder(note);
    return `📌 Reminder added: ${note}`;
  }

  if (lower.includes("what do you remember") || lower.includes("who am i")) {
    return recallMemorySummary();
  }

  return null;
}

// ⏫ Ready to hook into frontend
loadMemory();
