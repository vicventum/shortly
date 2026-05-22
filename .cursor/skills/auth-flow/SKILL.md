---
name: auth-flow
description: "Trigger: authentication, login, register, protected route, session state, auth roles. Replicate the standard Auth Flow architecture."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Bootstrapping a new project that requires user authentication.
- Implementing Protected Routes in React Router.
- Creating or refactoring Login, Register, or Logout API hooks.
- Setting up Role-Based Access Control (RBAC).

## Hard Rules

- **1. Global State (`store-session.js`)**: Use Zustand (or equivalent) with a persist middleware (e.g., `sessionStorage`) to hold `user` metadata and tokens. Keep it pure: only state and raw setters (`setSession`, `cleanSession`, `updateUser`).
- **2. Session Hook (`use-session.js`)**: Wrap the store in a custom hook. This is the consumer layer. For advanced apps, this hook MUST expose role/permission checks (`hasRole`, `hasPermission`). For simple apps, omit the role logic.
- **3. Protected Routes (`ProtectedRoute.jsx`)**: An outlet wrapper that consumes `use-session.js` to guard navigation. It MUST handle `requireAuth` and `requireGuest`. For advanced apps, it must also validate `roles` and `permissions` arrays.
- **4. Interceptors (`client-[name]-auth.js`)**: The API client (Fetch/Axios) MUST consume the token directly from the global store (e.g., `useSessionStore.getState().getAccessToken()`), rather than hardcoding `sessionStorage` reads. This maintains the store as the single source of truth. It must also handle 401 refresh logic automatically.
- **5. Auth APIs (`use-[action].js`)**: Auth endpoints MUST strictly follow the `api-architecture` skill (Provider -> Service -> Hook).
  - `use-login`: Mutation. On success, MUST call `setSession(user, tokens)`.
  - `use-register`: Mutation. On success, calls `setSession` or redirects.
  - `use-logout`: Mutation. MUST call `cleanSession()` and clear tokens.
  - `use-verify-session` (Advanced): Query. Hits `/auth/me` on app load to sync local state with the backend. Skip this if building a simple flow.

## Decision Gates

| Need | Action |
|------|--------|
| Protecting a private dashboard | Wrap in `<ProtectedRoute requireAuth>` |
| Preventing logged-in users from seeing login | Wrap in `<ProtectedRoute requireGuest>` |
| Restricting to Admins (Advanced) | Wrap in `<ProtectedRoute roles={['admin']}>` |
| Successful Login response | `use-login` calls `setSession` |
| Invalidating session | `use-logout` calls `cleanSession` |
| Simple App (No roles) | Omit `constants/auth-roles.js` and role checks |

## Execution Steps

1. Check requirements: Ask the user if this is a **Simple** flow (just login/register) or an **Advanced** flow (roles, permissions, verify endpoint).
2. Create the global store (`store-session.js`).
3. Create the hook wrapper (`use-session.js`). Include `auth-roles.js` integration only if Advanced.
4. Create the `ProtectedRoute.jsx` component and integrate it into the Router layout.
5. Create the authenticated client (`client-[name]-auth.js`).
6. Implement the Auth API hooks (`use-login`, `use-logout`, `use-register`) following `api-architecture`. Add `use-verify-session` if Advanced.

## Output Contract

Return:
- The bootstrapped authentication files.
- A brief architectural note confirming whether the "Simple" or "Advanced" flow was implemented, and mentioning how the global store was connected to the API hooks.

## References

- Example Store: `src/modules/auth/stores/store-session.js`
- Example Hook: `src/modules/auth/hooks/use-session.js`
- Example Route: `src/router/ProtectedRoute.jsx`
- Example API Hook: `src/modules/auth/api/hooks/use-login.js`
