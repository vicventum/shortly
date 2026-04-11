export function SettingsPage() {
  return (
    <div className="container py-12 text-center">
      <h1 className="text-4xl font-bold text-accent mb-4">Settings</h1>
      <div className="mt-8 p-6 bg-base-200 rounded-xl shadow">
        <p className="font-medium text-lg">System Preferences</p>
        <p className="mt-2 text-base-300">You can see this because you have the "settings:access" permission.</p>
      </div>
    </div>
  )
}
