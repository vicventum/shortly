import { Logo } from '@/assets/img'
import { Icon } from '@iconify/react'
import { NAV_LINKS } from '@/modules/core/constants'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { LayoutHeaderMobileMenu } from '@/modules/core/components/layout/LayoutHeaderMobileMenu'
import { BaseThemeSwitch } from '@/modules/core/components/base/BaseThemeSwitch'
import { getActiveTheme } from '@/modules/core/utils/get-active-theme'
import { cn } from '@/modules/core/utils/cn'
import { useState } from 'react'
import useThemeObserver from '../../hooks/use-theme-observer'

export function LayoutHeader() {
  // console.log(cn({ invert: getActiveTheme() === 'cyberpunk' }))
  const [theme, setTheme] = useState(
    document.querySelector('html').getAttribute('data-theme')
  )

  useThemeObserver(newTheme => {
    setTheme(newTheme)
    console.log(`Theme changed to: ${newTheme}`)
  })
  return (
    <LayoutHeaderMobileMenu className='container'>
      <header className='navbar mt-8 bg-base-100'>
        <nav className='navbar-start gap-x-8'>
          {/* LOGO */}
          <a className='btn btn-link px-0'>
            <img
              className={cn({ invert: ['cobalt', 'cyberpunk'].includes(theme) })}
              src={Logo}
              alt='Shortly logo'
            />
          </a>

          {/* LINKS */}
          <ul className='hidden gap-x-7 md:flex'>
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a href={link.href} className='text-md link font-bold'>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ACTION BUTTONS */}
        <div className='navbar-end gap-x-5'>
          <BaseThemeSwitch />

          {/* <a className='btn btn-link link'>Login</a> */}
          <BaseButton href='#' className='max-md:hidden' variant='link'>
            Login
          </BaseButton>

          <BaseButton className='max-md:hidden' variant='rounded'>
            Sign Up
          </BaseButton>

          <Icon
            icon='radix-icons:hamburger-menu'
            className='size-8 cursor-pointer text-base-300 focus:ring-1 focus:ring-primary md:hidden'
            tabIndex={0}
            role='button'
            // onClick={() => document.getElementById('modalMenu').showModal()}
          />
        </div>
      </header>
    </LayoutHeaderMobileMenu>
  )
}
