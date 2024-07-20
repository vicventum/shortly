import { cn } from '@/modules/core/utils/cn'

export function BaseButton({
  color = 'default',
  variant = 'default',
  size = 'default',
  href = '',
  isLoading,
  disabled,
  className,
  children,
  ...props
}) {
  const classVariants = {
    rounded: 'rounded-full',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    link: 'btn-link link',
    square: 'btn-square',
    circle: 'btn-circle',
  }
  const classColors = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
  }
  const classSize = {
    default: 'h-10 min-h-10 px-6 text-sm',
    lg: 'h-14 min-h-14 px-9 text-xl',
    xl: 'h-16 min-h-16 px-10 text-xl',
    // sm: 'h-9 rounded-md px-3',
    // icon: 'h-10 w-10',
  }

  const classDefaultColors = classColors.primary
  const classDefaultVariants = ''
  const classDefaultSize = classSize.default
  const classDefaultButton =
    'btn font-bold capitalize relative hover:bg-[color-mix(in_oklab,var(--fallback-p,oklch(var(--btn-color)/1))_80%,white)] hover:border-[color-mix(in_oklab,var(--fallback-p,oklch(var(--btn-color)/1))_80%,white)]'
  const classDefaultLink = `btn font-bold capitalize relative ${classVariants.link}`

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
          className={cn(classDefaultButton, [
            classVariants[variant] ?? classDefaultVariants,
            href || variant === 'link'
              ? ''
              : classColors[color] ?? classDefaultColors,
            classSize[size] ?? classDefaultSize,
            className,
          ])}
          disabled={disabled}
          {...props}
        >
          <span
            className={cn('loading loading-spinner absolute', {
              'opacity-0': !isLoading,
            })}
          />
          <span className={cn({ 'opacity-0': isLoading })}>{children}</span>
        </button>
      )}
    </>
  )
}
