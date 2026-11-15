import { useCallback, useEffect, useState } from 'react'
import { fetchUsers } from '../services/api'
import { User } from '../types/user'

interface UseUsersReturn {
  users: User[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchUsers(controller.signal)
        setUsers(data)
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data pengguna.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      controller.abort()
    }
  }, [retryCount])

  const refetch = useCallback(() => {
    setRetryCount((prev) => prev + 1)
  }, [])

  return { users, isLoading, error, refetch }
}
