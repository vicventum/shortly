import { AppRouter } from './router/AppRouter'
import { ToastProvider } from '@/modules/core/utils/toast'
import { AuthInitializer } from '@/modules/auth/components/AuthInitializer'

function App() {
	return (
		<>
			<AuthInitializer />
			<AppRouter />
			<ToastProvider toastOptions={{ theme: 'dark' }} />
		</>
	)
}

export default App
