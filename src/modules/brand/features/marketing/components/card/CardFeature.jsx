import { cn } from '@/modules/core/utils/cn'
import { ACard } from '@/modules/core/components/atom/ACard'
import { useTheme } from '@/modules/core/hooks/use-theme'

export function CardFeature({ icon, title, text, className, ...prop }) {
  const { theme } = useTheme()

  return (
    <ACard
      className={cn(
        'relative px-8 pt-20 pb-9 text-center md:text-left',
        className
      )}
      {...prop}
    >
      <div className='absolute -top-11 left-2/4 flex size-22 -translate-x-1/2 items-center justify-center rounded-full bg-secondary md:left-8 md:translate-x-0'>
        <img
          className={cn({
            'brightness-[0.4]': theme === 'cyberpunk',
            'brightness-[1.2]': theme === 'cobalt',
          })}
          src={icon}
          alt='icon image'
        />
      </div>

      <h3 className='mb-4 font-bold'>{title}</h3>

      <p className='text-sm'>{text}</p>
    </ACard>
  )
}
