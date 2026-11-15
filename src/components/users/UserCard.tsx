import React from 'react'
import { User } from '../../types/user'
import { getInitials } from '../../utils/getInitials'

const AVATAR_COLORS = [
  'bg-blue-600 text-white',
  'bg-emerald-600 text-white',
  'bg-violet-600 text-white',
  'bg-amber-600 text-white',
  'bg-rose-600 text-white',
  'bg-indigo-600 text-white',
  'bg-teal-600 text-white',
  'bg-cyan-600 text-white',
]

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

function UserCard({ user, onSelect }: UserCardProps) {
  if (!user) return null

  const initials = getInitials(user.name)
  const colorIndex = (user.id || 0) % AVATAR_COLORS.length
  const avatarColorClass = AVATAR_COLORS[colorIndex]

  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      className="group relative flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
      aria-label={`Lihat detail pengguna ${user.name}`}
    >
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shrink-0 shadow-sm ${avatarColorClass}`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors text-base truncate">
              {user.name}
            </h3>
            <p className="text-xs text-slate-500 truncate">
              @{user.username}
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-slate-400 shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span className="truncate">{user.email || '-'}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-slate-400 shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.75c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>
            <span className="truncate">{user.company?.name || '-'}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 flex items-center justify-between text-xs text-indigo-600 font-medium group-hover:translate-x-0.5 transition-transform">
        <span>Lihat detail</span>
        <span aria-hidden="true">&rarr;</span>
      </div>
    </button>
  )
}

export default React.memo(UserCard)
