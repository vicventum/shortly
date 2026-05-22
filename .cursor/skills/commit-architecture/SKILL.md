---
name: commit-architecture
description: "Trigger: git commit, commit message, push, version control, creating a commit. Enforce Conventional Commits with Gitmoji and backtick formatting for files."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating a Git commit message.
- Executing `git commit -m` on behalf of the user.
- Formatting PR titles or change logs.

## Hard Rules

- **1. Conventional Commits**: Commits MUST strictly follow the `<type>[optional scope]: <description>` structure.
- **2. Gitmoji Integration**: Immediately after the colon and space, you MUST include the appropriate Gitmoji (following the https://gitmoji.dev/ standard).
- **3. File References**: Any time a file, component, or specific technical term is mentioned in the commit description, it MUST be wrapped in backticks (e.g., \`FormLogin.jsx\`).
- **4. No AI Attribution**: NEVER add "Co-Authored-By" or any AI signature to the commit.
- **5. Language**: The commit message MUST be written in Spanish, following the project's native language.

## Decision Gates

| Need | Action |
|------|--------|
| New feature in dashboard | `feat(dashboard): ✨ Agrega lógica para \`DashboardPage\`` |
| Bugfix in core API | `fix(core): 🐛 Corrige error de parseo en \`use-toast.js\`` |
| Refactoring a component | `refactor(auth): ♻️ Cambia \`sessionStorage\` a Zustand` |
| Updating docs | `docs(readme): 📝 Actualiza documentación de instalación` |

## Execution Steps

1. Identify the files changed and their corresponding module (to define the scope).
2. Determine the Conventional Commit type (`feat`, `fix`, `refactor`, `chore`, `docs`, `style`).
3. Select the matching Gitmoji.
4. Write the description in Spanish, ensuring all file names, functions, or variables are wrapped in backticks.
5. Provide the commit string or execute the commit directly if in CLI mode.

## Output Contract

Return:
- The exact git commit message generated.
- A brief verification that the format (Type + Scope + Gitmoji + Backticks) was strictly followed.
