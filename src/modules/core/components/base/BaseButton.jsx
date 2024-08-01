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
    ghost:
      'btn-ghost text-base-300 hover:bg-[color-mix(in_oklab,var(--fallback-p,oklch(var(--b2)/1))_100%,white)] hover:border-[color-mix(in_oklab,var(--fallback-p,oklch(var(--b2)/1))_100%,white)]',
    link: 'btn-link link',
    square: 'btn-square',
    circle: 'btn-circle',
    icon: 'btn-circle px-0',
  }
  classVariants.icon += ` ${classVariants.ghost}`
  const classColors = {
    'base-200':
      'btn-base-200 hover:bg-[color-mix(in_oklab,var(--fallback-p,oklch(var(--b2)/1))_80%,white)] hover:border-[color-mix(in_oklab,var(--fallback-p,oklch(var(--b2)/1))_80%,white)]',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    // transparent: classVariants.ghost,
  }
  const classSize = {
    default: 'h-10 min-h-10 px-6 text-sm',
    lg: 'h-14 min-h-14 px-9 text-xl',
    xl: 'h-12 min-h-12 px-10 text-xl md:h-16 md:min-h-16',
    // sm: 'h-9 rounded-md px-3',
    // icon: 'h-10 w-10',
  }

  const classDefaultColors = classColors.primary
  const classDefaultVariants = ''
  const classDefaultSize = classSize.default
  const classDefaultButton =
    'btn font-bold capitalize relative flex hover:bg-[color-mix(in_oklab,var(--fallback-p,oklch(var(--btn-color)/1))_80%,white)] hover:border-[color-mix(in_oklab,var(--fallback-p,oklch(var(--btn-color)/1))_80%,white)]'
  const classDefaultLink = `btn font-bold capitalize relative ${classVariants.link}`

  return (
    <>
      {href ? (
        <a
          href={href}
          className={cn(classDefaultLink, classSize[size], className)}
        >
          {children}
        </a>
      ) : (
        <button
          className={cn(classDefaultButton, [
            href || ['link', 'ghost', 'icon'].includes(variant)
              ? ''
              : classColors[color] ?? classDefaultColors,
            classSize[size] ?? classDefaultSize,
            classVariants[variant] ?? classDefaultVariants,
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
