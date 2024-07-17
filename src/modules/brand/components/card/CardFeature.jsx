import { cn } from '@/modules/core/utils/cn'
import { BaseCard } from '@/modules/core/components/base/BaseCard'

export function CardFeature({ icon, title, text, className, ...prop }) {
  return (
    <BaseCard className={cn('relative px-8 pb-9 pt-20', className)} {...prop}>
      <div className='size-22 absolute -top-11 left-8 flex items-center justify-center rounded-full bg-secondary'>
        <img className='' src={icon} alt='icon image' />
      </div>

      <h3 className='mb-4 font-bold'>{title}</h3>

      <p className='text-sm'>{text}</p>
    </BaseCard>
  )
}
