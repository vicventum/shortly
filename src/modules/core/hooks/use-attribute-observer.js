import { useEffect, useRef } from 'react'

export const useAttributeObserver = (
  targetSelector,
  attributeName,
  onChange
) => {
  const observerRef = useRef(null)

  useEffect(() => {
    const targetNode = document.querySelector(targetSelector)

    if (!targetNode) {
      console.warn(`No element found for selector: ${targetSelector}`)
      return
    }

    const callback = mutationsList => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === attributeName
        ) {
          onChange(mutation.target.getAttribute(attributeName))
        }
      }
    }

    observerRef.current = new MutationObserver(callback)
    observerRef.current.observe(targetNode, {
      attributes: true,
      attributeFilter: [attributeName],
    })

    // Ejecutar onChange inmediatamente con el valor actual del atributo
    onChange(targetNode.getAttribute(attributeName))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [targetSelector, attributeName])
}
