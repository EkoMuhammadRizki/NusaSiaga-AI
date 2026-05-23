# NusaSiaga AI

Clickable prototype platform AI Disaster Intelligence untuk Indonesia — frontend only.

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- Framer Motion
- Recharts
- Radix UI (shadcn-style components)
- Lucide React

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Alur UX Demo

1. **Landing** (`/`) — hero, fitur, preview command center
2. **Login** (`/login`) — pilih peran → Masuk Dashboard
3. **Dashboard** (`/dashboard`) — klik wilayah di peta → panel detail risiko
4. **Simulasi** (`/dashboard/simulation`) — slider + digital twin
5. **Alert** (`/dashboard/alerts`) — approve/kirim channel simulasi
6. **Laporan** (`/dashboard/reports`) — upload foto + feed warga
7. **Data** (`/dashboard/data`) — monitoring sumber data

Tidak ada backend atau autentikasi nyata.
