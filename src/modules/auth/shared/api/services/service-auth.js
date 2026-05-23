const login = async (provider, options) => {
  const { signal = null, payload } = options
  const data = await provider({ signal, payload })
  return data
}

const register = async (provider, options) => {
  const { signal = null, payload } = options
  const data = await provider({ signal, payload })
  return data
}

const refresh = async (provider, options) => {
  const { signal = null, payload } = options
  const data = await provider({ signal, payload })
  return data
}

const verify = async (provider, options) => {
  const { signal = null, payload } = options
  const data = await provider({ signal, payload })
  return data
}

const logout = async (provider, options = {}) => {
  const { signal = null } = options
  const data = await provider({ signal })
  return data
}

export { login, register, refresh, verify, logout }
