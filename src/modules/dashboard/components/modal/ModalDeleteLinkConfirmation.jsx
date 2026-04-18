import { CModalDanger } from '@/modules/core/components/composite/CModalDanger'
import { useDeleteLink } from '@/modules/dashboard/api/hooks/use-delete-link'

/**
 * ModalDeleteLinkConfirmation Component
 * Specific modal for confirming link deletion in the dashboard.
 * 
 * @param {string} id - The ID of the link to delete
 * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Called when closing/cancelling
 * @param {function} onSuccess - Callback after successful deletion
 */
export function ModalDeleteLinkConfirmation({
  id,
  isOpen,
  onClose,
  onSuccess,
}) {
  const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink({
    onSuccess: () => {
      onSuccess?.()
      onClose?.()
    },
  })

  function handleConfirm() {
    deleteLink({ id })
  }

  return (
    <CModalDanger
      isOpen={isOpen}
      onClose={onClose}
      title='¿Eliminar enlace?'
      content='Esta acción no se puede deshacer. El enlace acortado dejará de funcionar permanentemente.'
      primaryButtonText='Eliminar'
      primaryButtonDisabled={isDeleting}
      onPrimaryAction={handleConfirm}
    />
  )
}
