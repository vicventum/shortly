import { cn } from '@/modules/core/utils/cn'

export function BaseInput({
  variant = 'default',
  size = 'md',
  type = 'text',
  invalidMessage,
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
    lg: 'input-md md:input-lg',
  }
  const classDefault = 'input flex w-full text-base-400'
  return (
    <>
      <label className='form-control relative w-full'>
        <input
          className={cn(
            classDefault,
            classVariants[variant],
            classColor[color],
            classSize[size],
            className
          )}
          type={type}
          placeholder={placeholder}
          {...props}
        />

        {invalidMessage && (
          <span className='absolute -bottom-8 left-0 text-sm italic text-error'>
            {invalidMessage}
          </span>
        )}
      </label>
    </>
  )
}
