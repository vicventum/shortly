# Init Project Rules

Generate or update the 3 core `.mdc` rules in `.agents/rules/` for this project.

## Workflow

1. **Discover** — Read `package.json`, build config (vite.config / webpack / etc), tsconfig/jsconfig, and top-level directory structure to understand the project
2. **For each rule**: if it doesn't exist → create it from scratch. If it exists → read it, diff against current project reality, update stale parts, add missing technologies or conventions, remove outdated references
3. **Report** — Summarize what was created, updated, or left unchanged for each file

## Rules

### 1. tech-stack.mdc

Build a stack overview table and conventions, **detected dynamically from the project** (not hardcoded).

**Overview table:** List each technology with its role only. NO versions — point to the manifest file (`package.json`, `Cargo.toml`, `go.mod`, etc.) as the single source of truth.

**Conventions:** Only include what is **non-obvious or project-specific** — the agent already knows standard tooling conventions. Focus on:

1. **Patterns that contradict defaults** — decisions made deliberately (e.g., "we disable `react/prop-types` because we use the React Compiler")
2. **Project-specific architecture rules** — (e.g., "mutation feedback always goes through react-hot-toast, never local state")
3. **Configuration quirks** — (e.g., "production base path is `/shortly/` in vite.config.js")
4. **Unique combinations** — (e.g., "Tailwind v4 CSS-first + DaisyUI as plugin + CVA for variants")

Skip anything the agent can infer from a standard library's docs. Aim for **20-40 lines total** of conventions, grouped by technology. Bullet points, no paragraphs.

### 2. cursor-rules.mdc

Reference for creating and maintaining rule files:

- Rule files location: `.agents/rules/`
- Naming: kebab-case, `.mdc` extension
- Structure template (frontmatter with description + globs, markdown body with examples)
- Rule Quality Checklist:
  - Actionable & specific
  - One problem per rule
  - Include `// Do` and `// Don't` examples
  - Scope with `globs`; avoid `**/*` unless truly global
  - Examples from real code, not generic snippets
  - Keep references current

### 3. project-structure.mdc

Based on the actual project layout:

- Path alias configured (e.g. `@/` → `src/`)
- Top-level directory layout with a tree view — use **condensed format**:
  - Show the module pattern (<module>/ with _shared/, features/<slice>/, layouts/, pages/) once
  - List actual module names flat below the pattern
  - Do NOT expand every module — the pattern represents them all
- Module/feature organization — **detect the mode first**:

  **Mode Detection (MANDATORY):**
  1. Inspect the modules directories under `src/modules/` (or equivalent).
2. If any module contains **named feature/slice directories** (e.g., `login/`, `register/`, `_shared/`, or wrapped in a `features/` folder) → **Vertical Slice mode**.
3. If modules contain only **flat category folders** (`api/`, `components/`, `hooks/`) directly at the module root → **Feature-based mode**.
4. `_core/` (or equivalent global shared layer) always uses **Feature-based mode** internally regardless of the project's choice.

  State the detected mode + any project-specific exceptions (e.g., "brand has no _shared"). Do NOT explain what the pattern means — the `module-architecture` skill already covers that. Instead, add a note pointing to the skill for details.

- Cross-module dependency rules
- Architecture skills table — load the skill registry (`.atl/skill-registry.md` or `mem_search`) and map skills to "when you need to..." scenarios. Include only skills that match this project's patterns.
- Critical conventions: folder naming, file naming, exports pattern, pages/layouts at module root rule

## Output

For each of the 3 files, say:
- `[CREATED]` — didn't exist, created fresh
- `[UPDATED]` — existed, read and updated (list what changed)
- `[SKIPPED]` — existed and already matches current project state
