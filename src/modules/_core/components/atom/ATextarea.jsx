import { cva } from 'class-variance-authority'
import { cn } from '@/modules/_core/utils/cn'

export const textareaVariants = cva('textarea w-full text-base-content', {
  variants: {
    variant: {
      default: '',
    },
    color: {
      default: '',
      error: 'textarea-error',
    },
    size: {
      default: 'textarea-md',
      md: 'textarea-md',
      lg: 'textarea-md md:textarea-lg',
      xl: 'textarea-lg md:textarea-xl px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    color: 'default',
  },
})

export function ATextarea({
  variant = 'default',
  size = 'md',
  color = 'default',
  className,
  ...props
}) {
  return (
    <textarea
      className={cn(textareaVariants({ variant, color, size, className }))}
      {...props}
    />
  )
}
