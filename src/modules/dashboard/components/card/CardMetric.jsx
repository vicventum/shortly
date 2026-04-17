import { Icon } from '@iconify/react'
import { ACard } from '@/modules/core/components/atom/ACard'

export function CardMetric({ icon, label, value, subtitle }) {
  return (
    <ACard className="relative overflow-hidden pl-6 py-5 flex flex-col justify-center border-l-4 border-l-primary hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Icon className="size-5" icon={icon} />
        </div>
        <span className="text-sm font-semibold text-base-content/60">{label}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-base-content">{value}</span>
        {subtitle && (
          <span className="text-xs text-base-content/50 mt-1 truncate">{subtitle}</span>
        )}
      </div>
    </ACard>
  )
}
