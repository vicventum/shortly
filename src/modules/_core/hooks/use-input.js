import { useState } from 'react'

export function useInput({ initialValue = '', validator }) {
	const [value, setValue] = useState(initialValue)
	const [isTouched, setIsTouched] = useState(false)

	// La validación se calcula de forma síncrona.
	// Devuelve un string con el error o 'null' si es válido.
	const errorMessage = validator ? validator(value) : null
	const isValid = errorMessage === null

	// Solo mostramos el error si el usuario ya interactuó con el input
	const showError = isTouched && !isValid

	const onChange = (e) => {
		setValue(e.target.value)
	}

	const onBlur = () => {
		setIsTouched(true)
	}

	// Método útil para forzar la validación (ej. al hacer submit)
	const touch = () => setIsTouched(true)

	return {
		value,
		setValue,
		onChange,
		onBlur,
		isValid,
		showError,
		errorMessage: showError ? errorMessage : '',
		touch
	}
}
