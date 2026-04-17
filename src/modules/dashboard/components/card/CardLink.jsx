import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { ACard } from '@/modules/core/components/atom/ACard'
import { AButton } from '@/modules/core/components/atom/AButton'
import { ABadge } from '@/modules/core/components/atom/ABadge'

export function CardLink({ originalUrl, shortUrl, createdAt, clicks, status }) {
  const [isCopy, setIsCopy] = useState(false)
  const isPopular = status === 'Popular'
  const badgeColor = isPopular ? 'info' : 'warning'
  
  const btnText = isCopy ? '¡Copiado!' : 'Copiar'
  const btnBgColor = isCopy ? 'secondary' : 'primary'

  async function handleCopy() {
    try {
      await window.navigator.clipboard.writeText(shortUrl)
      setIsCopy(true)
    } catch (error) {
      console.error('Error copying text', error)
    }
  }

  useEffect(() => {
    let copyTimeoutId = null
    if (isCopy) {
      copyTimeoutId = setTimeout(() => {
        setIsCopy(false)
      }, 1500)
    }

    return () => clearTimeout(copyTimeoutId)
  }, [isCopy])
  
  return (
    <ACard className="p-5 md:p-6 mb-4 last:mb-0 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* URL Original and metadata */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="flex items-center gap-1 text-xs text-base-content/50 whitespace-nowrap">
              <Icon icon="ph:clock" />
              {createdAt}
            </span>
            <div className="flex items-center gap-3 ml-auto md:ml-4">
              <span className="flex items-center gap-1 text-xs font-semibold text-base-content/70 whitespace-nowrap">
                <Icon icon="ph:cursor-click-fill" />
                {clicks} clics
              </span>
              <ABadge 
                color={badgeColor} 
                size="sm" 
                className={isPopular ? 'bg-info/10 text-info border-none' : 'bg-warning/10 text-warning border-none'}
              >
                {status}
              </ABadge>
            </div>
          </div>
          <p className="text-sm font-medium text-base-content truncate pr-4">
            {originalUrl}
          </p>
        </div>
      </div>

      <div className="border-t border-base-200 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Short URL */}
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary font-medium text-sm flex items-center gap-2 hover:underline truncate"
        >
          <Icon icon="ph:arrow-square-out" />
          {shortUrl}
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2 max-md:justify-between w-full md:w-auto">
          <AButton 
            size="sm" 
            color={btnBgColor}
            onClick={handleCopy}
            className="max-md:flex-1 h-9 min-h-9 px-4"
          >
            {btnText}
          </AButton>
          <div className="flex items-center gap-1">
            <AButton variant="icon" size="sm" className="h-9 w-9 min-h-9 text-base-content/50 hover:text-base-content">
              <Icon className="size-4" icon="ph:pencil-simple" />
            </AButton>
            <AButton variant="icon" size="sm" className="h-9 w-9 min-h-9 text-base-content/50 hover:text-error">
              <Icon className="size-4" icon="ph:trash" />
            </AButton>
          </div>
        </div>
      </div>
    </ACard>
  )
}
