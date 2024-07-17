import { Logo } from '@/assets/img'
import { NAV_LINKS } from '@/modules/core/constants'
import { BaseButton } from '@/modules/core/components/base/BaseButton'

export function LayoutHeader() {
  return (
    <>
      <header className='container navbar mt-8 bg-base-100'>
        <nav className='navbar-start gap-x-8'>
          {/* LOGO */}
          <a className='btn btn-link'>
            <img src={Logo} alt='Shortly logo' />
          </a>

          {/* LINKS */}
          <ul className='flex gap-x-7'>
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
        <div className='navbar-end gap-x-5'>
          {/* <a className='btn btn-link link'>Login</a> */}
          <BaseButton href='#' className='' variant='link'>
            Login
          </BaseButton>

          <BaseButton className='' variant='rounded'>
            Sign Up
          </BaseButton>
        </div>
      </header>
    </>
  )
}
