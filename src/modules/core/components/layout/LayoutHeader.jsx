import { Logo } from '@/assets/img'
import { NAV_LINKS } from '@/modules/core/constants'
import { AButton } from '@/modules/core/components/atom/AButton'
import { LayoutHeaderMobileMenu } from '@/modules/core/components/layout/LayoutHeaderMobileMenu'
import { DThemeSwitch } from '@/modules/core/components/design/DThemeSwitch'
import { useTheme } from '@/modules/core/hooks/use-theme'
import { cn } from '@/modules/core/utils/cn'
import { ADivider } from '@/modules/core/components/atom/ADivider'

export function LayoutHeader() {
  const { theme } = useTheme()

  return (
    <div className='container'>
      <header className='navbar mt-8 bg-base-100 px-0'>
        <nav className='navbar-start gap-x-8'>
          {/* LOGO */}
          <a className='btn px-0 btn-link'>
            <img
              className={cn({
                invert: ['cobalt', 'cyberpunk'].includes(theme),
              })}
              src={Logo}
              alt='Shortly logo'
            />
          </a>
          {/* LINKS */}
          <ul className='hidden gap-x-7 md:flex'>
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a href={link.href} className='link text-sm font-bold'>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* ACTION BUTTONS */}
        <div className='navbar-end gap-x-5 md:max-lg:gap-x-1'>
          <DThemeSwitch className='mx-0' />
          <ADivider
            className='mx-0 hidden md:flex'
            orientation='vertical'
            color='base-200'
            size='sm'
          />
          {/* <a className='btn btn-link link'>Login</a> */}
          <AButton href='#' className='max-md:hidden' variant='link'>
            Login
          </AButton>
          <AButton className='max-md:hidden' variant='rounded'>
            Sign Up
          </AButton>
          <LayoutHeaderMobileMenu />
        </div>
      </header>
    </div>
  )
}
