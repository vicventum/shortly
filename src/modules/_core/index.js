// Public API: core module
// This module is the global shared layer — consumed by ALL other modules.

// Layouts (consumed by AppRouter)
export { PublicLayout } from './layouts/PublicLayout'

// Pages (consumed by AppRouter)
export { AdminPage } from './pages/AdminPage'
export { EditorPage } from './pages/EditorPage'
export { UnauthorizedPage } from './pages/UnauthorizedPage'

// Atoms
export { AAvatar } from './components/atom/AAvatar'
export { ABadge } from './components/atom/ABadge'
export { AButton } from './components/atom/AButton'
export { ACard } from './components/atom/ACard'
export { ADivider } from './components/atom/ADivider'
export { AFormField } from './components/atom/AFormField'
export { AInput } from './components/atom/AInput'
export { ALogo } from './components/atom/ALogo'
export { ASelect } from './components/atom/ASelect'
export { ATextarea } from './components/atom/ATextarea'
export { ATooltip } from './components/atom/ATooltip'

// Base
export { BModal } from './components/base/BModal'

// Composite
export { CModalDanger } from './components/composite/CModalDanger'

// Design
export { DThemeSwitch } from './components/design/DThemeSwitch'
export { DTimelineGroup } from './components/design/DTimelineGroup'

// Layout components
export { LHeader } from './components/layout/LHeader'
export { LFooter } from './components/layout/LFooter'
export { LMainSection } from './components/layout/LMainSection'

// Hooks
export { useForm } from './hooks/use-form'
export { useInput } from './hooks/use-input'
export { useLocalStorage } from './hooks/use-local-storage'
export { useTheme } from './hooks/use-theme'

// API clients (cross-module HTTP infrastructure)
export { clientFetch } from './api/clients/client-fetch'

// Utils
export { cn } from './utils/cn'

// Toast
export { useToast } from './utils/toast/use-toast'
export { ToastProvider } from './utils/toast/ToastProvider'

// Context
export { ThemeContext, ThemeContextProvider } from './context/context-theme'
