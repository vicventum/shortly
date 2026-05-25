---
name: routing-architecture
description: "Trigger: router, new route, lazy load, protected route, page creation. Define the standard for route registration, layouts, protection, and lazy loading in AppRouter."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating a new page component (`[Name]Page.jsx`).
- Adding a new route to `src/router/AppRouter.jsx`.
- Protecting routes using RBAC (roles/permissions) or authentication.
- Refactoring imports to optimize the Vite bundle size.

## Hard Rules

- **1. Layout Wrappers**: ALL routes MUST be wrapped inside a Layout component (e.g., `<PublicLayout>`, `<AuthLayout>`, `<DashboardLayout>`) via React Router's nested routes. Never render a page route without its Layout wrapper.
- **2. Security First (`ProtectedRoute`)**: Any route that requires state validation (Auth, Guest, Roles, Permissions) MUST be wrapped in the `<ProtectedRoute>` outlet wrapper BEFORE the Layout wrapper.
- **3. Lazy Loading for Private Pages**: To prevent Vite from bloating the initial JavaScript bundle, ALL private, authenticated, or heavy pages MUST be imported dynamically using `React.lazy()` and wrapped in a `<Suspense>` boundary. *Exception: Public/Critical pages (like `HomePage` or `LoginPage`) can remain as static imports to optimize immediate LCP (Largest Contentful Paint).*

## Decision Gates

| Need | Action |
|------|--------|
| Public route (SEO/Landing) | Static import, wrap in `<PublicLayout>` |
| Guest route (Login/Register) | Wrap in `<ProtectedRoute requireAuth={false} requireGuest />` |
| Private dashboard route | Lazy import, wrap in `<ProtectedRoute>` |
| Feature restricted by role | Wrap in `<ProtectedRoute roles={['admin']} />` |
| Feature restricted by perm | Wrap in `<ProtectedRoute permissions={['content:write']} />` |

## Execution Steps

1. Create the page component strictly in its respective module: `src/modules/[module]/pages/` (the global `src/pages/` should only be used for ultra-generic unassociated pages like 404).
2. In `AppRouter.jsx`, determine if the page is critical for initial load (Static Import) or a private/heavy feature (Lazy Import).
   ```javascript
   // Static for critical initial paint
   import { LoginPage } from '@/modules/auth/pages/LoginPage'

   // Lazy for private/heavy features (Notice the mapping for Named Exports)
   const DashboardPage = React.lazy(() => 
     import('@/modules/dashboard/pages/DashboardPage').then(module => ({ default: module.DashboardPage }))
   )
   ```
3. If using `React.lazy`, ensure there is a `<Suspense>` boundary wrapping the Routes (either at the layout level or globally inside the Router) to catch the loading state.
4. Inject the Route respecting the strict nested hierarchy: `<ProtectedRoute>` -> `<Layout>` -> `<Route element={<Page />}>`.

## Output Contract

Return:
- The updated `AppRouter.jsx` file (or the newly created page).
- A brief architectural confirmation explaining why the route was lazy-loaded (or statically imported) and verifying the security wrappers applied.

## References

- Router: `src/router/AppRouter.jsx`
- Guard Component: `src/router/ProtectedRoute.jsx`
