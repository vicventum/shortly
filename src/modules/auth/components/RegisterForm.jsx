import { useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { NavLink } from 'react-router'
import { AInput } from '@/modules/core/components/atom/AInput'
import { AButton } from '@/modules/core/components/atom/AButton'
import { useInput } from '@/modules/core/hooks/use-input'

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isFirstName = useRef(true)
  const isFirstEmail = useRef(true)
  const isFirstPassword = useRef(true)
  const isFirstConfirm = useRef(true)

  const {
    value: name,
    isValid: isNameValid,
    invalidMessage: nameError,
    setValue: setName,
  } = useInput({ onValid: validateName })

  const {
    value: email,
    isValid: isEmailValid,
    invalidMessage: emailError,
    setValue: setEmail,
  } = useInput({ onValid: validateEmail })

  const {
    value: password,
    isValid: isPasswordValid,
    invalidMessage: passwordError,
    setValue: setPassword,
  } = useInput({ onValid: validatePassword })

  const {
    value: confirmPassword,
    isValid: isConfirmValid,
    invalidMessage: confirmError,
    setValue: setConfirmPassword,
  } = useInput({ onValid: validateConfirm })

  function validateName() {
    const validation = { isValid: true, invalidText: '' }
    if (isFirstName.current) {
      isFirstName.current = name === ''
      return validation
    }
    if (!name.trim()) {
      return { isValid: false, invalidText: 'Full Name is required' }
    }
    return validation
  }

  function validateEmail() {
    const validation = { isValid: true, invalidText: '' }
    if (isFirstEmail.current) {
      isFirstEmail.current = email === ''
      return validation
    }
    if (!email.trim()) {
      return { isValid: false, invalidText: 'Email is required' }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, invalidText: 'Please insert a valid email address' }
    }
    return validation
  }

  function validatePassword() {
    const validation = { isValid: true, invalidText: '' }
    if (isFirstPassword.current) {
      isFirstPassword.current = password === ''
      return validation
    }
    if (password.length < 6) {
      return { isValid: false, invalidText: 'Password must be at least 6 characters' }
    }
    return validation
  }

  function validateConfirm() {
    const validation = { isValid: true, invalidText: '' }
    if (isFirstConfirm.current) {
      isFirstConfirm.current = confirmPassword === ''
      return validation
    }
    if (confirmPassword !== password) {
      return { isValid: false, invalidText: 'Passwords do not match' }
    }
    return validation
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // TODO: implement actual signup
    }, 1000)
  }

  const isFormValid =
    isNameValid === true &&
    isEmailValid === true &&
    isPasswordValid === true &&
    isConfirmValid === true

  return (
    <form className='mt-8 flex w-full flex-col gap-6' onSubmit={handleSubmit}>
      <AInput
        placeholder='Full Name'
        value={name}
        onChange={e => setName(e.target.value)}
        color={isNameValid === false ? 'error' : 'default'}
        invalidMessage={nameError}
      />
      
      <AInput
        placeholder='Email Address'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        color={isEmailValid === false ? 'error' : 'default'}
        invalidMessage={emailError}
      />
      
      <AInput
        placeholder='Password'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
        color={isPasswordValid === false ? 'error' : 'default'}
        invalidMessage={passwordError}
        rightSlot={
          <button
            type='button'
            tabIndex={-1}
            className='z-10 flex cursor-pointer items-center justify-center p-1 text-base-300 hover:text-base-400 focus:outline-none'
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} className='size-5' />
          </button>
        }
      />
      
      <AInput
        placeholder='Confirm Password'
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        color={isConfirmValid === false ? 'error' : 'default'}
        invalidMessage={confirmError}
        rightSlot={
          <button
            type='button'
            tabIndex={-1}
            className='z-10 flex cursor-pointer items-center justify-center p-1 text-base-300 hover:text-base-400 focus:outline-none'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon icon={showConfirmPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} className='size-5' />
          </button>
        }
      />

      <AButton
        type='submit'
        color='primary'
        variant='rounded'
        className='mt-2 w-full text-base-100!'
        isLoading={isLoading}
        disabled={!isFormValid || isLoading}
      >
        Sign Up
      </AButton>

      <div className='mt-2 text-center text-sm font-medium text-base-300'>
        Already have an account?{' '}
        <NavLink to='/login' className='font-bold text-primary hover:underline'>
          Login
        </NavLink>
      </div>
    </form>
  )
}
