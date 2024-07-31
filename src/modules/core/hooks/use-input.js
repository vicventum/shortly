import { useState, useEffect } from 'react'

export function useInput({ onValid }) {
  const [value, setValue] = useState('')
  const [invalidMessage, setInvalidMessage] = useState('')
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    if (!onValid) return undefined
    const { isValid, invalidText } = onValid()
    setIsValid(isValid)
    setInvalidMessage(invalidText)
  }, [value])

  return { value, isValid, invalidMessage, setValue }
}
