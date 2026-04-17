import { cva } from 'class-variance-authority'
import { cn } from '@/modules/core/utils/cn'

export const badgeVariants = cva('badge font-semibold', {
  variants: {
    color: {
      primary: 'badge-primary',
      secondary: 'badge-secondary',
      accent: 'badge-accent',
      success: 'badge-success',
      warning: 'badge-warning',
      info: 'badge-info',
      error: 'badge-error',
      ghost: 'badge-ghost',
      default: '',
    },
    size: {
      sm: 'badge-sm',
      md: 'badge-md',
      lg: 'badge-lg',
    },
    variant: {
      default: '',
      outline: `badge-outline`,
      dash: `badge-dash`,
      ghost: 'badge-ghost',
      soft: `badge-soft`,
    },
  },
  defaultVariants: {
    color: 'default',
    variant: 'soft',
    size: 'md',
  },
})

export function ABadge({
  color = 'default',
  size = 'md',
  variant = 'soft',
  className,
  children,
  ...props
}) {
  return (
    <div className={cn(badgeVariants({ color, size, variant, className }))} {...props}>
      {children}
    </div>
  )
}
