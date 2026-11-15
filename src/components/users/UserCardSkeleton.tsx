import Skeleton from '../ui/Skeleton'

export default function UserCardSkeleton() {
  return (
    <div
      className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
      aria-hidden="true"
    >
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <Skeleton className="w-12 h-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/3 h-3.5" />
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <Skeleton className="w-4/5 h-3.5" />
          <Skeleton className="w-3/5 h-3.5" />
        </div>
      </div>
    </div>
  )
}
