export function validateName(value) {
	if (!value.trim()) {
		return 'Full Name is required'
	}
	return null
}

export function validateEmail(value) {
	if (!value.trim()) {
		return 'Email is required'
	}

	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!regex.test(value)) {
		return 'Invalid email address'
	}

	return null
}

export function validatePassword(value) {
	if (value.length < 6) {
		return 'Min 6 characters'
	}
	return null
}

export function validateConfirmPassword(value, password) {
	if (value !== password) {
		return 'Passwords do not match'
	}
	return null
}

export function validateRole(value) {
	if (!value) {
		return 'Role is required'
	}
	if (!['admin', 'editor', 'user'].includes(value)) {
		return 'Invalid role'
	}
	return null
}

export const validateRegister = {
	name: validateName,
	email: validateEmail,
	password: validatePassword,
	confirmPassword: validateConfirmPassword,
	role: validateRole,
}
