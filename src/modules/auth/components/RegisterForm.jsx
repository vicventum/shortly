import { useState } from 'react'
import { NavLink } from 'react-router'

import { AButton } from '@/modules/core/components/atom/AButton'
import { useInput } from '@/modules/core/hooks/use-input'
import { validateRegister } from '@/modules/auth/validators/FormRegister.validator'
import { FieldsRegister } from './fields/FieldsRegister'

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)

  // Instanciamos los hooks pasando la regla correspondiente
  const name = useInput({ validator: validateRegister.name })
  const email = useInput({ validator: validateRegister.email })
  const password = useInput({ validator: validateRegister.password })

  // Para la confirmación, evaluamos dinámicamente contra el valor actual del password
  const confirm = useInput({
    validator: val => validateRegister.confirmPassword(val, password.value),
  })

  const isFormValid =
    name.isValid && email.isValid && password.isValid && confirm.isValid

  function handleSubmit(e) {
    e.preventDefault()

    // Si el formulario es inválido, forzamos el "touch" en todos los campos
    // para que la UI de los componentes atómicos reaccione y muestre los errores.
    if (!isFormValid) {
      name.touch()
      email.touch()
      password.touch()
      confirm.touch()
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // TODO: implement actual signup
    }, 1000)
  }

  return (
    <form className='mt-8 flex w-full flex-col gap-6' onSubmit={handleSubmit}>
      <FieldsRegister
        name={name}
        email={email}
        password={password}
        confirm={confirm}
      />

      <AButton
        type='submit'
        color='primary'
        variant='rounded'
        className='mt-2 w-full text-base-100!'
        isLoading={isLoading}
        // Recomendación: Evita deshabilitar el botón de submit si el form es inválido.
        // Es mejor permitir el click y que el usuario vea exactamente qué campos faltan
        // por medio de los tooltips/colores disparados por el método touch() en el handleSubmit.
        disabled={isLoading}
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
