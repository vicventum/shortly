import { Icon } from '@iconify/react'
import { BModal } from '@/modules/core/components/molecule/BModal'

/**
 * CModalDanger Component
 * Dedicated variant for danger/delete actions.
 *
 * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Called when clicking backdrop or close
 * @param {string} title - Modal title
 * @param {string} icon - Iconify icon name
 * @param {string} content - Body text
 * @param {string} primaryButtonText - Text for primary button
 * @param {string} secondaryButtonText - Text for secondary button
 * @param {boolean} primaryButtonDisabled - Loading/Disabled state
 * @param {function} onPrimaryAction - Callback for deletion
 * @param {function} onSecondaryAction - Callback for cancellation
 */
export function CModalDanger({
  isOpen,
  onClose,
  title,
  icon = 'ph:trash-bold',
  content,
  primaryButtonText = 'Eliminar',
  secondaryButtonText = 'Cancelar',
  primaryButtonDisabled = false,
  onPrimaryAction,
  onSecondaryAction,
  className,
}) {
  const body = (
    <div className='text-center'>
      {/* ICON */}
      <div className='mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-error/10 text-error'>
        <Icon icon={icon} className='size-7' />
      </div>

      {/* TITLE */}
      {title && (
        <h3 className='mb-3 text-2xl leading-tight font-bold text-secondary'>
          {title}
        </h3>
      )}

      {/* CONTENT */}
      <p className='font-medium text-pretty text-base-300'>{content}</p>
    </div>
  )

  return (
    <BModal
      isOpen={isOpen}
      onClose={onClose}
      bodySlot={body}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      primaryButtonColor='error'
      primaryButtonDisabled={primaryButtonDisabled}
      onPrimaryAction={onPrimaryAction}
      onSecondaryAction={onSecondaryAction}
      className={className}
    />
  )
}
