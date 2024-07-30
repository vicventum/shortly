import { useContext } from 'react'

export function useContextCheck(contextToCheck, hookName) {
  const context = useContext(contextToCheck)
  if (!context)
    throw new Error(`❌ ${hookName} must be used within a context provider`)

  return context
}
