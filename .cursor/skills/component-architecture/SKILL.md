---
name: component-architecture
description: "Trigger: create component, new UI element, atomic design, ABCD system, core components. Implement the project's dual component architecture (Global Core vs Local Modules)."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating a new reusable UI component.
- Deciding whether a component belongs in the global `core` or a specific feature module.
- Naming files and folders for components to maintain immediate traceability.

## Hard Rules

- **The component architecture is strictly divided into two domains**: Global (`core`) and Feature-Specific (`[module-name]`).

### 1. Core Module (Global Components)
- Located in `src/modules/core/components/[category]/`.
- Uses the **ABCD+Layout System**. The component and file name MUST start with the designated prefix:
  - **A (Atoms)**: `A[Name].jsx` (e.g., `AButton`, `AInput`). Indivisible UI elements.
  - **B (Bases)**: `B[Name].jsx` (e.g., `BModal`). Wrappers that establish standard structural behavior.
  - **C (Composites)**: `C[Name].jsx` (e.g., `CModalDanger`). Semantic specializations of Base components. **Constraint**: MUST hardcode/restrict specific design props to enforce the pattern (e.g., locking the color to red).
  - **D (Designs)**: `D[Name].jsx` (e.g., `DTimelineGroup`). Complex structures with internal UI logic.
  - **Layouts**: `Layout[Name].jsx` (e.g., `LayoutMainSection`). Scaffolding structures used directly in router pages.
- **Global Constraint**: Components in `core` (A, B, C, D, Layout) MUST NOT contain business logic, API calls, or global state mutations (Zustand). If a component needs to fetch data, it is a Feature Component and MUST be moved to a specific module.

### 2. Feature Modules (Local Components)
- Located in `src/modules/[module-name]/components/[type]/`.
- **Constraint**: DO NOT use A, B, C, D prefixes here.
- Names MUST strictly follow the `[Type][ComponentName]` format based on their folder.
- **Common Types**:
  - `section`: Orchestrates API hooks and composes the page. (e.g., `SectionMetrics.jsx`).
  - `form` / `fields`: Smart forms and dumb input collections. (e.g., `FormLogin.jsx`, `FieldsProfileSettings.jsx`).
  - `[custom-type]`: Any reusable piece specific to the module. (e.g., folder `card` -> `CardMetric.jsx`, folder `list` -> `ListUsers.jsx`).

## Decision Gates

| Need | Action |
|------|--------|
| A generic button or input used everywhere | Create an **Atom** (`AButton`) in `core` |
| A reusable card specific to the Dashboard | Create a **[Type]** (`CardMetric`) in `dashboard` module |
| A wrapper defining the page shell | Create a **Layout** in `core` or the specific module |
| A composition of core components with specific logic | Create a **Section** or **Design** depending on scope |

## Execution Steps

1. Analyze if the component is purely generic (cross-module) or feature-specific.
2. If Global (`core`), choose the appropriate ABCD+Layout category folder (`atom`, `base`, `composite`, `design`, `layout`) and prefix the component accordingly.
3. If Feature-specific, create the type folder in `/[module]/components/[type]/` (e.g. `card`) and name the component `[Type][Name].jsx` (e.g. `CardMetric.jsx`).
4. **Dependency Rule**: Feature components can import `core` components, but `core` components MUST NEVER import feature components.

## Output Contract

Return:
- The created/modified component file.
- A brief architectural note verifying the naming convention used (ABCD prefix vs [Type] prefix) based on the domain chosen.

## References

- Core Atom: `src/modules/core/components/atom/AButton.jsx`
- Core Layout: `src/modules/core/components/layout/LayoutMainSection.jsx`
- Module Specific: `src/modules/dashboard/components/card/CardMetric.jsx`
- Section Component: `src/modules/dashboard/components/section/SectionMetrics.jsx`
