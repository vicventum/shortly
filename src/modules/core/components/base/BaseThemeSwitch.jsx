import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { Icon } from '@iconify/react'
import { useTheme } from '@/modules/core/hooks/use-theme'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { cn } from '@/modules/core/utils/cn'

export function BaseThemeSwitch({ className, ...prop }) {
  const { theme, setTheme } = useTheme()

  const themeOptions = ['light', 'cyberpunk', 'cobalt']

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  function handleInput(e) {
    const themeSelected = e.target.value
    setTheme(themeSelected)
  }

  return (
    <aside className={cn('dropdown dropdown-end lg:dropdown-bottom', className)} >
      <BaseButton tabIndex={0} className='hidden lg:flex px-3' variant='ghost'>
        <div className='flex gap-1 items-center'>
          <Icon
            className='size-6'
            icon='material-symbols:format-paint-outline'
          />
          Theme
          <Icon icon='ri:arrow-down-s-line' />
        </div>
      </BaseButton>
      <BaseButton tabIndex={0} className='lg:hidden' variant='icon'>
        <Icon
          className='size-6'
          icon='material-symbols:format-paint-outline'
        />
      </BaseButton>
      {/* <button tabIndex={1} className='btn btn-ghost btn-circle'>
        <Icon className='hidden md:max-lg:block size-6' icon='arcticons:vivo-themes' />
      </button> */}
      {/* <button  className='btn btn-primary btn-ghost' tabIndex={1}>
        <div className='flex gap-1'>
          Theme
          <Icon icon='ri:arrow-down-s-line' />
        </div>
      </button> */}
      {/* <div
        tabIndex={1}
        role='button'
        className='px-6- btn h-10 min-h-10 text-sm'
      >
        Theme
        <Icon icon='ri:arrow-down-s-line' />
      </div> */}

      <ul
        tabIndex={1}
        className='shadow-1xl dropdown-content z-[1] mt-1 w-auto rounded-box bg-base-200 p-2'
      >
        {themeOptions.map(themeOption => (
          <li key={themeOption}>
            <input
              aria-label={themeOption}
              value={themeOption}
              className='theme-controller btn btn-ghost btn-sm btn-block justify-start capitalize'
              type='radio'
              checked={theme === themeOption}
              onChange={handleInput}
            />
          </li>
        ))}
      </ul>
    </aside>
    // <select className='select select-bordered w-auto'
    //   <option className='text-sm font-semibold' value='light'>
    //     Light
    //   </option>
    //   <option className='text-sm font-semibold' value='cyberpunk'>
    //     Cyberpunk
    //   </option>
    //   <option className='text-sm font-semibold' value='cobalt'>
    //     Cobalt
    //   </option>
    // </select>
  )
}
