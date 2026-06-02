export function groupLinksByDate(links = []) {
  if (!Array.isArray(links)) return []

  // Ensure descending order by date
  const sortedLinks = [...links].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const grouped = sortedLinks.reduce((acc, link) => {
    if (!link.createdAt) return acc
    
    const linkDate = new Date(link.createdAt)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let dateLabel = ''
    if (linkDate.toDateString() === today.toDateString()) {
      dateLabel = 'Today'
    } else if (linkDate.toDateString() === yesterday.toDateString()) {
      dateLabel = 'Yesterday'
    } else {
      // Format: "Monday, April 13"
      const options = { weekday: 'long', day: 'numeric', month: 'long' }
      dateLabel = linkDate.toLocaleDateString('en-US', options)
      // Capitalize first letter of each word
      dateLabel = dateLabel.replace(/\b\w/g, l => l.toUpperCase())
    }

    if (!acc[dateLabel]) {
      acc[dateLabel] = {
        dateLabel,
        totalLinks: 0,
        links: []
      }
    }

    acc[dateLabel].links.push(link)
    acc[dateLabel].totalLinks += 1

    return acc
  }, {})

  return Object.values(grouped)
}

export function formatTime(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
