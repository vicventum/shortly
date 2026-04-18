import { cva } from 'class-variance-authority'
import { cn } from '@/modules/core/utils/cn'

const tooltipVariants = cva('tooltip', {
  variants: {
    color: {
      primary: 'tooltip-primary',
      secondary: 'tooltip-secondary',
      accent: 'tooltip-accent',
      info: 'tooltip-info',
      success: 'tooltip-success',
      warning: 'tooltip-warning',
      error: 'tooltip-error',
    },
    position: {
      top: 'tooltip-top',
      bottom: 'tooltip-bottom',
      left: 'tooltip-left',
      right: 'tooltip-right',
    },
  },
  defaultVariants: {
    position: 'top',
  },
})

/**
 * ATooltip Component
 * 
 * @param {string} text - The text to display inside the tooltip (data-tip)
 * @param {string} color - DaisyUI tooltip color (primary, secondary, etc.)
 * @param {string} position - Tooltip position (top, bottom, left, right)
 * @param {boolean} isOpen - Force tooltip to be open (tooltip-open class)
 */
export function ATooltip({
  text,
  color,
  position,
  isOpen = false,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        tooltipVariants({ color, position }),
        { 'tooltip-open': isOpen },
        className
      )}
      data-tip={text}
    >
      {children}
    </div>
  )
}
