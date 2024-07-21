import { cn } from '@/modules/core/utils/cn'

export function BaseDivider({ className, children, ...props }) {
  return (
    <>
      <div
        className={cn(
          'divider my-0 h-auto before:bg-base-200 after:bg-base-200',
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
