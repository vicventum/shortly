import { useAuth } from '@/modules/auth/hooks/use-auth'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="container py-12 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">Dashboard</h1>
      <p className="text-lg mb-2">Welcome back, <strong>{user?.name}</strong>!</p>
      <p className="text-base-300">
        Role: <span className="badge badge-primary">{user?.role}</span>
      </p>
      <div className="mt-8 p-6 bg-base-200 rounded-xl shadow">
        <p>This is a protected route. Only authenticated users can see this page.</p>
      </div>
    </div>
  )
}
