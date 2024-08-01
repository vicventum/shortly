// import { createPortal } from 'react-dom'
import { Icon } from '@iconify/react'
import { NAV_LINKS } from '@/modules/core/constants'
import { BaseCard } from '@/modules/core/components/base/BaseCard'
import { BaseDivider } from '@/modules/core/components/base/BaseDivider'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { cn } from '@/modules/core/utils/cn'

export function LayoutHeaderMobileMenu({ children, className, ...prop }) {
  return (
    <>
      <div className={cn('hidden md:block', className)}>{children}</div>
      <details
        className={cn(
          'dropdown dropdown-end dropdown-bottom md:hidden',
          className
        )}
      >
        <summary className='list-none'>
          <Icon
            icon='radix-icons:hamburger-menu'
            className='size-8 cursor-pointer text-base-300 focus:ring-1 focus:ring-primary md:hidden'
            tabIndex={0}
            role='button'
            // onClick={() => document.getElementById('modalMenu').showModal()}
          />
        </summary>
        <div
          tabIndex={0}
          className='container dropdown-content z-10 mt-4 block w-screen translate-x-6'
        >
          <BaseCard className='space-y-3 rounded-xl bg-secondary p-6 pb-9'>
            {/* LINKS */}
            <ul className='flex flex-col items-center gap-y-3'>
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <BaseButton
                    href={link.href}
                    className='text-base-100 hover:text-base-200 active:text-base-200'
                    variant='link'
                    size='lg'
                  >
                    {link.label}
                  </BaseButton>
                </li>
              ))}
            </ul>
            <BaseDivider color='base-300' size='sm' />
            <div className='flex flex-col space-y-3'>
              <BaseButton
                href='#'
                className='text-base-100 hover:text-base-200 active:text-base-200'
                variant='link'
                size='lg'
              >
                Login
              </BaseButton>
              <BaseButton className='' variant='rounded' size='lg'>
                Sign Up
              </BaseButton>
            </div>
          </BaseCard>
        </div>
        {/* {createPortal(
							<dialog id='modalMenu' className='modal items-start'>
								<div className='modal-box mt-24'>
									<h3 className='text-lg font-bold'>Hello!</h3>
									<p className='py-4'>Press ESC key or click outside to close</p>
								</div>
								<form method='dialog' className='modal-backdrop'>
									<button>close</button>
								</form>
							</dialog>,
							document.body
						)} */}
      </details>
    </>
  )
}
