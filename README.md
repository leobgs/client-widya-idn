# User Dashboard

## Tech Stack

- React 18
- TypeScript (Strict Mode)
- Vite
- TailwindCSS v4
- Native Fetch API + AbortController
- Oxlint

---

## Cara Menjalankan Proyek

### Prasyarat

- Node.js versi 20 atau lebih baru
- npm

### Menjalankan di Lokal

1. Pasang dependensi:

   ```bash
   npm install
   ```

2. Jalankan mode pengembangan:

   ```bash
   npm run dev
   ```

3. Jalankan build produksi:

   ```bash
   npm run build
   ```

4. Jalankan preview hasil build:

   ```bash
   npm run preview
   ```

5. Jalankan pemeriksaan linter:
   ```bash
   npm run lint
   ```

---

## Struktur Folder

```text
src/
├── components/
│   ├── ui/                    # Komponen antarmuka generik
│   │   ├── Modal.tsx          # Modal dialog berbasis native <dialog>
│   │   └── Skeleton.tsx       # Placeholder skeleton loader
│   └── users/                 # Komponen khusus domain user
│       ├── EmptyState.tsx     # Tampilan saat hasil cari kosong
│       ├── ErrorMessage.tsx   # Tampilan pesan error dan tombol retry
│       ├── SearchBar.tsx      # Komponen input pencarian
│       ├── UserCard.tsx       # Kartu ringkasan pengguna (React.memo)
│       ├── UserCardSkeleton.tsx # Skeleton kartu saat pemuatan data
│       ├── UserList.tsx       # Grid kontainer daftar kartu
│       └── UserModal.tsx      # Modal detail profil, alamat, dan perusahaan
├── hooks/
│   ├── useDebounce.ts         # Hook debounce nilai
│   └── useUsers.ts            # Hook fetching, loading, error, dan abort
├── services/
│   └── api.ts                 # Service pemanggilan API
├── types/
│   └── user.ts                # Definisi interface TypeScript
├── utils/
│   ├── filterUsers.ts         # Utilitas filter pencarian pengguna
│   └── getInitials.ts         # Utilitas pembuat inisial nama
├── App.tsx                    # Komponen utama aplikasi
├── index.css                  # Style TailwindCSS
├── main.tsx                   # Entry point React
└── vite-env.d.ts              # Deklarasi tipe Vite
```

---

## Pertanyaan Pemahaman

### 1. State Management dan Lifecycle

> **Bagaimana pengambilan data diatur menggunakan hooks dan bagaimana mencegah infinite loop serta memory leak?**

Pengambilan data diatur di dalam custom hook `useUsers` agar logika fetching terpisah dari komponen presentasi.

- Pencegahan Infinite Loop:
  - Pemanggilan API dilakukan di dalam `useEffect` dengan dependency array `[retryCount]`.
  - Efek hanya berjalan saat mount pertama dan saat fungsi `refetch()` dipanggil.
  - State diperbarui di dalam callback efek samping, bukan di body render.
  - Hasil pencarian tidak disimpan di state baru, melainkan dihitung sebagai derived state menggunakan `useMemo` berdasarkan `users` dan query pencarian.

- Pencegahan Memory Leak:
  - Menggunakan `AbortController` bawaan peramban. Sinyal pembatalan (`controller.signal`) diteruskan ke pemanggilan `fetch`.
  - Pada cleanup function `useEffect`, `controller.abort()` dipanggil sehingga request dibatalkan jika komponen unmount sebelum respon selesai.
  - Error bertipe `AbortError` diabaikan sehingga tidak memicu update state pada komponen yang sudah tidak aktif.

---

### 2. Struktur Folder

> **Mengapa struktur folder dibagi menjadi `ui/` vs `users/`, `hooks/`, `services/`, dan `utils/`?**

Pemisahan ini membagi tanggung jawab kode secara modular:

1. `components/ui/` vs `components/users/`:
   - `components/ui/` berisi komponen generik murni (seperti `Modal.tsx` dan `Skeleton.tsx`) yang tidak bergantung pada model data user sehingga dapat digunakan kembali pada fitur lain.
   - `components/users/` berisi komponen spesifik domain user yang merender informasi nama, kontak, perusahaan, dan kartu user.
2. `services/`:
   - Mengisolasi pemanggilan endpoint HTTP ke satu tempat (`api.ts`). Jika terjadi perubahan URL atau mekanisme request, komponen lain tidak perlu diubah.
3. `hooks/`:
   - Mengisolasi stateful logic (fetching, status loading, error, debounce) agar komponen UI tetap ringkas dan fokus pada tampilan.
4. `utils/`:
   - Berisi fungsi murni tanpa state React (`filterUsers.ts`, `getInitials.ts`) yang deterministik dan mudah diuji secara independen.
5. `types/`:
   - Menampung deklarasi tipe data TypeScript agar struktur objek konsisten di seluruh aplikasi.

---

### 3. Optimasi untuk 10.000 Data

> **Bagaimana aplikasi tetap responsif jika data pengguna bertambah dari 10 menjadi 10.000 data?**

Pada 10.000 data, proses pemfilteran array di JavaScript berlangsung cepat (~1ms), namun rendering ribuan elemen DOM secara bersamaan akan membebani thread browser. Langkah optimasi yang disiapkan:

1. Concurrent React dengan `useDeferredValue`:
   - State input teks (`searchQuery`) diperbarui langsung dengan prioritas tinggi agar ketikan tidak lag.
   - Nilai query untuk filter ditunda menggunakan `useDeferredValue` sehingga rendering hasil pencarian dijalankan dengan prioritas sekunder tanpa memblokir input user.
2. Memoisasi:
   - `useMemo` digunakan untuk mencegah filter dihitung ulang saat state yang tidak relevan berubah.
   - `React.memo` diterapkan pada `UserCard` agar kartu yang datanya tidak berubah tidak ikut dirender ulang.
3. List Virtualization:
   - Menerapkan pustaka seperti `@tanstack/react-virtual` atau `react-window` untuk hanya merender elemen yang tampak di viewport layar (~15-20 item), bukan 10.000 elemen sekaligus di DOM.
4. Debounce:
   - Memakai `useDebounce` untuk menunda eksekusi filter hingga user selesai mengetik (jika diperlukan pencarian yang lebih berat atau server-side).
5. Pagination atau Server-Side Search:
   - Untuk data skala besar di aplikasi nyata, data dibagi per halaman atau pencarian diserahkan ke query database backend.
