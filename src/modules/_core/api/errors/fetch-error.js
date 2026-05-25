class FetchError extends Error {
  constructor(status, statusText, data) {
    const message = data?.error || data?.message || data?.detail || statusText || 'Fetch Error'
    super(message)
    this.name = 'FetchError'
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

export { FetchError }
