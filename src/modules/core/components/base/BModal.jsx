import { useEffect, useRef } from 'react'
import { AButton } from '@/modules/core/components/atom/AButton'
import { cn } from '@/modules/core/utils/cn'
import { ACard } from '../atom/ACard'

/**
 * BModal Component - Base Modal
 *
 * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Called when clicking backdrop or close
 * @param {string} content - Modal description (body text)
 * @param {ReactNode} bodySlot - Optional slot to override body content
 * @param {ReactNode} footerSlot - Optional slot to override footer content
 * @param {string} primaryButtonText - Text for the primary action button
 * @param {string} secondaryButtonText - Text for the secondary action button
 * @param {string} primaryButtonColor - DaisyUI color for the primary button
 * @param {boolean} primaryButtonDisabled - Loading/Disabled state for primary button
 * @param {boolean} secondaryButtonDisabled - Disabled state for secondary button
 * @param {boolean} showFooter - Whether to show the footer or not
 * @param {function} onPrimaryAction - Primary action callback
 * @param {function} onSecondaryAction - Secondary action callback
 */
export function BModal({
  isOpen,
  onClose,
  content,
  bodySlot,
  footerSlot,
  primaryButtonText = 'Confirmar',
  secondaryButtonText = 'Cancelar',
  primaryButtonColor = 'primary',
  primaryButtonDisabled = false,
  secondaryButtonDisabled = false,
  showFooter = true,
  onPrimaryAction,
  onSecondaryAction,
  className,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  // Handle ESC key and backdrop via native events
  const handleClose = () => {
    onClose?.()
  }

  return (
    <dialog
      ref={dialogRef}
      className={cn('modal modal-bottom sm:modal-middle', className)}
      onClose={handleClose}
    >
      <ACard className='relative modal-box flex max-w-[440px] flex-col items-center gap-6 rounded-3xl bg-base-100 text-center shadow-2xl'>
        {/* BODY SLOT */}
        <div className=''>
          {bodySlot ? (
            bodySlot
          ) : (
            <p className='text-lg leading-relaxed font-medium text-balance text-base-300'>
              {content}
            </p>
          )}
        </div>

        {/* FOOTER SLOT */}
        {showFooter && (
          <div className='modal-action mt-4 flex w-full justify-center gap-4'>
            {footerSlot ? (
              footerSlot
            ) : (
              <>
                <AButton
                  className='h-14 flex-1 rounded-2xl'
                  variant='ghost'
                  color='neutral'
                  disabled={secondaryButtonDisabled}
                  onClick={onSecondaryAction || onClose}
                >
                  {secondaryButtonText}
                </AButton>
                <AButton
                  className='h-14 flex-1 rounded-2xl'
                  color={primaryButtonColor}
                  disabled={primaryButtonDisabled}
                  variant='default'
                  onClick={onPrimaryAction}
                >
                  {primaryButtonText}
                </AButton>
              </>
            )}
          </div>
        )}
      </ACard>

      {/* Backdrop interaction to close */}
      <form
        method='dialog'
        className='modal-backdrop bg-black/40 backdrop-blur-[2px]'
      >
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  )
}
