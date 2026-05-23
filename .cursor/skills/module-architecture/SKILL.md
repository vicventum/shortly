---
name: module-architecture
description: "Trigger: module, architecture, vertical slicing, feature, ddd, layer, boundaries. Define strict Feature-Based and Vertical Slicing architecture rules for React."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Create or evaluate project structure and module architecture when:
- Creating a new business domain (module).
- Adding a new feature to an existing module.
- Deciding where to place components, hooks, pages, or state.
- Reviewing module boundaries and import paths.

Do not use this skill for basic React component logic isolated from the architectural structure.

## Hard Rules

- **Module Encapsulation:** The project root `src/` does not contain business logic. All business logic is encapsulated in `src/modules/` acting as isolated domains (e.g., `modules/auth/`, `modules/url-shortening/`).
- **The Core Layer:** `src/modules/core/` acts as the global application layer. It contains globally shared components, hooks, HTTP clients (`api/clients`), global contexts, and utils used across multiple modules.
- **Feature-Based Slicing:** Within a module (e.g., `modules/auth/`), code is grouped by Use Case in `features/[name]/` (Vertical Slicing).
- **Strict Encapsulation:** A feature folder contains its own `components/`, `hooks/`, `api/`, and `validators/`. Cross-feature internal imports are strictly prohibited.
- **Pages & Layouts:** Each module has its own `pages/` and `layouts/` directories at its root. Pages act as thin wrappers that import and render views/components from the `features/` layer. Pages and Layouts are then exported to the global `AppRouter`.
- **The Public Contract:** Modules must expose their public API via a root `index.js`. Other modules CANNOT deep-import files from inside another module; they must import from the `index.js`. Internal pages can import directly from their own module's features.
- **Validation Folders:** Use `schemas/` directories as the default standard for validation libraries (Zod, Valibot, Yup). If the project uses pure JavaScript validation functions without a schema library, use `validators/` directories as a fallback.

## Decision Gates

| Need | Action |
|------|--------|
| Creating a new Use Case (e.g., Login) | Create a new feature in `src/modules/[module]/features/[name]/` |
| Code used ONLY by one feature | Place it inside the feature's specific folder (`features/[name]/utils/`, etc.) |
| Code shared among multiple features in the same module | Place it in `src/modules/[module]/shared/` |
| Code shared across multiple modules | Place it in `src/modules/core/` or export it via the source module's `index.js` |
| Adding an endpoint / API call | Follow the `api-architecture` rules inside `features/[name]/api/` |

## Execution Steps

1. Identify the boundary of the change: Does it belong to an existing Feature, an existing Module (Shared), or is it Global (Core)?
2. If it is feature-specific, nest all its related parts (`components/`, `hooks/`, `api/`, `stores/`, `utils/`, `validators/`) inside `features/[name]/`.
3. If it is shared within the module, place it in `src/modules/[module]/shared/`.
4. Update the module's `index.js` ONLY if the module needs to expose something new to other modules.
5. Ensure the module's `pages/` directory correctly imports directly from the `features/` layer without containing business logic.

## Output Contract

Return:
- The generated folder structure or file placements adhering to the Feature-Based and Vertical Slicing rules.
- Explanation of why the specific placement was chosen based on the Scope (Feature vs Shared vs Core).
