import { cn } from '@/modules/core/utils/cn'

export function BaseButton({
  color = 'default',
  variant = 'default',
  size = 'default',
  href = '',
  className,
  children,
  ...props
}) {
  const classColors = {
    primary: 'btn-primary hover:bg-primary/70 hover:border-primary/10',
    secondary: 'btn-secondary hover:bg-secondary/70 hover:border-secondary/10',
    accent: 'btn-accent hover:bg-accent/70 hover:border-accent/10',
    info: 'btn-info hover:bg-info/70 hover:border-info/10',
    success: 'btn-success hover:bg-success/70 hover:border-success/10',
    warning: 'btn-warning hover:bg-warning/70 hover:border-warning/10',
    error: 'btn-error hover:bg-error/70 hover:border-error/10',
  }
  const classVariants = {
    rounded: 'rounded-full',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    link: 'btn-link link',
    square: 'btn-square',
    circle: 'btn-circle',
  }
  const classSize = {
    default: 'h-10 min-h-10 px-6 text-base',
    lg: 'h-14 min-h-14 px-9 text-button',
    // sm: 'h-9 rounded-md px-3',
    // icon: 'h-10 w-10',
  }

  const classDefaultColors = classColors.primary
  const classDefaultVariants = ''
  const classDefaultSize = classSize.default
  const classDefaultButton = 'btn capitalize'
  const classDefaultLink = `${classDefaultButton} ${classVariants.link}`

  return (
    <>
      {href ? (
        <a
          href={href}
          className={cn(classDefaultLink, classDefaultSize[size], className)}
        >
          {children}
        </a>
      ) : (
        <button
          className={cn(
            classDefaultButton,
            [
              classVariants[variant] ?? classDefaultVariants,
              href || variant === 'link'
                ? ''
                : classColors[color] ?? classDefaultColors,
              classSize[size] ?? classDefaultSize,
              className,
            ]
            // { 'text-base-100': variant !== 'link' }
          )}
        >
          {children}
        </button>
      )}
    </>
  )
}
