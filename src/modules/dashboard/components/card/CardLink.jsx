import { Icon } from '@iconify/react'
import { ACard } from '@/modules/core/components/atom/ACard'
import { AButton } from '@/modules/core/components/atom/AButton'
import { ABadge } from '@/modules/core/components/atom/ABadge'
import { AInput } from '@/modules/core/components/atom/AInput'
import { ATooltip } from '@/modules/core/components/atom/ATooltip'
import { formatTime } from '@/modules/dashboard/utils/format-links'

export function CardLink({
  originalUrl,
  shortUrl,
  createdAt,
  clicks,
  status,
  isCopy,
  isEditing,
  editedUrlValue,
  isSaving,
  onCopy,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  onEditedUrlChange,
}) {
  const isPopular = status === 'popular'
  const isNew = status === 'new'
  const badgeColor = isPopular ? 'info' : isNew ? 'success' : 'warning'

  const btnText = isCopy ? 'Copied!' : 'Copy'
  const btnBgColor = isCopy ? 'secondary' : 'primary'

  return (
    <ACard className='mb-4 p-5 transition-shadow last:mb-0 hover:shadow-md md:p-6'>
      <div className='mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        {/* URL Original and metadata */}
        <div className='w-full min-w-0 flex-1'>
          <div className='mb-3 flex items-center justify-between gap-3'>
            <span className='flex items-center gap-1 text-xs whitespace-nowrap text-base-content/50'>
              <Icon icon='ph:clock' />
              {formatTime(createdAt)}
            </span>
            <div className='ml-auto flex items-center gap-3 md:ml-4'>
              <span className='flex items-center gap-1 text-xs font-semibold whitespace-nowrap text-base-content/70'>
                <Icon icon='ph:cursor-click-fill' />
                {clicks} clicks
              </span>
              <ABadge
                color={badgeColor}
                size='sm'
              >
                {status}
              </ABadge>
            </div>
          </div>
          {isEditing ? (
            <div className='animate-in fade-in slide-in-from-left-2 flex w-full items-center gap-2 duration-300'>
              <AInput
                value={editedUrlValue}
                autoFocus
                className='flex-1 border-primary/40 focus-within:border-primary'
                onChange={e => onEditedUrlChange(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') onSave()
                  if (e.key === 'Escape') onCancel()
                }}
              />
              <div className='flex items-center gap-1'>
                <ATooltip text='Save' position='bottom'>
                  <AButton
                    disabled={isSaving}
                    variant='icon'
                    size='sm'
                    onClick={onSave}
                  >
                    <Icon
                      icon={isSaving ? 'ph:spinner-gap' : 'ph:check'}
                      className={`size-5 ${isSaving ? 'animate-spin' : ''}`}
                    />
                  </AButton>
                </ATooltip>

                <ATooltip text='Cancel' position='bottom'>
                  <AButton
                    variant='icon'
                    size='sm'
                    color='error'
                    onClick={onCancel}
                  >
                    <Icon icon='ph:x' className='size-5' />
                  </AButton>
                </ATooltip>
              </div>
            </div>
          ) : (
            <p className='truncate pr-4 text-sm font-medium text-base-content'>
              {originalUrl}
            </p>
          )}
        </div>
      </div>

      <div className='flex flex-col justify-between gap-4 border-t border-base-200 pt-4 md:flex-row md:items-center'>
        {/* Short URL */}
        <a
          href={shortUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 truncate text-sm font-medium text-primary hover:underline'
        >
          <Icon icon='ph:arrow-square-out' />
          {shortUrl}
        </a>

        {/* Actions */}
        <div className='flex w-full items-center gap-2 max-md:justify-between md:w-auto'>
          <AButton
            size='sm'
            color={btnBgColor}
            onClick={onCopy}
            className='h-9 min-h-9 px-4 max-md:flex-1'
          >
            {btnText}
          </AButton>
          <div className='flex items-center gap-1'>
            <ATooltip text='Edit' position='top'>
              <AButton
                variant='icon'
                size='sm'
                onClick={onEdit}
              >
                <Icon className='size-4' icon='ph:pencil-simple' />
              </AButton>
            </ATooltip>

            <ATooltip text='Delete' color='error' position='top'>
              <AButton
                variant='icon'
                size='sm'
                color='error'
                onClick={onDelete}
              >
                <Icon
                  className='size-4'
                  icon='ph:trash'
                />
              </AButton>
            </ATooltip>
          </div>
        </div>
      </div>
    </ACard>
  )
}
