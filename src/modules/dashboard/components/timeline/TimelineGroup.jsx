import { Icon } from '@iconify/react'
import { CardLink } from '@/modules/dashboard/components/card/CardLink'

export function TimelineGroup({ group }) {
  return (
    <div className="relative pl-6 md:pl-8 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-1.5 md:left-8 top-8 bottom-11 w-px bg-base-200"></div>
      
      {/* Date Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-secondary text-secondary-content p-2 rounded-full shadow-sm -ml-[0.85rem] md:-ml-[1.1rem]">
          <Icon className="size-5" icon="ph:calendar-blank-fill" />
        </div>
        <h3 className="text-lg font-bold text-base-content">{group.dateLabel}</h3>
        <div className="h-px bg-base-200 flex-1 ml-4 hidden md:block"></div>
        <span className="text-xs font-medium text-base-content/60 bg-base-100 px-3 py-1 rounded-full border border-base-200">
          {group.totalLinks} {group.totalLinks === 1 ? 'enlace' : 'enlaces'}
        </span>
      </div>

      {/* Links List */}
      <div className="space-y-4 relative ml-6">
        {group.links.map((link) => (
          <div key={link.id} className="relative">
            {/* Tiny dot on the line for each item */}
            <div className="absolute -left-[1.35rem] md:-left-[27px] top-6 w-2 h-2 rounded-full bg-primary z-10"></div>
            <CardLink {...link} />
          </div>
        ))}
      </div>
    </div>
  )
}
