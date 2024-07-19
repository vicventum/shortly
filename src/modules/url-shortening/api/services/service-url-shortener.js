const shortUrl = async (provider, options) => {
  const { signal = null, payload } = options

  const data = await provider({ signal, payload })

  return data
}

export { shortUrl }