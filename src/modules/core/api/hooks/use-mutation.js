import { useState, useRef, useCallback } from 'react'

function useMutation({ mutationFn }) {
	const abortRef = useRef(null)

	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [status, setStatus] = useState('idle')

	const mutateAsync = useCallback(async (variables) => {
		abortRef.current?.abort()

		const controller = new AbortController()
		abortRef.current = controller

		try {
			setStatus('loading')

			const result = await mutationFn({
				signal: controller.signal,
				payload: variables,
			})

			setData(result)
			setError(null)
			setStatus('success')

			return result
		} catch (err) {
			if (err.name === 'AbortError') return

			setError(err)
			setStatus('error')
			throw err
		}
	}, [mutationFn])

	return {
		data,
		error,
		status,
		isPending: status === 'loading',
		isError: status === 'error',
		isSuccess: status === 'success',
		mutateAsync,
	}
}

export { useMutation }
