import { AppRouter } from './router/AppRouter'
import { ThemeContextProvider } from '@/modules/core/context/context-theme'
import { UrlContextProvider } from '@/modules/url-shortening/contexts/context-url'
import { AuthContextProvider } from '@/modules/auth/contexts/context-auth'
import { Toaster } from 'react-hot-toast'

function App() {
	return (
		<ThemeContextProvider>
			<AuthContextProvider>
				<UrlContextProvider>
					<AppRouter />
					<Toaster position="bottom-right" />
				</UrlContextProvider>
			</AuthContextProvider>
		</ThemeContextProvider>
	)
}

export default App
