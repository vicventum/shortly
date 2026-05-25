---
name: module-architecture
description: "Trigger: module, architecture, vertical slicing, feature, ddd, layer, boundaries. Define strict module architecture rules with Feature-based or Vertical Slice modes for React."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
---

## Activation Contract

Create or evaluate project structure and module architecture when:
- Creating a new business domain (module).
- Adding a new feature or use case to an existing module.
- Deciding where to place components, hooks, pages, or state.
- Reviewing module boundaries and import paths.

Do not use this skill for basic React component logic isolated from the architectural structure.

## Module Modes

This skill defines two structural modes. **All other architecture skills** use `[scope]` in their paths, which is resolved here.

### Mode Detection (MANDATORY first step)

Before creating or modifying module structure:
1. Check if any module contains named slice directories (e.g., `login/`, `register/`, `_shared/`) → **Vertical Slice mode**.
2. If modules contain only flat category folders (`api/`, `components/`, `hooks/`) directly at the module root → **Feature-based mode**.
3. If the project is new, **ask the user** which mode to use. Recommend Feature-based for small projects.

### `[scope]` Variable Definition

| Mode | `[scope]` resolves to | When to use |
|------|----------------------|-------------|
| **Feature-based** | `src/modules/[module]/` | Modules with ≤5 use cases. Simpler, less nesting. |
| **Vertical Slice** | `src/modules/[module]/[slice]/` | Modules with >5 use cases or highly independent features. `[slice]` is a feature name (e.g., `login/`) or `_shared/`. |

Other architecture skills reference `[scope]` — this table is the **single source of truth** for resolving it.

## Hard Rules (apply to BOTH modes)

- **Module Encapsulation:** `src/` does not contain business logic. All business logic lives in `src/modules/` as isolated domains (e.g., `modules/auth/`, `modules/links/`).
- **The Core Layer:** `src/modules/_core/` is the global application layer. It contains shared components (ABCD+L), hooks, HTTP clients (`api/clients`), global contexts, and utils used across modules. `_core/` always uses **Feature-based mode** regardless of the project's choice.
- **Pages & Layouts at Module Root:** Each module has `pages/` and `layouts/` at its **root** — never nested inside slices or `_shared/`. Pages are thin wrappers that compose feature components. Layouts define the page shell (navbar, sidebar, wrappers).
- **The Public Contract:** Modules expose their public API via a root `index.js`. Other modules CANNOT deep-import files from inside another module; they must import from the `index.js`. Internal pages can import directly from their own module.
- **Validation Folders:** Use `schemas/` as the default for schema-based validation libraries (Zod, Valibot, Yup). Use `validators/` as fallback when using pure JS validation functions without a schema library.

## Feature-based Mode

Best for small-to-medium modules (≤5 use cases). Domain-specific folders live directly at the module root.

```
src/modules/auth/
  api/
    use-login.js
    use-register.js
    use-logout.js
    providers/
      provider-auth-fetch.js
    services/
      service-auth.js
  components/
    form/
      FormLogin.jsx
    fields/
      FieldsLogin.jsx
  hooks/
    use-session.js
  stores/
    store-session.js
  contexts/
    context-auth.jsx
  constants/
    auth-roles.js
  validators/
    register.validator.js
  pages/
    LoginPage.jsx
    RegisterPage.jsx
  layouts/
    AuthLayout.jsx
  index.js
```

## Vertical Slice Mode

Best for large modules (>5 use cases) with independent features. Each slice owns its domain-specific folders. `_shared/` holds cross-slice logic.

```
src/modules/auth/
  _shared/
    api/
      providers/
        provider-auth-fetch.js
      services/
        service-auth.js
    hooks/
      use-session.js
    stores/
      store-session.js
    contexts/
      context-auth.jsx
    constants/
      auth-roles.js
  login/
    api/
      use-login.js
    components/
      form/
        FormLogin.jsx
      fields/
        FieldsLogin.jsx
  register/
    api/
      use-register.js
    components/
      form/
        FormRegister.jsx
    validators/
      register.validator.js
  session/
    api/
      use-logout.js
      use-verify-session.js
  pages/
    LoginPage.jsx
    RegisterPage.jsx
  layouts/
    AuthLayout.jsx
  index.js
```

**`_shared/` rules:**
- The underscore prefix sorts it visually to the top and signals "not a feature slice."
- Cross-slice internal imports go through `_shared/`. Direct imports between sibling slices are **prohibited**.

## Decision Gates

| Need | Action |
|------|--------|
| Creating a new use case | **Feature-based**: add files to category folders at module root. **Vertical Slice**: create a new slice directory. |
| Code used ONLY by one use case | Place inside the relevant `[scope]` folder. |
| Code shared among multiple use cases in the same module | **Feature-based**: it's already at module root (no action needed). **Vertical Slice**: place in `_shared/`. |
| Code shared across multiple modules | Place in `src/modules/_core/` or export via the source module's `index.js`. |
| Adding an endpoint / API call | Follow the `api-architecture` rules inside `[scope]api/`. |

## Execution Steps

1. **Detect mode**: Is this project Feature-based or Vertical Slice? (See Mode Detection above.)
2. Identify the boundary: Does the change belong to a specific use case, a module-shared concern, or a global concern (Core)?
3. Place files according to the active mode's structure.
4. Update the module's `index.js` ONLY if the module needs to expose something new to other modules.
5. Ensure `pages/` and `layouts/` remain at the **module root**.

## Output Contract

Return:
- The generated folder structure or file placements.
- A note specifying the active mode (Feature-based or Vertical Slice) and why the placement was chosen.
