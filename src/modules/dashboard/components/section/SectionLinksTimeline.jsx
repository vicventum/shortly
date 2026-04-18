import { useState, useEffect } from 'react'
import { TimelineGroup } from '@/modules/dashboard/components/timeline/TimelineGroup'
import { CardLink } from '@/modules/dashboard/components/card/CardLink'
import { groupLinksByDate } from '@/modules/dashboard/utils/format-links'
import { Icon } from '@iconify/react'
import { useUpdateLink } from '@/modules/dashboard/api/hooks/use-update-link'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'
import { ModalDeleteLinkConfirmation } from '@/modules/dashboard/components/modal/ModalDeleteLinkConfirmation'

export function SectionLinksTimeline({ links, isLoading, onRefresh }) {
  const [copyId, setCopyId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editedUrlValue, setEditedUrlValue] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const { sendNewUrl, isPending: isShortening } = useShortUrl()
  const { mutateAsync: updateLink, isPending: isUpdating } = useUpdateLink({
    onSuccess: () => {
      setEditingId(null)
      if (onRefresh) onRefresh()
    },
  })

  // Handle copy timeout
  useEffect(() => {
    let timeoutId = null
    if (copyId) {
      timeoutId = setTimeout(() => {
        setCopyId(null)
      }, 1500)
    }
    return () => clearTimeout(timeoutId)
  }, [copyId])

  if (isLoading && !links) {
    return (
      <div className='mt-10 flex w-full justify-center p-8 text-primary'>
        <Icon icon='ph:spinner-gap-bold' className='size-8 animate-spin' />
      </div>
    )
  }

  if (!links || links.length === 0) {
    return (
      <div className='mt-10 rounded-xl bg-base-100 p-8 text-center text-base-content/50'>
        You don't have any saved links yet.
      </div>
    )
  }

  const handleCopy = async (id, shortUrl, currentClicks) => {
    try {
      await window.navigator.clipboard.writeText(shortUrl)
      setCopyId(id)
      updateLink({ id, clicks: (currentClicks || 0) + 1 })
    } catch (error) {
      console.error('Error copying text', error)
    }
  }

  const handleEdit = (id, originalUrl) => {
    setEditingId(id)
    setEditedUrlValue(originalUrl)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditedUrlValue('')
  }

  const handleSaveEdit = async id => {
    if (!editedUrlValue.trim()) {
      setEditingId(null)
      return
    }

    try {
      const newShortUrl = await sendNewUrl({ url: editedUrlValue })
      await updateLink({
        id,
        originalUrl: editedUrlValue,
        shortUrl: newShortUrl,
      })
    } catch (error) {
      console.error('Error updating link', error)
    }
  }

  const groupedData = groupLinksByDate(links)
  const isSaving = isShortening || isUpdating

  return (
    <div>
      <div className='flex flex-col'>
        {groupedData.map((group, index) => (
          <TimelineGroup
            key={index}
            title={group.dateLabel}
            badge={`${group.totalLinks} ${group.totalLinks === 1 ? 'link' : 'links'}`}
          >
            {group.links.map(link => (
              <CardLink
                key={link.id}
                {...link}
                editedUrlValue={editedUrlValue}
                isCopy={copyId === link.id}
                isEditing={editingId === link.id}
                isSaving={isSaving && editingId === link.id}
                onCopy={() => handleCopy(link.id, link.shortUrl, link.clicks)}
                onDelete={() => setDeletingId(link.id)}
                onEdit={() => handleEdit(link.id, link.originalUrl)}
                onSave={() => handleSaveEdit(link.id)}
                onCancel={handleCancelEdit}
                onEditedUrlChange={setEditedUrlValue}
              />
            ))}
          </TimelineGroup>
        ))}
      </div>

      <ModalDeleteLinkConfirmation
        id={deletingId}
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onSuccess={onRefresh}
      />
    </div>
  )
}
