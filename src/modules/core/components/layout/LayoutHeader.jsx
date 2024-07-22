import { Logo } from '@/assets/img'
import { Icon } from '@iconify/react'
import { NAV_LINKS } from '@/modules/core/constants'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { LayoutHeaderMobileMenu } from '@/modules/core/components/layout/LayoutHeaderMobileMenu'
// import { cn } from '@/modules/core/utils/cn'

export function LayoutHeader() {
  return (
    <LayoutHeaderMobileMenu className='container'>
      <header className='navbar mt-8 bg-base-100'>
        <nav className='navbar-start gap-x-8'>
          {/* LOGO */}
          <a className='btn btn-link px-0'>
            <img src={Logo} alt='Shortly logo' />
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
          {/* <a className='btn btn-link link'>Login</a> */}
          <BaseButton href='#' className='max-md:hidden' variant='link'>
            Login
          </BaseButton>

          <BaseButton className='max-md:hidden' variant='rounded'>
            Sign Up
          </BaseButton>

          <Icon
            icon='radix-icons:hamburger-menu'
            className='size-8 cursor-pointer text-base-300 md:hidden focus:ring-primary focus:ring-1'
            tabIndex={0}
            role='button'
            // onClick={() => document.getElementById('modalMenu').showModal()}
          />
        </div>
      </header>
    </LayoutHeaderMobileMenu>
  )
}
