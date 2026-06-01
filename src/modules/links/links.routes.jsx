import { lazy } from 'react';
import { DashboardLayout } from '@/modules/links/layouts/DashboardLayout';
import { ProtectedRoute } from '@/router/ProtectedRoute';

const DashboardPage = lazy(() => import('@/modules/links/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));

export const linksRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> }
        ]
      }
    ]
  }
];
