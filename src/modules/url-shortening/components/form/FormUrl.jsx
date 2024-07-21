import { useRef } from 'react'
import { URL_REGEX } from '@/modules/core/constants'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { BaseInput } from '@/modules/core/components/base/BaseInput'
import { useInput } from '@/modules/core/hooks/use-input'

export function FormUrl({ isLoading, onSubmitUrl }) {
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
    // const urlRegex = new RegExp(URL_REGEX)

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

  function handleSubmit(e) {
    e.preventDefault()
    onSubmitUrl({ value })
  }

  return (
    <>
      <div className='bg-shorten-pattern-mobile md:bg-shorten-pattern-desktop rounded-lg bg-secondary bg-cover px-6 py-7 md:px-16 md:py-12'>
        <form
          className='form flex flex-col gap-x-6 gap-y-10 md:flex-row'
          onSubmit={handleSubmit}
        >
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

          <BaseButton
            type='submit'
            size='xl'
            isLoading={isLoading}
            disabled={isLoading || !isValid}
          >
            {/* disabled */}
            Shorten it!
          </BaseButton>
        </form>
      </div>
    </>
  )
}
