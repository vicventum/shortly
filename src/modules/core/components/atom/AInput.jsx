import { cva } from 'class-variance-authority'
import { cn } from '@/modules/core/utils/cn'

export const inputVariants = cva(
  'input flex w-full text-base-400',
  {
    variants: {
      variant: {
        default: '',
      },
      color: {
        default: '',
        error: 'input-error',
      },
      size: {
        default: 'input-md',
        md: 'input-md',
        lg: 'input-md md:input-lg',
        xl: 'input-lg md:input-xl px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'default',
    },
  }
)

export function AInput({
  variant = 'default',
  size = 'md',
  type = 'text',
  invalidMessage,
  color = 'default',
  placeholder,
  className,
  ...props
}) {
  return (
    <>
      <label className='relative flex w-full flex-col'>
        <input
          className={cn(inputVariants({ variant, color, size, className }))}
          type={type}
          placeholder={placeholder}
          {...props}
        />

        {invalidMessage && (
          <span className='absolute -bottom-8 left-0 text-sm text-error italic'>
            {invalidMessage}
          </span>
        )}
      </label>
    </>
  )
}
