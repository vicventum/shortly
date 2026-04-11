export function EditorPage() {
  return (
    <div className="container py-12 text-center">
      <h1 className="text-4xl font-bold text-secondary mb-4">Editor Workspace</h1>
      <div className="mt-8 p-6 bg-base-200 rounded-xl shadow">
        <p className="font-medium text-lg">Content Management</p>
        <p className="mt-2 text-base-300">You can see this because you have the "content:write" permission.</p>
      </div>
    </div>
  )
}
