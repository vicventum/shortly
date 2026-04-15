// import toast from 'react-hot-toast'
import { sileo as toast } from 'sileo'
import { ToastType, ToastPosition } from './constants'

// Map abstract positions to react-hot-toast positions
const positionMap = {
	[ToastPosition.TOP_LEFT]: 'top-left',
	[ToastPosition.TOP_CENTER]: 'top-center',
	[ToastPosition.TOP_RIGHT]: 'top-right',
	[ToastPosition.BOTTOM_LEFT]: 'bottom-left',
	[ToastPosition.BOTTOM_CENTER]: 'bottom-center',
	[ToastPosition.BOTTOM_RIGHT]: 'bottom-right',
}

// Convert abstract options to react-hot-toast options
function mapOptions(options = {}) {
	const mapped = {}

	if (options.duration !== undefined) {
		mapped.duration = options.duration
	}

	if (options.position) {
		mapped.position = positionMap[options.position] || 'top-right'
	}

	if (options.id) {
		mapped.id = options.id
	}

	if (options.onClose) {
		mapped.onClose = options.onClose
	}

	if (options.onAutoClose) {
		mapped.onAutoClose = options.onAutoClose
	}

	return mapped
}

// Adapter functions - these are the only functions that know about react-hot-toast
export const toastAdapter = {
	success(message, options) {
		return toast.success({ title: message, ...mapOptions(options) })
	},

	error(message, options) {
		return toast.error({ title: message, ...mapOptions(options) })
	},

	warning(message, options) {
		// react-hot-toast doesn't have a built-in warning, we'll use a custom toast
		return toast({ title: message, ...mapOptions(options) })
	},

	info(message, options) {
		// react-hot-toast doesn't have a built-in info, we'll use a custom toast
		return toast({ title: message, ...mapOptions(options) })
	},

	loading(message, options) {
		return toast.loading({ title: message, ...mapOptions(options) })
	},

	promise(promise, messages, options) {
		return toast.promise(promise, { title: messages, ...mapOptions(options) })
	},

	dismiss(id) {
		toast.dismiss(id)
	},

	// update(id, message, options) {
	// 	// react-hot-toast doesn't have a direct update, we dismiss and show new
	// 	toast.dismiss(id)
	// 	return toast(message, { id, ...mapOptions(options) })
	// },

	default(message, options) {
		return toast.show({ title: message, ...mapOptions(options) })
	},
}
