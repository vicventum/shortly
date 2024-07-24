import { useEffect, useState } from 'react'

function useFetch(service) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let ignore = false

    fetchData({ signal, ignore })

    async function fetchData({ signal, ignore } = {}) {
      console.log('🟠 fetch', data)
      try {
        setIsLoading(true)
        const data = await service({ signal })
        // console.log('🚀 ~ fetchData ~ data:', data)
        if (ignore) return null
        setData(data)
        setError(null)
      } catch (error) {
        setData(null)
        if (error.name !== 'AbortError') setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    return () => {
      console.log('🔴 clean')
      ignore = true
      controller.abort()
    }
  }, [refresh])

  function handleRefresh() {
    setRefresh(!refresh)
  }

  return { data, isLoading, error, refresh: handleRefresh }
}

export { useFetch }
