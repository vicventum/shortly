import { Icon } from '@iconify/react'
import { Logo } from '@/assets/img'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/modules/core/constants'

export function LayoutFooter({ ...prop }) {
  return (
    <footer className='bg-neutral p-16 text-neutral-content'>
      <div className='container grid gap-y-10 md:grid-cols-[1fr_2fr]'>
        <a className='btn btn-link md:justify-normal'>
          <img className='brightness-[5.5]' src={Logo} alt='Shortly logo' />
        </a>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(min(160px,100%),1fr))] gap-8 text-center md:text-left'>
          {FOOTER_LINKS.map(section => (
            <nav key={section.title}>
              <h3 className='text-sm font-bold text-base-100'>
                {section.title}
              </h3>
              <ul className='mt-4 space-y-2'>
                {section.links.map(link => (
                  <li key={link.label}>
                    <a
                      className='link text-sm hover:text-primary'
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav>
            <ul className='mt-5 flex justify-center gap-x-6 md:mt-0 md:justify-start'>
              {SOCIAL_LINKS.map(link => (
                <li key={link.icon}>
                  <a
                    className='link block text-white hover:text-primary'
                    href={link.href}
                  >
                    <Icon className='size-7' icon={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
