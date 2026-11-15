import { User } from '../types/user'

export function filterUsers(users: User[] = [], query: string = ''): User[] {
  if (!Array.isArray(users)) return []

  const trimmedQuery = query.trim().toLowerCase()

  if (!trimmedQuery) {
    return users
  }

  return users.filter((user) => {
    if (!user) return false

    const name = (user.name || '').toLowerCase()
    const email = (user.email || '').toLowerCase()

    return name.includes(trimmedQuery) || email.includes(trimmedQuery)
  })
}
