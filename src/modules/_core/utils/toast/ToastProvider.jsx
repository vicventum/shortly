import { Toaster } from 'sileo'
import { ToastPosition } from './constants'

import { positionMap } from './toast-adapter'

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
