import { LayoutHeader } from '@/modules/core/components/layout/LayoutHeader'
import { HomePage } from '@/pages/HomePage'
import { LayoutFooter } from '@/modules/core/components/layout/LayoutFooter'
import { UrlContextProvider } from './modules/url-shortening/contexts/context-url'

function App() {
  return (
    <UrlContextProvider>
      <LayoutHeader />

      <HomePage />

      <LayoutFooter />
    </UrlContextProvider>
  )
}

export default App
