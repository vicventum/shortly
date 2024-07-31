import { LayoutHeader } from '@/modules/core/components/layout/LayoutHeader'
import { HomePage } from '@/pages/HomePage'
import { LayoutFooter } from '@/modules/core/components/layout/LayoutFooter'
import { ThemeContextProvider } from '@/modules/core/context/context-theme'
import { UrlContextProvider } from '@/modules/url-shortening/contexts/context-url'

function App() {
  return (
    <ThemeContextProvider>
      <UrlContextProvider>
        <LayoutHeader />
        <HomePage />
        <LayoutFooter />
      </UrlContextProvider>
    </ThemeContextProvider>
  )
}

export default App
