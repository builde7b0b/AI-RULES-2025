# Cursor Guardrails: No Cycles, No Breakages

- Purpose: A drop-in .cursorrules that forces Cursor to avoid/repair circular dependencies, run tests & checks before finishing, and add features modularly without breaking working logic.

### This repo contains:
- .cursorrules — the policy file Cursor reads on every session.
- Minimal tooling (lint, cycle scan, tests) to enforce the policy in CI and locally.

### Why this exists (TL;DR)
- Circular imports rot velocity.
- “It compiles on my machine” isn’t a test plan.
- Feature work should be additive and behind interfaces/flags, not invasive rewrites.
- This ruleset makes Cursor act like a Staff engineer standing over your shoulder.

### What you get

- Layered architecture guardrails (domain → application → infrastructure → ui).
- Hard stops on cycles, cross-layer leaks, and side-effect imports.
- Change workflow: typecheck → lint → cycle scan → tests → changelog.
- Modular feature template (feature local layers, public API via application).
- Auto-repair playbook for cycles (shared types, ports, mediator).
- Docs discipline (ADR + CHANGELOG entry per change).

### How to use

1. Drop the YAML as .cursorrules at the repo root (or paste it as your first message to Cursor each session).
2. Add the supporting scripts/configs (or map the commands: to your existing scripts).
3. From now on, Cursor will:
- refuse/repair cyclic imports,
- run typecheck/lint/cycle scan/tests before finishing,
- keep new work behind flags and proper ports,
- generate/require a short CHANGELOG blurb per change

#### Feature Flag Toggle (Example) 
```
// src/application/flags.ts
export const flags = {
  newFeatureX: false,
};

```

#### Port + Adapter Example 
```
// src/application/ports/UserRepo.ts
export interface UserRepo {
  getById(id: string): Promise<User>;
}

// src/infrastructure/db/UserRepoPg.ts
import { UserRepo } from "../../application/ports/UserRepo";
export class UserRepoPg implements UserRepo { /* ... */ }

// src/application/services/GetUser.ts
import type { UserRepo } from "../ports/UserRepo";
export const getUser = (repo: UserRepo) => (id: string) => repo.getById(id);
```
