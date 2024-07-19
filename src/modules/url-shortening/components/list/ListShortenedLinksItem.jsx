import { useState, useEffect } from 'react'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { BaseCard } from '@/modules/core/components/base/BaseCard'

export function ListShortenedLinksItem({ url, urlShortened }) {
  const [isCopy, setIsCopy] = useState(false)

  const btnText = isCopy ? 'Copied!' : 'Copy'
  const btnBgColor = isCopy ? 'secondary' : 'primary'

  async function handleClick() {
    try {
      await window.navigator.clipboard.writeText(urlShortened)
      setIsCopy(!isCopy)
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

    return () => clearInterval(copyTimeoutId)
  }, [isCopy])

  return (
    <>
      <BaseCard className='text-lg font-semibold flex items-center justify-between px-7 py-5'>
        <span>{url}</span>

        <div className='space-x-6'>
          <span className='text-primary'>{urlShortened}</span>

          <BaseButton className='w-26' color={btnBgColor} onClick={handleClick}>
            {btnText}
          </BaseButton>
        </div>
      </BaseCard>
    </>
  )
}
