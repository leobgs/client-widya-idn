import { User } from '../types/user'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, { signal })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}
