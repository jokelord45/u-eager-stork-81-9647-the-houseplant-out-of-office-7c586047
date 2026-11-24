// The Houseplant Out-of-Office — make.fun entry (program/v1).
// Writes one out-of-office auto-reply, as if a houseplant sent it,
// to /output/entry.txt. Node 22, stdlib only, no network, no secrets.
//
// The line: a fern covering the inbox. The joke is built on the plant's
// own life — months of being ignored until it died — and the twist lands
// in the last few words: the dead plant is still the office's most
// responsive employee. It reads as a real out-of-office auto-reply, stays
// on the plant the whole way through, and wastes no words.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. One line, 108 characters, well inside the 120 limit.
// Revision: added "somehow" — it flags the impossibility (a dead plant
// outperforming the staff) and makes the final twist land harder.
const ENTRY =
  "Out of office. The fern is covering my inbox. Dead since March — somehow still our most responsive employee.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 120 characters,
// not only white space. Fail loudly instead of writing an invalid entry.
const MAX_CHARS = 120;

function validate(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("entry is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} characters to ${outPath}`);
  console.log(ENTRY);
}

main();
