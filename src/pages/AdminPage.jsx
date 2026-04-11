export function AdminPage() {
  return (
    <div className="container py-12 text-center">
      <h1 className="text-4xl font-bold text-error mb-4">Admin Panel</h1>
      <div className="mt-8 p-6 bg-base-200 rounded-xl border border-error border-opacity-30 shadow">
        <p className="font-medium text-lg">Strictly Authorized Personnel Only</p>
        <p className="mt-2 text-base-300">You can see this because you have the "admin" role.</p>
      </div>
    </div>
  )
}
