import { NavLink } from 'react-router'
import { cva } from 'class-variance-authority'

import { cn } from '@/modules/core/utils/cn'

/** Hover más claro: DaisyUI 5 usa --btn-color (color semántico) y --btn-bg; el hover por defecto oscurece con #000. */
const HOVER_LIGHTEN =
  'hover:[--btn-bg:color-mix(in_oklab,var(--btn-color,var(--color-base-200))_80%,white)] hover:[--btn-border:color-mix(in_oklab,var(--btn-color,var(--color-base-200))_80%,white)]'

/** Hover más sutil para ghost/icon: usa opacidad en lugar de aclarar con blanco. */
const HOVER_GHOST =
  'hover:[--btn-bg:color-mix(in_oklab,var(--btn-color,var(--color-base-content))_15%,transparent)] hover:border-transparent'

export const buttonVariants = cva(`btn font-bold capitalize relative`, {
  variants: {
    color: {
      default: 'btn-primary',
      'base-200': `btn-base-200 ${HOVER_LIGHTEN}`,
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
      default: HOVER_LIGHTEN,
      rounded: `rounded-full ${HOVER_LIGHTEN}`,
      outline: `btn-outline ${HOVER_LIGHTEN}`,
      ghost: `btn-ghost text-base-300 ${HOVER_GHOST}`,
      link: 'btn-link link',
      square: `btn-square ${HOVER_LIGHTEN}`,
      circle: `btn-circle ${HOVER_LIGHTEN}`,
      icon: `btn-circle px-0 btn-ghost text-base-300 ${HOVER_GHOST}`,
    },
    ghostColor: {
      default: 'text-primary [--btn-color:var(--color-primary)]',
      primary: 'text-primary [--btn-color:var(--color-primary)]',
      secondary: 'text-secondary [--btn-color:var(--color-secondary)]',
      accent: 'text-accent [--btn-color:var(--color-accent)]',
      info: 'text-info [--btn-color:var(--color-info)]',
      success: 'text-success [--btn-color:var(--color-success)]',
      warning: 'text-warning [--btn-color:var(--color-warning)]',
      error: 'text-error [--btn-color:var(--color-error)]',
      'base-200': 'text-base-content [--btn-color:var(--color-base-200)]',
      none: '',
    },
    size: {
      default: 'h-10 min-h-10 px-6 text-sm',
      sm: 'btn-sm',
      lg: 'h-14 min-h-14 px-9 text-xl',
      xl: 'btn-lg md:btn-xl px-10',
    },
  },
  defaultVariants: {
    color: 'default',
    variant: 'default',
    ghostColor: 'none',
    size: 'default',
  },
})

export function AButton({
  color,
  variant = 'default',
  size = 'default',
  to,
  isLoading = false,
  disabled = false,
  className,
  children,
  ...props
}) {
  const isLinkElement = Boolean(to)
  const isNeutralVariant = ['link', 'ghost', 'icon'].includes(variant)
  const activeColor = isNeutralVariant ? 'none' : (color || 'default')
  const activeGhostColor = isNeutralVariant ? color : 'none'

  const componentClass = cn(
    buttonVariants({
      color: activeColor,
      ghostColor: activeGhostColor,
      variant,
      size,
      className,
    })
  )

  const content = (
    <>
      <span
        className={cn('loading absolute loading-spinner', {
          'opacity-0': !isLoading,
        })}
      />
      <span
        className={cn('flex items-center gap-2', { 'opacity-0': isLoading })}
      >
        {children}
      </span>
    </>
  )

  // Definimos dinámicamente qué componente renderizar (Debe empezar en Mayúscula)
  const Component = isLinkElement ? NavLink : 'button'

  // Filtramos los props específicos para evitar warnings de React en el DOM
  const dynamicProps = isLinkElement ? { to, ...props } : { disabled, ...props }

  return (
    <Component className={componentClass} {...dynamicProps}>
      {content}
    </Component>
  )
}
