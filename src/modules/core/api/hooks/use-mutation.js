import { useState, useRef, useCallback, useEffect } from 'react'

function useMutation({ mutationFn, onSuccess, onError, onSettled } = {}) {
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
	const mutateAsync = useCallback(async (variables) => {
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
			finalData = await mutationFnRef.current({ variables, signal: controller.signal })

			// Solo actualizamos estado si esta mutación no ha sido abortada por una nueva
			if (abortControllerRef.current === controller) {
				setData(finalData)
				setStatus('success')
				callbacksRef.current.onSuccess?.(finalData, variables)
			}

			return finalData
		} catch (err) {
			finalError = err
			if (err.name !== 'AbortError' && abortControllerRef.current === controller) {
				setError(err)
				setStatus('error')
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
	const mutate = useCallback((variables) => {
		mutateAsync(variables).catch(() => {
			// Silenciamos el error aquí porque ya se maneja en el estado 'error' y en el onError callback.
			// Así evitamos el warning de "Unhandled Promise Rejection" en la consola.
		})
	}, [mutateAsync])

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
