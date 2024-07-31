import { useContextCheck } from './use-context-check'
import { ThemeContext } from '@/modules/core/context/context-theme'

export function useTheme() {
  const context = useContextCheck(ThemeContext, 'useTheme')

  return context
}
