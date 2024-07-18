import { useState, useEffect } from 'react'

export function useInput({ onValid }) {
  const [value, setValue] = useState('')
  const [invalidMessage, setInvalidMessage] = useState('')
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    const { isValid, invalidText } = onValid()
    setIsValid(isValid)
    setInvalidMessage(invalidText)
  }, [value])

  return { value, isValid, invalidMessage, setValue }
}
