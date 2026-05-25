---
name: adapter-pattern
description: "Trigger: third-party library, toast, analytics, date formatter, adapter. Enforce the Adapter Pattern to decouple external libraries from business logic."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Installing and implementing a new third-party library (e.g., toast notifications, date formatting, analytics tracking, http clients).
- Refactoring UI components or services that directly import external packages.
- Creating global utilities that wrap external behaviors.

## Hard Rules

- **1. No Direct Imports**: UI Components and Business Logic (Services/Hooks) MUST NEVER directly import a third-party library (e.g., `import toast from 'sonner'`).
- **2. The Adapter Layer**: Create an adapter file (e.g., `toast-adapter.js`) that imports the third-party library and maps its specific API to a generic, project-standard interface.
- **3. Consumer Hook/Utility**: Expose the adapter to the rest of the application through a custom hook (e.g., `useToast()`) or a pure utility function. 

*Architectural Goal*: If the underlying third-party library is replaced in the future, ONLY the adapter file should change. Zero components or business logic files should need refactoring.

## Decision Gates

| Need | Action |
|------|--------|
| Using a UI notification library | Create `toast-adapter.js` and expose via `use-toast.js` |
| Formatting dates in UI | Create a `date-formatter.js` utility wrapping `dayjs` |
| Tracking user events | Create an `analytics-adapter.js` wrapping the tracking SDK |
| Calling the API | Use the `createAuthClient` factory (HTTP adapter) |

## The 4-Part Adapter Architecture

When integrating a complex library that requires initialization (like Toasts or Analytics), follow this structure inside `src/modules/core/utils/[concept]/`:

1. **Constants (`constants.js`)**: Define abstract enums for your app (e.g., `ToastPosition.TOP_CENTER`) so the app doesn't rely on third-party strings.
2. **Adapter (`[concept]-adapter.js`)**: The ONLY file that imports the third-party library. It maps the external API to your generic interface and maps your abstract constants to the library's required format.
3. **Provider (`[Concept]Provider.jsx`)**: If the library requires a React context or initialization wrapper, create it here. It MUST consume the adapter mappings (to avoid DRY violations).
4. **Consumer Hook (`use-[concept].js`)**: A clean React hook that returns the adapter methods for UI components to use natively.

## Output Contract

Return:
- The created Adapter file and Consumer hook/utility.
- A brief architectural confirmation that the UI component is fully decoupled from the third-party dependency.

## References

- Example Hook Wrapper: `src/modules/core/utils/toast/use-toast.js`
- Example Adapter: `src/modules/core/utils/toast/toast-adapter.js`
