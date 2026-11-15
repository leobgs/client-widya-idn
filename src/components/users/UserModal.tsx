import { User } from "../../types/user";
import Modal from "../ui/Modal";
import { getInitials } from "../../utils/getInitials";

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null;

  const initials = getInitials(user.name);

  return (
    <Modal isOpen={Boolean(user)} onClose={onClose} title="Detail Pengguna">
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div
          className="w-14 h-14 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-slate-900 truncate">
            {user.name}
          </h3>
          <p className="text-sm text-slate-500 truncate">
            @{user.username || "-"}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-indigo-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Kontak & Profil
        </h4>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-white rounded-lg border border-slate-100">
            <dt className="text-xs text-slate-400 font-medium">Email</dt>
            <dd className="mt-1 font-medium text-slate-800 truncate">
              {user.email ? (
                <a
                  href={`mailto:${user.email}`}
                  className="text-indigo-600 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 rounded"
                >
                  {user.email}
                </a>
              ) : (
                "-"
              )}
            </dd>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-100">
            <dt className="text-xs text-slate-400 font-medium">Telepon</dt>
            <dd className="mt-1 font-medium text-slate-800 truncate">
              {user.phone ? (
                <a
                  href={`tel:${user.phone}`}
                  className="text-indigo-600 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 rounded"
                >
                  {user.phone}
                </a>
              ) : (
                "-"
              )}
            </dd>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-100 sm:col-span-2">
            <dt className="text-xs text-slate-400 font-medium">Website</dt>
            <dd className="mt-1 font-medium text-slate-800 truncate">
              {user.website ? (
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 rounded"
                >
                  {user.website}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              ) : (
                "-"
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-indigo-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          Alamat
        </h4>
        <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 text-sm space-y-1.5">
          <p className="font-medium text-slate-800">
            {[user.address?.street, user.address?.suite]
              .filter(Boolean)
              .join(", ") || "-"}
          </p>
          <p className="text-slate-600">
            {[user.address?.city, user.address?.zipcode]
              .filter(Boolean)
              .join(", ") || "-"}
          </p>
          {user.address?.geo &&
            (user.address.geo.lat || user.address.geo.lng) && (
              <p className="text-xs text-slate-400 font-mono pt-1">
                Koordinat: {user.address.geo.lat}, {user.address.geo.lng}
              </p>
            )}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-indigo-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.75c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
            />
          </svg>
          Perusahaan
        </h4>
        <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 text-sm space-y-1">
          <p className="font-semibold text-slate-900">
            {user.company?.name || "-"}
          </p>
          {user.company?.catchPhrase && (
            <p className="text-xs text-indigo-600 italic">
              &ldquo;{user.company.catchPhrase}&rdquo;
            </p>
          )}
          {user.company?.bs && (
            <p className="text-xs text-slate-500">{user.company.bs}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
