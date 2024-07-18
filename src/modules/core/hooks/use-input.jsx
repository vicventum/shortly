import { useState, useEffect } from 'react'

export function useInput({ onValid }) {
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    const isValid = onValid()
    setIsValid(isValid)
  }, [value])

  return { value, isValid, setValue }
}
