---
name: component-architecture
description: "Trigger: create component, new UI element, atomic design, ABCD system, core components. Implement the project's dual component architecture (Global _core vs Local Modules)."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating a new reusable UI component.
- Deciding whether a component belongs in the global `_core` module or a specific feature module.
- Naming files and folders for components to maintain immediate traceability.

Do not use this pattern for page-level orchestration (e.g., router page definitions).

## Hard Rules

### UI Building Priority (SUPER IMPORTANT)

When constructing interfaces, agents MUST strictly follow this priority pattern to prevent over-reliance on third-party component libraries and ensure the project's global design system is used first:

1. **Check Global Core First**: Always search for and use global components located in `src/modules/_core/components/` (A, B, C, D, L) that fit the requirement.
2. **Fallback to Library**: If, and only if, a suitable global component does not exist in `_core/`, you may use a component from the installed UI library.
3. **Extract to Reusable**: If you end up building or modifying a UI section/group of components and notice it is being reused (or is highly reusable), you MUST extract it into a reusable component. Place it in `_core/` if it's globally applicable, or in `[scope]components/[type]/` (or `_shared/components/`) if it belongs to the module.

*Note: This rule overrides any other skill that might suggest defaulting to library components.*

- **The component architecture is strictly divided into two domains**: Global (`_core`) and Feature-Specific (`[module-name]`).

### 1. Core Module (Global Components)

Located in `src/modules/_core/components/`. Uses the **ABCD+Layout System**. The component file and naming MUST reflect the category prefix. Files should use **kebab-case** naming (`a-button.jsx` / `a-button.tsx`).

**Categories and prefixes:**

| Category | Prefix | Folder | Role | Example |
|----------|--------|--------|------|---------|
| **Atom** | `A` | `a/[type]/` | Indivisible UI elements. Smallest building blocks that require context to have meaning. | `a/button/a-button.jsx` → `<AButton />` |
| **Base** | `B` | `b/[type]/` | Wrappers that standardize structure and behavior of more complex components. Exist primarily to be extended. | `b/modal/b-modal.jsx` → `<BModal />` |
| **Composite** | `C` | `c/[type]/` | Semantic specializations of a Base. **MUST hardcode/restrict specific props** to enforce a pattern (e.g., locking color to red). | `c/modal/c-modal-danger.jsx` → `<CModalDanger />` |
| **Design** | `D` | `d/[type]/` | Complex, autonomous structures composed of Atoms, Bases, or Composites. Internal UI logic, but no business logic. | `d/card/d-card-header.jsx` → `<DCardHeader />` |
| **Layout** | `L` | `l/[type]/` | Scaffolding structures defining page shells (navbar, sidebar, containers). | `l/navbar/l-navbar.jsx` → `<LNavbar />` |

**Core constraints:**
- Components in `_core` (A, B, C, D, L) MUST NOT contain business logic, API calls, or global state mutations (e.g., Zustand). 
- If a component needs to fetch data or manage business state, it is a Feature Component and MUST be placed in a specific feature module.
- **Storybook Rule**: If the project already uses Storybook (or a similar tool), co-locate the story file alongside the core component (e.g., `a-button.stories.jsx`). Do NOT enforce this if the project doesn't use such tools.

### 2. Feature Modules (Local Components)

Located in `[scope]components/[type]/` (or `[scope]_shared/components/` if used across features).

**Constraints:**
- DO NOT use A, B, C, D, L prefixes here.
- Names MUST strictly follow the `[Type][ComponentName]` format based on their folder.
- **[scope] Definition**: Refer to `module-architecture` to resolve `[scope]` based on whether the project uses Feature-based or Vertical Slice mode.

**Common types:**

| Type | Folder | Role | Example |
|------|--------|------|---------|
| `section` | `components/section/` | Orchestrates API hooks and composes the feature. | `SectionMetrics.jsx` |
| `form` | `components/form/` | Smart form components with validation logic. | `FormLogin.jsx` |
| `fields` | `components/fields/` | Dumb input collections. Presentational only. | `FieldsProfileSettings.jsx` |
| `[custom]` | `components/[custom]/` | Any module-specific reusable piece. Folder name = type prefix. | `card/` → `CardMetric.jsx`, `list/` → `ListUsers.jsx` |

## Decision Gates

| Need | Action |
|------|--------|
| A generic button or input used everywhere | Create an **Atom** (`a/[type]/a-[name].jsx`) in `core` |
| A standardized wrapper for a UI component | Create a **Base** (`b/[type]/b-[name].jsx`) in `core` |
| A preconfigured variant of a Base (locked props) | Create a **Composite** (`c/[type]/c-[name].jsx`) in `core` |
| A complex reusable structure (no business logic) | Create a **Design** (`d/[type]/d-[name].jsx`) in `core` |
| A wrapper defining the page shell | Create a **Layout** (`l/[type]/l-[name].jsx`) in `core` |
| A component that fetches data or manages business state | It's a **Feature Component** — place it in a feature module, never in core |

## Execution Steps

1. Analyze if the component is purely generic (cross-module) or feature-specific.
2. **If Core**: choose the ABCD+L category folder, and create the file in the matching subfolder (`[prefix]/[type]/[prefix]-[name].jsx`).
3. **If Feature**: create the type folder inside the relevant feature slice `[scope]components/[type]/` and name the component `[Type][Name].jsx`.
4. If applicable, co-locate the Storybook story file alongside the core component.
5. **Dependency Rule**: Feature components CAN import `_core` components. `_core` components **MUST NEVER** import feature components (FORBIDDEN).

## Output Contract

Return:
- The created/modified component file(s).
- A brief architectural note verifying: 
  (a) the naming convention used (ABCD prefix vs [Type] prefix), 
  (b) the domain chosen (core vs feature module), and 
  (c) that no business logic exists in core components.

## References

- Core Atom: `src/modules/_core/components/a/button/a-button.jsx`
- Core Layout: `src/modules/_core/components/l/layout/l-layout-main-section.jsx`
- Module Specific: `src/modules/dashboard/features/metrics/components/card/CardMetric.jsx`
- Section Component: `src/modules/dashboard/features/metrics/components/section/SectionMetrics.jsx`
