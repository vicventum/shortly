import { cva } from 'class-variance-authority'
import { cn } from '@/modules/_core/utils/cn'

export const selectVariants = cva('select w-full text-base-content', {
  variants: {
    variant: {
      default: '',
    },
    color: {
      default: '',
      error: 'select-error',
    },
    size: {
      default: 'select-md',
      md: 'select-md',
      lg: 'select-md md:select-lg',
      xl: 'select-lg md:select-xl px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    color: 'default',
  },
})

export function ASelect({
  variant = 'default',
  size = 'md',
  color = 'default',
  className,
  items = [],
  children,
  ...props
}) {
  return (
    <select
      className={cn(selectVariants({ variant, color, size, className }))}
      {...props}
    >
      {items.length > 0
        ? items.map((item, idx) => (
            <option key={item.value ?? idx} value={item.value}>
              {item.label}
            </option>
          ))
        : children}
    </select>
  )
}
