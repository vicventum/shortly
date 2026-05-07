import { cva } from 'class-variance-authority'
import { cn } from '@/modules/core/utils/cn'

export const inputVariants = cva('input flex w-full text-base-400', {
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
})

export function AInput({
  variant = 'default',
  size = 'md',
  type = 'text',
  color = 'default',
  placeholder,
  className,
  leftSlot,
  rightSlot,
  ...props
}) {
  return (
    <label
      className={cn(
        inputVariants({ variant, color, size, className }),
        'flex items-center gap-2'
      )}
    >
      {leftSlot && leftSlot}
      <input
        className='grow border-none bg-transparent outline-none focus:ring-0 focus:outline-none'
        type={type}
        placeholder={placeholder}
        {...props}
      />
      {rightSlot && rightSlot}
    </label>
  )
}
