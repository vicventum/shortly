import { cva } from 'class-variance-authority'
import { cn } from '@/modules/core/utils/cn'

/** Hover más claro: DaisyUI 5 usa --btn-color (color semántico) y --btn-bg; el hover por defecto oscurece con #000. */
const HOVER_LIGHTEN_SOLID =
  'hover:[--btn-bg:color-mix(in_oklab,var(--btn-color,var(--color-base-200))_80%,white)] hover:[--btn-border:color-mix(in_oklab,var(--btn-color,var(--color-base-200))_80%,white)]'

/** Botón ghost: fondo basado en base-200 (antes --b2 en DaisyUI 4). */
const HOVER_LIGHTEN_GHOST =
  'hover:[--btn-bg:color-mix(in_oklab,var(--color-base-200)_80%,white)] hover:[--btn-border:color-mix(in_oklab,var(--color-base-200)_80%,white)]'

export const buttonVariants = cva(
  `btn font-bold capitalize relative`,
  {
    variants: {
      color: {
        default: 'btn-primary',
        'base-200': `btn-base-200 ${HOVER_LIGHTEN_SOLID}`,
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
        none: '',
      },
      variant: {
        default: HOVER_LIGHTEN_SOLID,
        rounded: `rounded-full ${HOVER_LIGHTEN_SOLID}`,
        outline: `btn-outline ${HOVER_LIGHTEN_SOLID}`,
        ghost: `btn-ghost text-base-300 ${HOVER_LIGHTEN_GHOST}`,
        link: 'btn-link link',
        square: `btn-square ${HOVER_LIGHTEN_SOLID}`,
        circle: `btn-circle ${HOVER_LIGHTEN_SOLID}`,
        icon: `btn-circle px-0 btn-ghost text-base-300 ${HOVER_LIGHTEN_GHOST}`,
      },
      size: {
        default: 'h-10 min-h-10 px-6 text-sm',
        lg: 'h-14 min-h-14 px-9 text-xl',
        xl: 'btn-lg md:btn-xl px-10',
      },
    },
    defaultVariants: {
      color: 'default',
      variant: 'default',
      size: 'default',
    },
  }
)

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

  const activeColor = isNeutralVariant ? 'none' : color

  if (isLinkElement) {
    return (
      <a
        href={href}
        className={cn(buttonVariants({ variant: 'link', size, className }))}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={cn(buttonVariants({ color: activeColor, variant, size, className }))}
      disabled={disabled}
      {...props}
    >
      <span
        className={cn('loading absolute loading-spinner', {
          'opacity-0': !isLoading,
        })}
      />
      <span className={cn({ 'opacity-0': isLoading })}>{children}</span>
    </button>
  )
}
