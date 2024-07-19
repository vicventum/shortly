import { useRef } from 'react'
import { URL_REGEX } from '@/modules/core/constants'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { BaseInput } from '@/modules/core/components/base/BaseInput'
import { useInput } from '@/modules/core/hooks/use-input'

export function FormUrl() {
  const { value, isValid, invalidMessage, setValue } = useInput({
    onValid: handleValidation,
  })

  const isFirstInput = useRef(true)

  function handleValidation() {
    const validation = {
      isValid: true,
      invalidText: '',
    }

    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return validation
    }

    if (value === '') {
      validation.isValid = false
      validation.invalidText = 'Please add a link'

      return validation
    }

    if (!URL_REGEX.test(value)) {
      validation.isValid = false
      validation.invalidText = 'Please insert a valid link'
    }

    return validation
  }

  function handleInput(e) {
    const value = e.target.value
    setValue(value.trim())
  }

  return (
    <>
      <div className='rounded-lg bg-secondary bg-shorten-pattern bg-cover px-16 py-12'>
        <form className='form flex gap-x-6'>
          <BaseInput
            className=''
            value={value}
            pattern={URL_REGEX}
            color={!isValid && 'error'}
            invalidMessage={invalidMessage}
            placeholder='Shorten a link here...'
            size='lg'
            title='Insert a valid URL here'
            type='url'
            required
            onChange={handleInput}
          />

          <BaseButton size='xl' type='submit'>
            Shorten it!
          </BaseButton>
        </form>
      </div>
    </>
  )
}
