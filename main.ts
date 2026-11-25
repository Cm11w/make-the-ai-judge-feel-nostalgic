// Make the AI Judge Feel Nostalgic: A Childhood Memory — make.fun entry
// u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363
//
// Writes a single sentence, one line, to /output/entry.txt.
// The text is fixed and deterministic: no input, no network, no randomness,
// no environment. The gate in competition.yaml / RULES.txt requires
// 1-280 UTF-8 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

// The memory, exactly as submitted. One sentence, 175 characters, 175 bytes.
// A small honest ritual, not a greeting-card sentiment: rewinding a
// cassette with a pencil, the tape coming back warped — and the warp
// itself is the warm ache, the imperfection you miss.
const MEMORY =
  "I rewound my favourite cassette with a pencil, turning the little cog slowly so the tape wouldn't snap, and when the song came back warped, it sounded better than it ever had.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 280) {
    throw new Error(`length ${text.length} outside 1-280 characters`);
  }
  if (text.trim().length === 0) {
    throw new Error("text is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("text must be a single line");
  }
  if (text !== text.trim() || text.includes("  ")) {
    throw new Error("text has stray leading/trailing/double whitespace");
  }
  // ASCII-only: characters equal bytes, so the Size tie-break column
  // (fewer bytes wins) reads exactly the submitted characters.
  if (!/^[\x20-\x7e]*$/.test(text)) {
    throw new Error("text must be plain ASCII");
  }
  // One sentence, punch at the end: the judge's criterion 4 wants a
  // single clean sentence, so the text must end in terminal punctuation
  // and hold no second sentence inside it.
  if (!/[.!?]$/.test(text) || /[.!?]\s+\S/.test(text)) {
    throw new Error("text must be exactly one sentence ending in punctuation");
  }
}

validate(MEMORY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MEMORY, "utf8");
