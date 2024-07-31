import { useEffect } from 'react'

const useThemeObserver = callback => {
  useEffect(() => {
    const targetNode = document.querySelector('html')
    if (!targetNode) return

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          callback(mutation.target.getAttribute('data-theme'))
        }
      }
    })

    observer.observe(targetNode, { attributes: true })

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect()
    }
  }, [callback])
}

export default useThemeObserver
