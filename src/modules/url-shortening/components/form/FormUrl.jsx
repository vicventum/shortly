import { URL_REGEX } from '@/modules/core/constants'
import { AButton } from '@/modules/core/components/atom/AButton'
import { AInput } from '@/modules/core/components/atom/AInput'
import { useForm } from '@/modules/core/hooks/use-form'

export function FormUrl({ isLoading, onSubmitUrl }) {
  const { submit, getFieldProps } = useForm({
    initialValues: {
      url: '',
    },
    validators: {
      url: (value) => {
        if (!value || value.trim() === '') return 'Please add a link'
        if (!URL_REGEX.test(value.trim())) return 'Please insert a valid link'
        return null
      },
    },
  })

  function handleSubmit(formData) {
    onSubmitUrl({ value: formData.url.trim() })
  }

  return (
    <>
      <div className='rounded-xl bg-secondary bg-shorten-pattern-mobile bg-cover px-6 py-7 md:bg-shorten-pattern-desktop md:px-16 md:py-12'>
        <form
          className='form flex flex-col gap-x-6 gap-y-10 md:flex-row'
          onSubmit={submit(handleSubmit)}
        >
          <AInput
            {...getFieldProps('url')}
            className=''
            placeholder='Shorten a link here...'
            size='xl'
            title='Insert a valid URL here'
            type='url'
          />

          <AButton
            type='submit'
            size='xl'
            isLoading={isLoading}
            disabled={isLoading}
          >
            Shorten it!
          </AButton>
        </form>
      </div>
    </>
  )
}
