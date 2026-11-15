interface SearchBarProps {
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
  resultCount?: number
  total?: number
}

export default function SearchBar({
  value = '',
  onChange,
  disabled = false,
  resultCount = 0,
  total = 0,
}: SearchBarProps) {
  const hasValue = Boolean(value && value.length > 0)

  return (
    <div className="w-full space-y-2">
      <div className="relative flex items-center">
        <label htmlFor="search-user-input" className="sr-only">
          Cari nama atau email pengguna
        </label>

        <div
          className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <input
          id="search-user-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Cari nama atau email..."
          className="w-full pl-11 pr-11 py-3 text-sm text-slate-800 bg-white border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition"
        />

        {hasValue && !disabled && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer"
            aria-label="Hapus kata kunci pencarian"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {!disabled && total > 0 && (
        <p
          className="text-xs text-slate-500 font-medium px-1"
          aria-live="polite"
        >
          Menampilkan <span className="font-semibold text-slate-700">{resultCount}</span> dari{' '}
          <span className="font-semibold text-slate-700">{total}</span> user
        </p>
      )}
    </div>
  )
}
