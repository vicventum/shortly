// Simulated delay to mimic network request
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const loginUser = async ({ payload }) => {
  await delay(800)
  const { email, password } = payload

  // Retrieve users from local storage
  const users = JSON.parse(window.localStorage.getItem('shortly.users') || '[]')
  
  const user = users.find((u) => u.email === email && u.password === password)
  
  if (!user) {
    throw new Error('Invalid email or password')
  }

  // Generate mock tokens
  const accessToken = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 15 * 60 * 1000 })) // 15 mins
  const refreshToken = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })) // 7 days
  
  // Exclude password from the returned user object
  const { password: _, ...userWithoutPassword } = user

  return { user: userWithoutPassword, accessToken, refreshToken }
}

const registerUser = async ({ payload }) => {
  await delay(800)
  const { name, email, password, role } = payload

  const users = JSON.parse(window.localStorage.getItem('shortly.users') || '[]')
  
  if (users.some((u) => u.email === email)) {
    throw new Error('Email is already registered')
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    role: role || 'user',
  }

  users.push(newUser)
  window.localStorage.setItem('shortly.users', JSON.stringify(users))

  // Generate mock tokens
  const accessToken = btoa(JSON.stringify({ userId: newUser.id, role: newUser.role, exp: Date.now() + 15 * 60 * 1000 }))
  const refreshToken = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }))

  const { password: _, ...userWithoutPassword } = newUser

  return { user: userWithoutPassword, accessToken, refreshToken }
}

const refreshAccessToken = async ({ payload }) => {
  await delay(500)
  const { refreshToken } = payload

  if (!refreshToken) {
    throw new Error('No refresh token provided')
  }

  try {
    const tokenData = JSON.parse(atob(refreshToken))
    if (Date.now() > tokenData.exp) {
      throw new Error('Refresh token expired')
    }

    const users = JSON.parse(window.localStorage.getItem('shortly.users') || '[]')
    const user = users.find((u) => u.id === tokenData.userId)

    if (!user) {
      throw new Error('User not found')
    }

    const newAccessToken = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 15 * 60 * 1000 }))
    return { accessToken: newAccessToken }
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}

const verifyToken = async ({ payload }) => {
  await delay(300)
  const { accessToken } = payload

  if (!accessToken) {
    throw new Error('No access token provided')
  }

  try {
    const tokenData = JSON.parse(atob(accessToken))
    if (Date.now() > tokenData.exp) {
      throw new Error('Access token expired')
    }

    const users = JSON.parse(window.localStorage.getItem('shortly.users') || '[]')
    const user = users.find((u) => u.id === tokenData.userId)

    if (!user) {
      throw new Error('User not found')
    }

    const { password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword }
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

const logoutUser = async () => {
    await delay(300)
    // In a real app we might invalidate tokens on the server
    return { success: true }
}

export { loginUser, registerUser, refreshAccessToken, verifyToken, logoutUser }
