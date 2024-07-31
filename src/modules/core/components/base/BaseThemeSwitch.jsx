import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { useTheme } from '@/modules/core/hooks/use-theme'
import { Icon } from '@iconify/react'
import { BaseButton } from './BaseButton'

export function BaseThemeSwitch({ ...prop }) {
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
    <aside className='dropdown'>
      <BaseButton tabIndex={1} color='' variant='ghost'>
        <div className='flex gap-1'>
          Theme
          <Icon icon='ri:arrow-down-s-line' />
        </div>
      </BaseButton>
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
