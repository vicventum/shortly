import { Icon } from '@iconify/react'

/**
 * TimelineGroup Component
 * A composable wrapper for grouping items in a timeline with a date header and a vertical line.
 */
export function TimelineGroup({ title, badge, children }) {
  return (
    <div className='relative pb-10 pl-6 last:pb-0 md:pl-8'>
      {/* Timeline line */}
      <div className='absolute top-8 bottom-11 left-1.5 w-px bg-base-200 md:left-8'></div>

      {/* Header */}
      <div className='relative z-10 mb-6 flex items-center gap-3'>
        <div className='-ml-[0.85rem] rounded-full bg-secondary p-2 text-secondary-content shadow-sm md:-ml-[1.1rem]'>
          <Icon className='size-5' icon='ph:calendar-blank-fill' />
        </div>
        <h3 className='text-lg font-bold text-base-content'>{title}</h3>
        <div className='ml-4 hidden h-px flex-1 bg-base-200 md:block'></div>
        {badge && (
          <span className='rounded-full border border-base-200 bg-base-100 px-3 py-1 text-xs font-medium text-base-content/60'>
            {badge}
          </span>
        )}
      </div>

      {/* Content List */}
      <div className='relative ml-6 space-y-4'>{children}</div>
    </div>
  )
}

/**
 * TimelineItem Component
 * Handles the individual item container with the timeline dot decoration.
 */
export function TimelineItem({ children }) {
  return (
    <div className='relative'>
      {/* Tiny dot on the line for each item */}
      <div className='absolute top-6 -left-[1.35rem] z-10 h-2 w-2 rounded-full bg-primary md:-left-[27px]'></div>
      {children}
    </div>
  )
}
