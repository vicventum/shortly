import { cva } from 'class-variance-authority'
import { cn } from '@/modules/core/utils/cn'

export const cardVariants = cva(
  'rounded-xl bg-base-100 p-6 shadow-sm',
  {
    variants: {},
    defaultVariants: {},
  }
)

export function ACard({ children, className, ...props }) {
  return (
    <>
      <article
        className={cn(cardVariants({ className }))}
        {...props}
      >
        {children}
      </article>
    </>
  )
}
