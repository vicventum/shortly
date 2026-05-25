# Sync Project Rules

Generate or update the 3 core `.mdc` rules in `.agents/rules/` for this project. **Keep each file short — aim for 15-35 lines.** The agent already knows standard tooling. Only document project-specific decisions that contradict defaults.

## Workflow

1. **Discover** — Read `package.json`, build config, tsconfig/jsconfig, and top-level `src/` structure.
2. **For each rule**: create if absent; if exists, diff and update stale/missing content.
3. **Report** — `[CREATED]` / `[UPDATED]` (list changes) / `[SKIPPED]`.

## Rules

### 1. tech-stack.mdc

**Overview table:** List each technology with its role. NO versions — point to `package.json`.

**Conventions:** Only what's **non-obvious**. If the agent can infer it from the library's docs, skip it. ~10-15 lines max. Bullet points, no paragraphs.

Every rule in this file must also include: _"New skills/rules must respect this project's architecture mode."_

### 2. cursor-rules.mdc

Reference for creating/maintaining `.mdc` files: location, naming, frontmatter template, quality checklist (compressed to 3-4 bullets). Include: _"New rules/skills must respect the project's architecture mode."_

### 3. project-structure.mdc

- Path alias + condensed tree view (pattern once, modules listed flat).
- Detect mode: Vertical Slice vs Feature-based (see Mode Detection below).
- State mode + project-specific exceptions (e.g., "brand has no _shared").
- Cross-module dependency rules — compact (2-3 lines).
- Critical conventions: naming, exports, pages/layouts at module root.
- Point to `module-architecture` skill for details.
- No skills table — the registry already handles that.
- Total: ~25 lines max.

**Mode Detection (MANDATORY):**
1. If any module has `features/<slice>/` dirs → **Vertical Slice**.
2. If only `api/`, `components/`, `hooks/` dirs at module root → **Feature-based**.
3. `_core/` always uses **Feature-based** internally.

## Output

- `[CREATED]` / `[UPDATED]` (list changes) / `[SKIPPED]`
