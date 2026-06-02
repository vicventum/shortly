import { lazy } from 'react';
import { DashboardLayout } from '@/modules/links/layouts/DashboardLayout';
import { PublicLayout } from '@/modules/_core/layouts/PublicLayout';
import { ProtectedRoute } from '@/router/ProtectedRoute';
import { UnauthorizedPage } from '@/modules/_core/pages/UnauthorizedPage';

const AdminPage = lazy(() => import('@/modules/_core/pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const EditorPage = lazy(() => import('@/modules/_core/pages/EditorPage').then((m) => ({ default: m.EditorPage })));

export const coreRoutes = [
  {
    element: <ProtectedRoute roles={['admin']} />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { path: 'admin', element: <AdminPage /> }
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute permissions={['content:write']} />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { path: 'editor', element: <EditorPage /> }
        ]
      }
    ]
  },
  {
    path: '/unauthorized',
    element: <PublicLayout />,
    children: [
      { index: true, element: <UnauthorizedPage /> }
    ]
  }
];
