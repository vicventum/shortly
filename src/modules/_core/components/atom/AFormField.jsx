import { Icon } from '@iconify/react'

export function AFormField({
  label,
  labelIcon,
  invalidMessage,
  help,
  children,
  className = ''
}) {
  return (
    <fieldset className={`relative fieldset flex w-full flex-col py-0 ${className}`}>
      {label && (
        <legend className='fieldset-legend flex items-center gap-1 text-sm font-semibold text-base-content'>
          {labelIcon && <Icon icon={labelIcon} className='size-4' />}
          {label}
        </legend>
      )}
      
      {children}

      {help && !invalidMessage && (
        <span className='block text-xs text-base-300 ml-2'>
          {help}
        </span>
      )}

      {invalidMessage && (
        <span className='absolute -bottom-5 left-1 text-xs text-error italic'>
          {invalidMessage}
        </span>
      )}
    </fieldset>
  )
}
