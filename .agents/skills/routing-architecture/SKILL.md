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

- **1. Decentralized Routing (Module Contracts)**: Routes MUST NOT be centralized in `AppRouter.jsx`. Each module must act as its own routing boundary by exposing a `[module].routes.jsx` file exporting an array of route objects.
- **2. Layout Wrappers**: ALL routes MUST be wrapped inside a Layout component (e.g., `<PublicLayout>`, `<AuthLayout>`, `<DashboardLayout>`). Never render a page route without its Layout wrapper.
- **3. Security First (`ProtectedRoute`)**: Any route that requires state validation (Auth, Guest, Roles, Permissions) MUST be wrapped in the `<ProtectedRoute>` outlet wrapper BEFORE the Layout wrapper.
- **4. Lazy Loading for Private Pages**: To prevent Vite from bloating the initial JavaScript bundle, ALL private, authenticated, or heavy pages MUST be imported dynamically using `React.lazy()` inside the module's route file. *Exception: Public/Critical pages (like `HomePage` or `LoginPage`) can remain as static imports to optimize immediate LCP.*

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
2. Open or create the module's route contract file: `src/modules/[module]/[module].routes.jsx`.
3. Inside the module's route file, define the route using object syntax for `useRoutes`, applying `React.lazy` if it's a private page.
   ```javascript
   // src/modules/auth/auth.routes.jsx
   import { lazy } from 'react';
   import { AuthLayout } from './layouts/AuthLayout';
   import { ProtectedRoute } from '@/router/ProtectedRoute';
   import { LoginPage } from './pages/LoginPage'; // Static for LCP

   const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));

   export const authRoutes = [
     {
       element: <ProtectedRoute requireAuth={false} requireGuest />,
       children: [
         {
           path: '/',
           element: <AuthLayout />,
           children: [
             { path: 'login', element: <LoginPage /> },
             { path: 'register', element: <RegisterPage /> }
           ]
         }
       ]
     }
   ];
   ```
4. In `AppRouter.jsx`, import the module's route array and spread it into the `useRoutes` hook.
   ```javascript
   import { useRoutes } from 'react-router';
   import { authRoutes } from '@/modules/auth/auth.routes';
   import { dashboardRoutes } from '@/modules/dashboard/dashboard.routes';

   export function AppRouter() {
     const element = useRoutes([...authRoutes, ...dashboardRoutes]);
     return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
   }
   ```

## Output Contract

Return:
- The updated `AppRouter.jsx` file (or the newly created page).
- A brief architectural confirmation explaining why the route was lazy-loaded (or statically imported) and verifying the security wrappers applied.

## References

- Router: `src/router/AppRouter.jsx`
- Guard Component: `src/router/ProtectedRoute.jsx`
