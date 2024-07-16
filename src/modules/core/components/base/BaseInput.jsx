import { cn } from '@/modules/core/utils/cn'

export function BaseInput({
  variant = 'default',
  size = 'md',
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
        <input type='text' className='w-full' placeholder={placeholder} />
      </label>

      {/* <input
        type='text'
        placeholder='Type here'
        className='input input-bordered w-full max-w-xs'
      />
      <label className='input input-bordered flex items-center gap-2'>
        <input type='text' className='grow' placeholder='Search' />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path
            fillRule='evenodd'
            d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
            clipRule='evenodd'
          />
        </svg>
      </label> */}
    </>
  )
}
