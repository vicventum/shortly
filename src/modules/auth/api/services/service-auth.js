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

const verifySession = async (verifyProvider, refreshProvider, options = {}) => {
  const { signal = null, accessToken, refreshToken, onTokenRefreshed } = options

  if (!accessToken || !refreshToken) {
    throw new Error('No tokens provided')
  }

  try {
    // Try to verify the current access token
    const data = await verify(verifyProvider, {
      signal,
      payload: { accessToken },
    })
    return data
  } catch {
    // If verification fails, attempt to refresh
    console.log('Access token expired or invalid, attempting refresh...')

    const refreshData = await refresh(refreshProvider, {
      signal,
      payload: { refreshToken },
    })

    const newAccessToken = refreshData.accessToken

    // Notify caller about the new token so it can be persisted
    if (onTokenRefreshed) {
      onTokenRefreshed(newAccessToken)
    }

    // Verify again with the new token
    const data = await verify(verifyProvider, {
      signal,
      payload: { accessToken: newAccessToken },
    })
    return data
  }
}

export { login, register, refresh, verify, logout, verifySession }
