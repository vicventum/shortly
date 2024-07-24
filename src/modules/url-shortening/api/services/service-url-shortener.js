const shortUrl = async (provider, options) => {
  const { signal = null, payload } = options

  const data = await provider({ signal, payload })

  return data
}

const getUrlShortenedList = async (provider, options) => {
  const { signal = null } = options

  const data = await provider({ signal })
  // console.log('🚀 ~ Service - getUrlShortenedList ~ data:', data)

  return data
}

const setUrlShortenedList = async (provider, options) => {
  const { signal = null, payload } = options

  await provider({ signal, payload })
}

export { shortUrl, getUrlShortenedList, setUrlShortenedList }
