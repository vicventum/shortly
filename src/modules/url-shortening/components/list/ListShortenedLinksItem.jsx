import { useState, useEffect } from 'react'
import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { BaseCard } from '@/modules/core/components/base/BaseCard'
import { BaseDivider } from '@/modules/core/components/base/BaseDivider'

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
      <BaseCard className='items-center justify-between gap-x-4 p-0 text-lg font-semibold md:grid md:grid-cols-[1fr_auto] md:grid-rows-1 md:px-7 md:py-5'>
        <div className='truncate p-4 md:p-0'>
          <span className=''>{url}</span>
        </div>

        <BaseDivider className='px-1 md:hidden' />

        <div className='space-y-3 p-4 md:space-x-6 md:space-y-0 md:p-0'>
          <span className='text-primary'>{urlShortened}</span>

          <BaseButton
            className='w-full md:w-26'
            color={btnBgColor}
            onClick={handleClick}
          >
            {btnText}
          </BaseButton>
        </div>
      </BaseCard>
    </>
  )
}
