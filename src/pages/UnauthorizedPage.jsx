import { AButton } from '@/modules/core/components/atom/AButton'

export function UnauthorizedPage() {
  return (
    <div className="container py-24 text-center">
      <div className="max-w-md mx-auto p-8 bg-base-200 rounded-2xl shadow-lg border border-error">
        <h1 className="text-6xl font-black text-error mb-4">403</h1>
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-base-300 mb-8">
          You don't have the necessary permissions or roles to view this page.
        </p>
        <AButton to="/dashboard" variant="rounded" color="primary">
          Back to Dashboard
        </AButton>
      </div>
    </div>
  )
}
