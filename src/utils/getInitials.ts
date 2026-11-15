const TITLES = new Set(['mr.', 'mr', 'mrs.', 'mrs', 'ms.', 'ms', 'miss', 'dr.', 'dr', 'prof.', 'prof'])

export function getInitials(name?: string): string {
  if (!name || typeof name !== 'string') return ''

  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => !TITLES.has(word.toLowerCase()))

  if (words.length === 0) return ''

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  const firstLetter = words[0].charAt(0)
  const secondLetter = words[1].charAt(0)

  return (firstLetter + secondLetter).toUpperCase()
}
