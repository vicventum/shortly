import { cn } from '@/modules/core/utils/cn'

/** Hover más claro: DaisyUI 5 usa --btn-color (color semántico) y --btn-bg; el hover por defecto oscurece con #000. */
const HOVER_LIGHTEN_SOLID =
  'hover:[--btn-bg:color-mix(in_oklab,var(--btn-color,var(--color-base-200))_80%,white)] hover:[--btn-border:color-mix(in_oklab,var(--btn-color,var(--color-base-200))_80%,white)]'

/** Botón ghost: fondo basado en base-200 (antes --b2 en DaisyUI 4). */
const HOVER_LIGHTEN_GHOST =
  'hover:[--btn-bg:color-mix(in_oklab,var(--color-base-200)_80%,white)] hover:[--btn-border:color-mix(in_oklab,var(--color-base-200)_80%,white)]'

const VARIANT_CLASSES = {
  rounded: 'rounded-full',
  outline: 'btn-outline',
  ghost: `btn-ghost text-base-300 ${HOVER_LIGHTEN_GHOST}`,
  link: 'btn-link link',
  square: 'btn-square',
  circle: 'btn-circle',
  icon: `btn-circle px-0 btn-ghost text-base-300 ${HOVER_LIGHTEN_GHOST}`,
}

const COLOR_CLASSES = {
  'base-200': `btn-base-200 ${HOVER_LIGHTEN_SOLID}`,
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
}

const SIZE_CLASSES = {
  default: 'h-10 min-h-10 px-6 text-sm',
  lg: 'h-14 min-h-14 px-9 text-xl',
  xl: 'btn-lg md:btn-xl px-10',
}

const DEFAULT_COLOR_CLASS = COLOR_CLASSES.primary
const DEFAULT_SIZE_CLASS = SIZE_CLASSES.default
const BASE_BUTTON_CLASS = `btn font-bold capitalize relative ${HOVER_LIGHTEN_SOLID}`
const BASE_LINK_CLASS = 'btn font-bold capitalize relative btn-link link'

export function AButton({
  color = 'default',
  variant = 'default',
  size = 'default',
  href,
  isLoading = false,
  disabled = false,
  className,
  children,
  ...props
}) {
  const isLinkElement = Boolean(href)
  const isNeutralVariant = ['link', 'ghost', 'icon'].includes(variant)

  if (isLinkElement) {
    const linkClasses = cn(
      BASE_LINK_CLASS,
      SIZE_CLASSES[size] ?? DEFAULT_SIZE_CLASS,
      className
    )

    return (
      <a href={href} className={linkClasses}>
        {children}
      </a>
    )
  }

  const buttonClasses = cn(
    BASE_BUTTON_CLASS,
    !isNeutralVariant && (COLOR_CLASSES[color] ?? DEFAULT_COLOR_CLASS),
    SIZE_CLASSES[size] ?? DEFAULT_SIZE_CLASS,
    VARIANT_CLASSES[variant] ?? '',
    className
  )

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      <span
        className={cn('loading absolute loading-spinner', {
          'opacity-0': !isLoading,
        })}
      />
      <span className={cn({ 'opacity-0': isLoading })}>{children}</span>
    </button>
  )
}
