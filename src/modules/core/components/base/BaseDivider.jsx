import { cn } from '@/modules/core/utils/cn'

export function BaseDivider({
  color = 'default',
  size = 'default',
  orientation = 'horizontal',
  className,
  children,
  ...props
}) {
  const classOrientation = {
    vertical: 'divider-horizontal',
    horizontal: 'divider-vertical',
  }
  const classColor = {
    default: 'before:bg-base-200 after:bg-base-200',
    'base-200': 'before:bg-base-200 after:bg-base-200',
    'base-300': 'before:bg-base-300 after:bg-base-300',
    'base-400': 'before:bg-base-400 after:bg-base-400',
  }
  const classSize = {
    default: 'before:h-[0.125rem] after:h-[0.125rem]',
    sm: 'before:h-[0.0625rem] after:h-[0.0625rem]',
  }

  return (
    <>
      <div
        className={cn(
          'divider my-0 h-auto',
          classColor[color],
          classSize[size],
          classOrientation[orientation],
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
