import { PublicLayout } from '@/modules/_core/layouts/PublicLayout';
import { HomePage } from '@/modules/brand/pages/HomePage';

export const brandRoutes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> }
    ]
  }
];
