import { LayoutHeader } from '@/modules/core/components/layout/LayoutHeader'
import { HomePage } from '@/pages/HomePage'
import { LayoutFooter } from '@/modules/core/components/layout/LayoutFooter'

function App() {
  return (
    <>
      <LayoutHeader />

      <HomePage />

      <LayoutFooter />
    </>
  )
}

export default App
