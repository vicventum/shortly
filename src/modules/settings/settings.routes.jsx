import { lazy } from 'react';
import { DashboardLayout } from '@/modules/links/layouts/DashboardLayout';
import { ProtectedRoute } from '@/router/ProtectedRoute';

const SettingsPage = lazy(() => import('@/modules/settings/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

export const settingsRoutes = [
  {
    element: <ProtectedRoute permissions={['settings:access']} />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { path: 'settings', element: <SettingsPage /> }
        ]
      }
    ]
  }
];
