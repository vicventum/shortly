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
    default: 'h-10 min-h-10 px-6 text-base',
    lg: 'h-14 min-h-14 px-9 text-button',
    xl: 'h-16 min-h-16 px-10 text-button',
    // sm: 'h-9 rounded-md px-3',
    // icon: 'h-10 w-10',
  }

  const classDefaultColors = classColors.primary
  const classDefaultVariants = ''
  const classDefaultSize = classSize.default
  const classDefaultButton = 'btn capitalize relative hover:bg-[color-mix(in_oklab,var(--fallback-p,oklch(var(--btn-color)/1))_90%,white)] hover:border-[color-mix(in_oklab,var(--fallback-p,oklch(var(--btn-color)/1))_90%,white)]'
  const classDefaultLink = `btn capitalize relative ${classVariants.link}`

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
          {/* <span
            className={cn(classDefaultButton, [
              classVariants[variant] ?? classDefaultVariants,
              href || variant === 'link'
                ? ''
                : classColors[color] ?? classDefaultColors,
              classSize[size] ?? classDefaultSize,
              'absolute left-0 top-0 z-10 bg-black w-full hover:opacity-60 pointer-events-none mt-0',
              className,
            ])}
          /> */}
        </button>
      )}
    </>
  )
}
