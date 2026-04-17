import { TimelineGroup } from '@/modules/dashboard/components/timeline/TimelineGroup'
import { groupLinksByDate } from '@/modules/dashboard/utils/format-links'
import { Icon } from '@iconify/react'

export function SectionLinksTimeline({ links, isLoading, onRefresh }) {

  if (isLoading && !links) {
    return (
      <div className="p-8 w-full flex justify-center text-primary mt-10">
        <Icon icon="ph:spinner-gap-bold" className="animate-spin size-8" />
      </div>
    )
  }

  if (!links || links.length === 0) {
    return (
      <div className="p-8 mt-10 text-center text-base-content/50 bg-base-100 rounded-xl">
        No tienes enlaces guardados todavía.
      </div>
    )
  }

  const groupedData = groupLinksByDate(links)

  return (
    <section className="w-full mt-10">
      <div className="flex flex-col">
        {groupedData.map((group, index) => (
          <TimelineGroup key={index} group={group} onRefresh={onRefresh} />
        ))}
      </div>
    </section>
  )
}
