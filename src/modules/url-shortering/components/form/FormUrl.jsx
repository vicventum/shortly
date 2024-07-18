import { URL_REGEX } from '@/modules/core/constants'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { BaseInput } from '@/modules/core/components/base/BaseInput'
import { useInput } from '@/modules/core/hooks/use-input'

export function FormUrl() {
  const { value, isValid, setValue } = useInput({ onValid: handleValidation })

  function handleValidation() {
    if (value === '') return true
    return URL_REGEX.test(value)
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
