import { cn } from '@/modules/core/utils/cn'

export function BaseButton({
  color = 'default',
  variant = 'default',
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

  const classDefaultColors = classColors.primary
  const classDefaultVariants = ''
  const classDefaultButton = 'btn h-10 min-h-10 px-6'
  const classDefaultLink = `${classDefaultButton} ${classVariants.link}`

  return (
    <>
      {href ? (
        <a href={href} className={cn(classDefaultLink, className)}>
          {children}
        </a>
      ) : (
        <button
          className={cn(
            classDefaultButton,
            [
              className,
              classVariants[variant] ?? classDefaultVariants,
              href || variant === 'link'
                ? ''
                : classColors[color] ?? classDefaultColors,
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
