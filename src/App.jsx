import { AppRouter } from './router/AppRouter'
import { ThemeContextProvider } from '@/modules/core/context/context-theme'
import { UrlContextProvider } from '@/modules/url-shortening/contexts/context-url'

function App() {
	return (
		<ThemeContextProvider>
			<UrlContextProvider>
				<AppRouter />
			</UrlContextProvider>
		</ThemeContextProvider>
	)
}

export default App
