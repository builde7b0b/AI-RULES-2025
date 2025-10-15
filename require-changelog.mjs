import { execSync } from "node:child_process";
const diff = execSync("git diff --cached --name-only", { encoding: "utf8" });
if (!diff.split("\n").some(p => p === "CHANGELOG.md")) {
  console.error("CHANGELOG.md missing from staged changes.");
  process.exit(1);
}
