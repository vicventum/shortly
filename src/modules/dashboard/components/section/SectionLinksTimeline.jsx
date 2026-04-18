import { useState, useEffect } from 'react'
import { TimelineGroup } from '@/modules/dashboard/components/timeline/TimelineGroup'
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

  const handleSaveEdit = async (id) => {
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

  return (
    <section className="w-full mt-10">
      <div className="flex flex-col">
        {groupedData.map((group, index) => (
          <TimelineGroup 
            key={index} 
            group={group} 
            copyId={copyId}
            editingId={editingId}
            editedUrlValue={editedUrlValue}
            isSaving={isShortening || isUpdating}
            onCopy={handleCopy}
            onDelete={setDeletingId}
            onEdit={handleEdit}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            onEditedUrlChange={setEditedUrlValue}
          />
        ))}
      </div>

      <ModalDeleteLinkConfirmation 
        id={deletingId}
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onSuccess={onRefresh}
      />
    </section>
  )
}
