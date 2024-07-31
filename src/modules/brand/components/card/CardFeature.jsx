import { cn } from '@/modules/core/utils/cn'
import { BaseCard } from '@/modules/core/components/base/BaseCard'
import { useTheme } from '@/modules/core/hooks/use-theme'

export function CardFeature({ icon, title, text, className, ...prop }) {
  const { theme } = useTheme()

  return (
    <BaseCard
      className={cn(
        'relative px-8 pb-9 pt-20 text-center md:text-left',
        className
      )}
      {...prop}
    >
      <div className='absolute -top-11 left-2/4 flex size-22 -translate-x-1/2 items-center justify-center rounded-full bg-secondary md:left-8 md:translate-x-0'>
        <img
          className={cn({ 'brightness-[0.4]': theme === 'cyberpunk' })}
          src={icon}
          alt='icon image'
        />
      </div>

      <h3 className='mb-4 font-bold'>{title}</h3>

      <p className='text-sm'>{text}</p>
    </BaseCard>
  )
}
