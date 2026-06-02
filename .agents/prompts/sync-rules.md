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

Include: _"New rules/skills must respect the project's architecture mode."_

### 2. cursor-rules.mdc

Reference for creating/maintaining `.mdc` files: location, naming, frontmatter template, quality checklist (compressed to 3-4 bullets). Include: _"New rules/skills must respect the project's architecture mode."_

### 3. project-structure.mdc

**Directory tree:** Use this exact format:

```
src/
├── assets/
├── modules/
│   ├── _core/                       #   Global shared (Feature-based)
│   │   ├── api/                     #     clients/ errors/ hooks/ utils/
│   │   ├── components/              #     atom/ base/ composite/ design/ layout/
│   │   ├── constants/ context/ hooks/ layouts/ pages/ stores/ utils/
│   │   └── index.js
│   │
│   ├── Pattern: <module>/
│       ├── _shared/                 #   Slice-shared
│       ├── features/<slice>/        #   One dir per use case
│       ├── layouts/                 #   Module layout components
│       ├── pages/                   #   Module page components
│       └── index.js                 #   Public API
│
├── router/
├── App.jsx
└── main.jsx
```

`_core` is detailed (shows internal folders). Modules use a generic `<module>/` pattern — list actual module names as comments after the tree, do NOT expand them.

- Detect mode: Vertical Slice vs Feature-based (see Mode Detection below).
- Cross-module dependency rules — compact (2-3 lines).
- Critical conventions: naming, exports, pages/layouts at module root.
- Point to `module-architecture` skill for details. No skills table.
- Total: ~25 lines max.

**Mode Detection (MANDATORY):**
1. If any module has `features/<slice>/` dirs → **Vertical Slice**.
2. If only `api/`, `components/`, `hooks/` dirs at module root → **Feature-based**.
3. `_core/` always uses **Feature-based** internally.

## Output

- `[CREATED]` / `[UPDATED]` (list changes) / `[SKIPPED]`
