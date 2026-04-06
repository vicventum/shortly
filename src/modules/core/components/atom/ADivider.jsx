import { cva } from 'class-variance-authority'
import { cn } from '@/modules/core/utils/cn'

export const dividerVariants = cva(
  'divider my-0 h-auto',
  {
    variants: {
      color: {
        default: 'before:bg-base-200 after:bg-base-200',
        'base-200': 'before:bg-base-200 after:bg-base-200',
        'base-300': 'before:bg-base-300 after:bg-base-300',
        'base-400': 'before:bg-base-400 after:bg-base-400',
      },
      size: {
        default: 'before:h-[0.125rem] after:h-[0.125rem]',
        sm: 'before:h-[0.0625rem] after:h-[0.0625rem]',
      },
      orientation: {
        vertical: 'divider-horizontal',
        horizontal: 'divider-vertical',
      },
    },
    defaultVariants: {
      color: 'default',
      size: 'default',
      orientation: 'horizontal',
    },
  }
)

export function ADivider({
  color = 'default',
  size = 'default',
  orientation = 'horizontal',
  className,
  children,
  ...props
}) {
  return (
    <>
      <div
        className={cn(dividerVariants({ color, size, orientation, className }))}
        {...props}
      >
        {children}
      </div>
    </>
  )
}
