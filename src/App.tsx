import { useDeferredValue, useMemo, useState } from 'react'
import { useUsers } from './hooks/useUsers'
import { filterUsers } from './utils/filterUsers'
import { User } from './types/user'
import SearchBar from './components/users/SearchBar'
import UserList from './components/users/UserList'
import UserModal from './components/users/UserModal'
import ErrorMessage from './components/users/ErrorMessage'
import EmptyState from './components/users/EmptyState'

export default function App() {
  const { users, isLoading, error, refetch } = useUsers()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const deferredQuery = useDeferredValue(searchQuery)

  const filteredUsers = useMemo(() => {
    return filterUsers(users, deferredQuery)
  }, [users, deferredQuery])

  const isSearchEmpty =
    !isLoading && !error && filteredUsers.length === 0 && searchQuery.trim() !== ''

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                User Dashboard
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-500">
                Temukan dan tinjau profil lengkap pengguna secara realtime.
              </p>
            </div>

            <div className="w-full md:max-w-md">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                disabled={isLoading || Boolean(error)}
                resultCount={filteredUsers.length}
                total={users.length}
              />
            </div>
          </div>
        </header>

        <main id="main-content">
          {error ? (
            <ErrorMessage onRetry={refetch} />
          ) : isSearchEmpty ? (
            <EmptyState query={searchQuery} />
          ) : (
            <UserList
              users={filteredUsers}
              isLoading={isLoading}
              onSelect={setSelectedUser}
            />
          )}
        </main>
      </div>

      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  )
}
