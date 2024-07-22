import { cn } from '@/modules/core/utils/cn'

export function BaseCard({ children, className, ...props }) {
  return (
    <>
      <article
        className={cn('rounded-xl bg-base-100 p-6 shadow-sm', className)}
      >
        {children}
      </article>
    </>
  )
}
