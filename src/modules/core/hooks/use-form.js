import { useState } from 'react'

export function useForm({ initialValues, validators = {} }) {
	const [formData, setFormData] = useState(initialValues)
	const [touched, setTouched] = useState({})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleBlur = (e) => {
		const { name } = e.target
		setTouched((prev) => ({ ...prev, [name]: true }))
	}

	const touchAll = () => {
		const allTouched = {}
		Object.keys(formData).forEach((key) => {
			allTouched[key] = true
		})
		setTouched(allTouched)
	}

	const errors = {}
	Object.keys(validators).forEach((key) => {
		const validatorFn = validators[key]
		if (validatorFn) {
			errors[key] = validatorFn(formData[key], formData)
		} else {
			errors[key] = null
		}
	})

	const isFormValid = Object.keys(validators).every((key) => errors[key] === null)

	const getFieldProps = (name) => {
		const errorMessage = errors[name] || null
		const isValid = errorMessage === null
		const isTouched = touched[name] || false
		const showError = isTouched && !isValid

		return {
			name,
			value: formData[name],
			onChange: handleChange,
			onBlur: handleBlur,
			color: showError ? 'error' : 'default',
			invalidMessage: showError ? errorMessage : ''
		}
	}

	return {
		formData,
		setFormData,
		touched,
		errors,
		isFormValid,
		handleChange,
		handleBlur,
		touchAll,
		getFieldProps
	}
}
