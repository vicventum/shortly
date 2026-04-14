import { useState, useRef, useCallback, useEffect } from 'react'
import { sileo as toast } from 'sileo'

function useMutation({
  mutationFn,
  onSuccess,
  onError,
  onSettled,
  meta = {},
} = {}) {
  const {
    showErrorToast = true,
    showSuccessToast = false,
    errorMessage,
    successMessage,
  } = meta
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(null)

  // 1. Guardamos los callbacks y la función en refs para evitar problemas
  // de dependencias si el usuario pasa funciones anónimas.
  const callbacksRef = useRef({ onSuccess, onError, onSettled })
  useEffect(() => {
    callbacksRef.current = { onSuccess, onError, onSettled }
  }, [onSuccess, onError, onSettled])

  const mutationFnRef = useRef(mutationFn)
  useEffect(() => {
    mutationFnRef.current = mutationFn
  }, [mutationFn])

  const abortControllerRef = useRef(null)

  // 2. mutateAsync devuelve una promesa (útil si necesitas hacer await en el componente)
  const mutateAsync = useCallback(async variables => {
    // Si el usuario hace doble clic rápido, abortamos la mutación anterior
    // para evitar enviar la petición POST/PUT dos veces al servidor.
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setStatus('pending')
    setError(null)

    let finalData
    let finalError

    try {
      // Pasamos las variables y el signal a tu servicio
      finalData = await mutationFnRef.current({
        variables,
        signal: controller.signal,
      })

      if (abortControllerRef.current === controller) {
        setData(finalData)
        setStatus('success')
        callbacksRef.current.onSuccess?.(finalData, variables)

        if (showSuccessToast) {
          const msg =
            typeof successMessage === 'function'
              ? successMessage(finalData, variables)
              : successMessage || 'Operación realizada con éxito'
          toast.success({ title: msg })
        }
      }

      return finalData
    } catch (err) {
      finalError = err
      if (
        err.name !== 'AbortError' &&
        abortControllerRef.current === controller
      ) {
        setError(err)
        setStatus('error')

        if (
          showErrorToast &&
          (err.name === 'FetchError' || err instanceof Error)
        ) {
          if (err.status !== 401) {
            const msg =
              typeof errorMessage === 'function'
                ? errorMessage(err, variables)
                : errorMessage || err.message || 'Error procesando la solicitud'
            toast.error({ title: msg })
          }
        }

        callbacksRef.current.onError?.(err, variables)
        throw err // Lanzamos el error para que mutateAsync pueda capturarlo con try/catch
      }
    } finally {
      if (abortControllerRef.current === controller) {
        callbacksRef.current.onSettled?.(finalData, finalError, variables)
      }
    }
  }, [])

  // 3. mutate es la versión "fire-and-forget" que no devuelve promesa
  const mutate = useCallback(
    variables => {
      mutateAsync(variables).catch(() => {
        // Silenciamos el error aquí porque ya se maneja en el estado 'error' y en el onError callback.
        // Así evitamos el warning de "Unhandled Promise Rejection" en la consola.
      })
    },
    [mutateAsync]
  )

  // Limpieza al desmontar para no dejar peticiones POST huérfanas
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    mutate,
    mutateAsync,
    data,
    error,
    status,
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}

export { useMutation }
