const getLinks = async (provider, options) => {
  const { signal = null, payload } = options
  return await provider({ signal, payload })
}

const getLinkStats = async (provider, options = {}) => {
  const { signal = null } = options
  return await provider({ signal })
}

const createLink = async (provider, options) => {
  const { signal = null, payload } = options
  return await provider({ signal, payload })
}

const updateLink = async (provider, options) => {
  const { signal = null, payload } = options
  return await provider({ signal, payload })
}

const deleteLink = async (provider, options) => {
  const { signal = null, payload } = options
  return await provider({ signal, payload })
}

export { getLinks, getLinkStats, createLink, updateLink, deleteLink }
