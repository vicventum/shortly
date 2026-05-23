const updateProfile = async (provider, options) => {
  const { signal = null, payload } = options
  return await provider({ signal, payload })
}

export { updateProfile }
