import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { ACard } from '@/modules/core/components/atom/ACard'
import { AButton } from '@/modules/core/components/atom/AButton'
import { ABadge } from '@/modules/core/components/atom/ABadge'
import { AInput } from '@/modules/core/components/atom/AInput'
import { ATooltip } from '@/modules/core/components/atom/ATooltip'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'
import { formatTime } from '@/modules/dashboard/utils/format-links'
import { useUpdateLink } from '@/modules/dashboard/api/hooks/use-update-link'
import { useDeleteLink } from '@/modules/dashboard/api/hooks/use-delete-link'

export function CardLink({
  id,
  originalUrl,
  shortUrl,
  createdAt,
  clicks,
  status,
  onRefresh,
}) {
  const [isCopy, setIsCopy] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUrl, setEditedUrl] = useState(originalUrl)

  const { sendNewUrl, isPending: isShortening } = useShortUrl()

  const isPopular = status === 'popular'
  const isNew = status === 'new'
  const badgeColor = isPopular ? 'info' : isNew ? 'success' : 'warning'

  const btnText = isCopy ? '¡Copiado!' : 'Copiar'
  const btnBgColor = isCopy ? 'secondary' : 'primary'

  const { mutateAsync: updateLink, isPending: isUpdating } = useUpdateLink({
    onSuccess: () => {
      setIsEditing(false)
      if (onRefresh) onRefresh()
    },
  })

  const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink({
    onSuccess: () => {
      if (onRefresh) onRefresh()
    },
  })

  async function handleCopy() {
    try {
      await window.navigator.clipboard.writeText(shortUrl)
      setIsCopy(true)

      // Update clicks count automatically
      updateLink({ id, clicks: (clicks || 0) + 1 })
    } catch (error) {
      console.error('Error copying text', error)
    }
  }

  function handleDelete() {
    deleteLink({ id })
  }

  function handleEdit() {
    setIsEditing(true)
    setEditedUrl(originalUrl)
  }

  function handleCancel() {
    setIsEditing(false)
    setEditedUrl(originalUrl)
  }

  async function handleSave() {
    if (!editedUrl.trim() || editedUrl === originalUrl) {
      setIsEditing(false)
      return
    }

    try {
      // 1. Acortar el nuevo enlace
      const newShortUrl = await sendNewUrl({ url: editedUrl })

      // 2. Actualizar en el backend con ambos datos
      await updateLink({
        id,
        originalUrl: editedUrl,
        shortUrl: newShortUrl,
      })
    } catch (error) {
      console.error('Error al actualizar el enlace:', error)
    }
  }

  const isSaving = isShortening || isUpdating

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
                {clicks} clics
              </span>
              <ABadge
                color={badgeColor}
                size='sm'
                className={
                  isPopular
                    ? 'border-none bg-info/10 text-info capitalize'
                    : isNew
                      ? 'border-none bg-success/10 text-success capitalize'
                      : 'border-none bg-warning/10 text-warning capitalize'
                }
              >
                {status}
              </ABadge>
            </div>
          </div>
          {isEditing ? (
            <div className='animate-in fade-in slide-in-from-left-2 flex w-full items-center gap-2 duration-300'>
              <AInput
                value={editedUrl}
                onChange={e => setEditedUrl(e.target.value)}
                className='flex-1 border-primary/40 focus-within:border-primary'
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSave()
                  if (e.key === 'Escape') handleCancel()
                }}
              />
              <div className='flex items-center gap-1'>
                <ATooltip text='Guardar' position='bottom'>
                  <AButton
                    disabled={isSaving}
                    variant='icon'
                    size='sm'
                    onClick={handleSave}
                  >
                    <Icon
                      icon={isSaving ? 'ph:spinner-gap' : 'ph:check'}
                      className={`size-5 ${isSaving ? 'animate-spin' : ''}`}
                    />
                  </AButton>
                </ATooltip>

                <ATooltip text='Cancelar' position='bottom'>
                  <AButton
                    variant='icon'
                    size='sm'
                    color='error'
                    onClick={handleCancel}
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
            onClick={handleCopy}
            className='h-9 min-h-9 px-4 max-md:flex-1'
          >
            {btnText}
          </AButton>
          <div className='flex items-center gap-1'>
            <ATooltip text='Editar' position='top'>
              <AButton
                variant='icon'
                size='sm'
                onClick={handleEdit}
              >
                <Icon className='size-4' icon='ph:pencil-simple' />
              </AButton>
            </ATooltip>

            <ATooltip text='Eliminar' color='error' position='top'>
              <AButton
                variant='icon'
                size='sm'
                color='error'
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Icon
                  className={isDeleting ? 'size-4 animate-spin' : 'size-4'}
                  icon={isDeleting ? 'ph:spinner-gap' : 'ph:trash'}
                />
              </AButton>
            </ATooltip>
          </div>
        </div>
      </div>
    </ACard>
  )
}
