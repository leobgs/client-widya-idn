import { User } from '../../types/user'
import UserCard from './UserCard'
import UserCardSkeleton from './UserCardSkeleton'

interface UserListProps {
  users?: User[]
  isLoading?: boolean
  onSelect: (user: User) => void
}

export default function UserList({ users = [], isLoading = false, onSelect }: UserListProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-label="Memuat daftar pengguna"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="region"
      aria-label="Daftar pengguna"
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} onSelect={onSelect} />
      ))}
    </div>
  )
}
