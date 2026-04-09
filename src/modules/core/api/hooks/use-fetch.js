import { useState, useEffect, useRef, useCallback } from 'react'

function useFetch({ queryKey, queryFn, enabled = true }) {
	const abortRef = useRef(null)
	const queryFnRef = useRef(queryFn)

	queryFnRef.current = queryFn
	const queryKeyString = JSON.stringify(queryKey)

	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [status, setStatus] = useState(enabled ? 'loading' : 'idle')

	const execute = useCallback(async () => {
		if (!enabled) return

		abortRef.current?.abort()

		const controller = new AbortController()
		abortRef.current = controller

		try {
			setStatus('loading')

			const result = await queryFnRef.current({
				signal: controller.signal,
			})

			setData(result)
			setError(null)
			setStatus('success')
		} catch (err) {
			if (err.name === 'AbortError') return

			setError(err)
			setStatus('error')
		}
	}, [enabled, queryKeyString])

	useEffect(() => {
		execute()

		return () => {
			abortRef.current?.abort()
		}
	}, [execute])

	const refetch = useCallback(() => {
		execute()
	}, [execute])

	return {
		data,
		error,
		status,
		isLoading: status === 'loading',
		isError: status === 'error',
		isSuccess: status === 'success',
		refetch,
	}
}

export { useFetch }
