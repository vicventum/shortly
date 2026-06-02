import { AuthLayout } from '@/modules/auth/layouts/AuthLayout';
import { ProtectedRoute } from '@/router/ProtectedRoute';
import { RegisterPage } from '@/modules/auth/pages/RegisterPage';
import { LoginPage } from '@/modules/auth/pages/LoginPage';

export const authRoutes = [
  {
    element: <ProtectedRoute requireAuth={false} requireGuest />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          { path: 'register', element: <RegisterPage /> },
          { path: 'login', element: <LoginPage /> }
        ]
      }
    ]
  }
];
