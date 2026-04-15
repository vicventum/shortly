import { Toaster } from 'sileo'
import { ToastPosition } from './constants'

// Map abstract positions to react-hot-toast positions
const positionMap = {
	[ToastPosition.TOP_LEFT]: 'top-left',
	[ToastPosition.TOP_CENTER]: 'top-center',
	[ToastPosition.TOP_RIGHT]: 'top-right',
	[ToastPosition.BOTTOM_LEFT]: 'bottom-left',
	[ToastPosition.BOTTOM_CENTER]: 'bottom-center',
	[ToastPosition.BOTTOM_RIGHT]: 'bottom-right',
}

export function ToastProvider({
	children,
	position = ToastPosition.TOP_CENTER,
	duration = 4000,
	toastOptions,
}) {
	return (
		<Toaster
			position={positionMap[position] || 'top-center'}
			duration={duration}
			toastOptions={toastOptions}
		>
			{children}
		</Toaster>
	)
}
