import { toastAdapter } from './toast-adapter'

/**
 * Hook that provides a unified toast API
 * Usage:
 *   const toast = useToast()
 *   toast.success('Success!')
 *   toast.error('Error!', { duration: 5000 })
 */
export function useToast() {
	return {
		// Generic toast
		default: (message, options) => toastAdapter.default(message, options),

		// Type-specific toasts
		success: (message, options) => toastAdapter.success(message, options),
		error: (message, options) => toastAdapter.error(message, options),
		warning: (message, options) => toastAdapter.warning(message, options),
		info: (message, options) => toastAdapter.info(message, options),
		loading: (message, options) => toastAdapter.loading(message, options),

		// Promise toast
		promise: (promise, messages, options) =>
			toastAdapter.promise(promise, messages, options),

		// Control methods
		dismiss: (id) => toastAdapter.dismiss(id),
		// update: (id, message, options) => toastAdapter.update(id, message, options),
	}
}
