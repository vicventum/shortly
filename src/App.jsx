import { AppRouter } from './router/AppRouter'
import { ToastProvider } from '@/modules/core/utils/toast'
import { useVerifySession } from '@/modules/auth/features/session/api/use-verify-session'

function App() {
	useVerifySession()

	return (
		<>
			<AppRouter />
			<ToastProvider toastOptions={{ theme: 'dark' }} />
		</>
	)
}

export default App

