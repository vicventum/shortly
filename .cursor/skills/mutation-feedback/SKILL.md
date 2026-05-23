---
name: mutation-feedback
description: "Trigger: handle error, toast notification, mutation meta, API error. Enforce the global mutation feedback pattern instead of local UI states."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating or modifying an API mutation hook (e.g., `use-[action].js`).
- Handling success or error toast notifications after form submissions or API calls.
- Refactoring UI components that use manual `useState` to track API errors or loading states.

## Hard Rules

- **1. No Local Error States for APIs**: UI components MUST NOT use `useState` to manually track error strings or success flags from APIs. Delegate this entirely to the mutation hook.
- **2. The `meta` Object**: All mutations MUST define their user feedback text via the `meta` configuration object (`successMessage`, `errorMessage`, `showSuccessToast`).
- **3. Global Delegation**: Components MUST NOT call `toast.success()` or `toast.error()` directly inside their `onSubmit` handlers. The underlying global hook (or TanStack Query `QueryClient` cache callbacks) will read the `meta` object and dispatch the UI notifications automatically.
- **4. Toast Adapter**: When the global layer dispatches the notification, it MUST use the project's decoupled toast adapter (`src/modules/core/utils/toast/toast-adapter.js` or `use-toast.js`). **NEVER** import a third-party toast library (like `sonner` or `react-hot-toast`) directly into the mutation hooks or components.

## Decision Gates

| Need | Action |
|------|--------|
| Show a toast on success | Add `meta: { showSuccessToast: true, successMessage: '...' }` to the hook |
| Show a toast on failure | Add `meta: { errorMessage: '...' }` to the hook |
| Close a modal on success | Pass a custom `onSuccess` callback when calling the hook from the UI |
| Disable a submit button | Use the `isPending` / `isLoading` property returned by the hook |

## Execution Steps

1. In the API Hook (`src/modules/[module]/features/[name]/api/use-[action].js`), configure the default `meta` object:
   ```javascript
   return useMutation({
     mutationFn: ...,
     meta: {
       showSuccessToast: true,
       successMessage: 'Acción exitosa',
       errorMessage: 'Error en la operación'
     },
     ...options
   })
   ```
2. In the UI Component (`Form[Name].jsx`), consume the mutation and rely on the global layer to show the toasts. Do not import the toast library directly for API feedback.
3. If the UI needs to react (e.g., close a modal), pass an `onSuccess` override from the component, but let the `meta` object handle the notification.

## Output Contract

Return:
- The created/modified mutation hook including the `meta` configuration.
- A brief confirmation that any local `useState` for error tracking in the UI component was removed.

## References

- Example implementation: `src/modules/settings/features/profile/api/use-update-profile.js`
