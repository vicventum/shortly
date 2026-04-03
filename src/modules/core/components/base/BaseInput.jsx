import { cn } from '@/modules/core/utils/cn'

const VARIANT_CLASSES = {
  default: '',
}
const COLOR_CLASSES = {
  error: 'input-error',
}
const SIZE_CLASSES = {
  md: 'input-md',
  lg: 'input-md md:input-lg',
  xl: 'input-lg md:input-xl px-6 text-lg',
}
const DEFAULT_CLASS = 'input flex w-full text-base-400'

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
  return (
    <>
      <label className='relative flex w-full flex-col'>
        <input
          className={cn(
            DEFAULT_CLASS,
            VARIANT_CLASSES[variant],
            COLOR_CLASSES[color],
            SIZE_CLASSES[size],
            className
          )}
          type={type}
          placeholder={placeholder}
          {...props}
        />

        {invalidMessage && (
          <span className='text-error absolute -bottom-8 left-0 text-sm italic'>
            {invalidMessage}
          </span>
        )}
      </label>
    </>
  )
}
