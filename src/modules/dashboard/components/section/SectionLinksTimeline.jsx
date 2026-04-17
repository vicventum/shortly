import { TimelineGroup } from '@/modules/dashboard/components/timeline/TimelineGroup'
import { DASHBOARD_TIMELINE_DATA } from '@/modules/dashboard/constants/dashboard-mock-data'

export function SectionLinksTimeline() {
  return (
    <section className="w-full mt-10">
      <div className="flex flex-col">
        {DASHBOARD_TIMELINE_DATA.map((group, index) => (
          <TimelineGroup key={index} group={group} />
        ))}
      </div>
    </section>
  )
}
