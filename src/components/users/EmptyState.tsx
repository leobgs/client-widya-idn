interface EmptyStateProps {
  query: string
}

export default function EmptyState({ query }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="max-w-md mx-auto my-12 p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-sm"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-slate-800 mb-1">
        Tidak ada user yang cocok dengan &quot;{query}&quot;
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed">
        Coba periksa ejaan atau gunakan kata kunci lain (misalnya nama depan atau domain email).
      </p>
    </div>
  )
}
