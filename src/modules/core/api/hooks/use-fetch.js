// use-fetch.js
import { useEffect, useState, useRef, useCallback } from 'react'
import { sileo as toast } from 'sileo'

const queryCache = new Map()

function useFetch({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 0,
  meta = {},
}) {
  const { showErrorToast = true, errorMessage } = meta
  const queryHash = JSON.stringify(queryKey)
  const queryFnRef = useRef(queryFn)

  // 1. Ref para el control absoluto de carreras (Race Conditions)
  const abortControllerRef = useRef(null)

  // 2. Ref para rastrear si la key cambió entre renders
  const prevQueryHashRef = useRef(queryHash)

  useEffect(() => {
    queryFnRef.current = queryFn
  }, [queryFn])

  const [state, setState] = useState(() => {
    const cached = queryCache.get(queryHash)
    if (cached && Date.now() - cached.timestamp < staleTime) {
      return { data: cached.data, error: null, status: 'success' }
    }
    return { data: undefined, error: null, status: 'pending' }
  })

  const [isFetching, setIsFetching] = useState(false)

  // 3. RESET SÍNCRONO: Si la key cambia, reseteamos el estado antes de que React pinte
  if (prevQueryHashRef.current !== queryHash) {
    prevQueryHashRef.current = queryHash
    const cached = queryCache.get(queryHash)

    if (cached && Date.now() - cached.timestamp < staleTime) {
      setState({ data: cached.data, error: null, status: 'success' })
    } else {
      // Limpiamos la data anterior para evitar mostrar datos de otra queryKey
      setState({ data: undefined, error: null, status: 'pending' })
    }
  }

  const executeFetch = useCallback(async () => {
    // CONTROL DE CARRERAS: Si hay una petición en curso, la matamos sin piedad
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Creamos un nuevo controlador para esta petición específica
    const controller = new AbortController()
    abortControllerRef.current = controller

    setIsFetching(true)

    try {
      const result = await queryFnRef.current({ signal: controller.signal })

      setState({ data: result, error: null, status: 'success' })
      queryCache.set(queryHash, { data: result, timestamp: Date.now() })

      return result
    } catch (err) {
      // Si el error es porque nosotros abortamos la petición, lo ignoramos silenciosamente
      if (err.name !== 'AbortError') {
        setState({ data: undefined, error: err, status: 'error' })

        if (
          showErrorToast &&
          (err.name === 'FetchError' || err instanceof Error)
        ) {
          if (err.status !== 401) {
            const msg =
              typeof errorMessage === 'function'
                ? errorMessage(err, queryKey)
                : errorMessage || err.message || 'Error al obtener los datos'
            toast.error({ title: msg })
          }
        }
      }
    } finally {
      // Solo apagamos el loading si esta petición sigue siendo la actual
      // (evita que una petición abortada apague el isFetching de una nueva petición)
      if (abortControllerRef.current === controller) {
        setIsFetching(false)
      }
    }
  }, [queryHash])

  useEffect(() => {
    if (!enabled) return

    const cached = queryCache.get(queryHash)
    const isStale = !cached || Date.now() - cached.timestamp >= staleTime

    if (isStale) {
      executeFetch()
    }

    // Limpieza al desmontar o cambiar dependencias
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [queryHash, enabled, staleTime, executeFetch])

  const refetch = useCallback(() => {
    // Al llamar a refetch manualmente, executeFetch se encarga de cancelar las anteriores
    return executeFetch()
  }, [executeFetch])

  const isLoading = state.status === 'pending' && isFetching

  return {
    data: state.data,
    error: state.error,
    status: state.status,
    isLoading,
    isFetching,
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    refetch,
  }
}

export { useFetch }
