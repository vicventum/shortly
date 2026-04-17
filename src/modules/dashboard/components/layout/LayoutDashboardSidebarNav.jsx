import { NavLink } from 'react-router'
import { Icon } from '@iconify/react'
import { cn } from '@/modules/core/utils/cn'
import { DASHBOARD_NAV_LINKS } from '@/modules/dashboard/constants/dashboard-nav'

export function DashboardSidebarNav() {
  return (
    <nav className="flex flex-col gap-2 mt-8">
      {DASHBOARD_NAV_LINKS.map((link) => (
        <NavLink
          key={link.label}
          to={link.to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
            )
          }
        >
          <Icon className="size-5" icon={link.icon} />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
