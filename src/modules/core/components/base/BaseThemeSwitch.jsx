import { useEffect } from 'react'
import { themeChange } from 'theme-change'

export function BaseThemeSwitch({ ...prop }) {
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <div className='dropdown'>
      <div tabIndex={0} role='button' className='btn m-1'>
        Theme
        <svg
          width='12px'
          height='12px'
          className='inline-block h-2 w-2 fill-current opacity-60'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 2048 2048'
        >
          <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z' />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className='shadow-1xl dropdown-content z-[1] w-auto rounded-box bg-base-200 p-2'
      >
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-ghost btn-sm btn-block justify-start'
            aria-label='Default'
            value='default'
            data-set-theme='light'
            data-act-class='ACTIVECLASS'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-ghost btn-sm btn-block justify-start'
            aria-label='Dark'
            value='dark'
            data-set-theme='dark'
            data-act-class='ACTIVECLASS'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-ghost btn-sm btn-block justify-start'
            aria-label='Cobalt'
            value='cobalt'
            data-set-theme='cobalt'
            data-act-class='ACTIVECLASS'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-ghost btn-sm btn-block justify-start'
            aria-label='Cyberpunk'
            value='cyberpunk'
            data-set-theme='cyberpunk'
            data-act-class='ACTIVECLASS'
          />
        </li>
        {/* <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-ghost btn-sm btn-block justify-start'
            aria-label='Cyberpunk'
            value='cyberpunk'
          />
        </li> */}
      </ul>
    </div>
  )
}
