---
name: page-section-architecture
description: "Trigger: create page, UI layout, new view, add section, component structure. Implement the Layout -> Page -> Section architecture."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating a new page or view component.
- Refactoring a monolithic page into modular sections.
- Adding a new distinct content block to an existing page.

Do not use this pattern for isolated atomic components (buttons, inputs) or global providers.

## Hard Rules

- **1. Layout**: Every page MUST be wrapped in a Layout component (from `core/` or the local module) that defines the shell (navbar, sidebar, max-width wrappers).
- **2. Page as Orchestrator**: The Page component composes the view. It uses semantic HTML `<section>` tags (or other appropriate semantics) to wrap each imported Section component.
- **3. Flow Margins**: Spacing between sections MUST be handled at the Page level using downward margins on the `<section>` wrappers (e.g., `className="mb-8"` or `mb-10`). 
  - *Never* mix top and bottom margins for structural flow.
  - *Never* hardcode structural flow margins inside the `Section[Name]` component itself. Keep it reusable.
- **4. Section Components**: Located in `/[module-name]/features/[feature-name]/components/Section[Name].tsx|jsx`. They act as feature containers.
- **5. Data Fetching (Hooks)**:
  - *With TanStack Query (Server State)*: Call hooks directly inside the `Section` component. You do NOT need to lift state to the Page. Sibling coordination and reactivity are handled automatically via cache invalidation (`queryClient.invalidateQueries`).
  - *Without TanStack Query (Legacy/Manual)*: If multiple sections share data or need coordination (e.g., submitting a form triggers a manual `refetch` in a list), lift the state to the `Page` component and pass data/handlers via props.
- **6. Presentation**: Sections delegate rendering to smaller UI components (Cards, Forms, Timelines) which should remain pure.

## Decision Gates

| Need | Action |
|------|--------|
| Defining the global wrapper | Use a **Layout** component inside the Page |
| Stacking blocks vertically | Wrap blocks in `<section className="mb-X">` inside the Page |
| Grouping a feature's UI | Create a **Section** component in `/[module]/features/[feature-name]/components/` |
| Displaying dumb UI | Pass props to pure/presentational components |
| Where to call API Hooks? | Check if using TanStack Query. If yes -> **Section**. If no -> **Page** (for shared state). |

## Execution Steps

1. Create or locate the `Page` component.
2. Wrap the `return` statement with the appropriate `LayoutMainSection` or similar layout.
3. Create the required `Section` components in `/[module-name]/features/[feature-name]/components/`.
4. In the `Page`, import the `Section` components and wrap each in a `<section className="mb-[size]">`.
5. Determine the data fetching strategy:
   - If using TanStack Query: Call hooks isolated inside the `Section`. Let the global cache coordinate updates.
   - If NOT using TanStack Query: Lift hooks to the `Page` ONLY if data is shared or needs manual sibling coordination. Otherwise, keep it in the `Section`.
6. Inside the `Section`, compose the UI using smaller atomic components, passing down data as props.

## Output Contract

Return:
- The created/modified files (Page, Sections, Presentational components).
- A brief architectural note explaining the data fetching placement (Page vs Section).

## References

- Example Page orchestrator: `src/modules/dashboard/pages/DashboardPage.jsx`
- Example Section consumer: `src/modules/dashboard/features/metrics/components/SectionMetrics.jsx`
