import { cn } from '@/modules/core/utils/cn'

export function BaseInput({
  variant = 'default',
  size = 'md',
  type = 'text',
  color,
  placeholder,
  className,
  ...props
}) {
  const classVariants = {
    default: 'input-bordered',
  }
  const classColor = {
    error: 'input-error',
  }
  const classSize = {
    md: 'input-md',
    lg: 'input-lg',
  }
  const classDefault = 'input flex w-full text-base-400'
  return (
    <>
      <label
        className={cn(
          classDefault,
          classVariants[variant],
          classColor[color],
          classSize[size],
          className
        )}
      >
        <input
          type={type}
          className='w-full'
          placeholder={placeholder}
          {...props}
        />
      </label>
    </>
  )
}
