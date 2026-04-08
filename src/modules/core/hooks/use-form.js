import { useState } from 'react'

export function useForm({ initialValues, validators }) {
	const [formData, setFormData] = useState(initialValues)

	// Inicializamos todos los campos como "no tocados" (false)
	const [touched, setTouched] = useState(() =>
		Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: false }), {})
	)

	// Calculamos los errores de forma síncrona en cada render
	const errors = {}
	let isFormValid = true

	Object.keys(initialValues).forEach((key) => {
		const validator = validators[key]
		// Pasamos el valor actual y TODO el formData (súper útil para confirmPassword)
		const error = validator ? validator(formData[key], formData) : null
		errors[key] = error

		if (error !== null) {
			isFormValid = false
		}
	})

	// Función similar al register de react-hook-form
	const getFieldProps = (name) => {
		const showError = touched[name] && errors[name] !== null

		return {
			name,
			value: formData[name],
			onChange: (e) => setFormData((prev) => ({ ...prev, [name]: e.target.value })),
			onBlur: () => setTouched((prev) => ({ ...prev, [name]: true })),

			// Props inyectadas directamente para tu componente AInput
			color: showError ? 'error' : 'default',
			invalidMessage: showError ? errors[name] : '',
		}
	}

	// Wrapper para el submit que previene el default y valida
	const submit = (onSubmitFn) => (e) => {
		if (e) e.preventDefault()

		if (!isFormValid) {
			// Si es inválido, forzamos el "touch" en todos los campos para mostrar errores
			const allTouched = Object.keys(formData).reduce(
				(acc, key) => ({ ...acc, [key]: true }),
				{}
			)
			setTouched(allTouched)
			return
		}

		// Si todo está bien, ejecutamos el callback pasándole el formData limpio
		onSubmitFn(formData)
	}

	return {
		formData,
		getFieldProps,
		submit,
		isFormValid,
	}
}
