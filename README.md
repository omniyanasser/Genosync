# 🧬 GenoSync — DNA Matching System for Shelters

> **Reuniting lost children with their families through DNA science.**

**GenoSync** is an Arabic-first (RTL) web platform that helps orphanages and care homes reunite unidentified children with their parents. Orphanages register children and upload their DNA profiles, parents of missing children do the same — and GenoSync's STR-based matching engine compares every parent against every child to surface confirmed genetic matches in an admin dashboard.

> نظام مطابقة حمض نووي للملاجئ — لمّ شمل الأطفال المفقودين بعائلاتهم 💙

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| ⚛️ Framework | [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev) |
| 🔷 Language | [TypeScript 5](https://www.typescriptlang.org) (strict mode) |
| 🔥 Database | [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) |
| 🎨 Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config) + `tw-animate-css` |
| 🧩 UI Components | [shadcn/ui](https://ui.shadcn.com) (Radix Nova style) + [Radix UI](https://www.radix-ui.com) |
| 🖼️ Icons | [Lucide React](https://lucide.dev) |
| 🔔 Notifications | [Sonner](https://sonner.emilkowal.ski) toast notifications (RTL) |
| 🔤 Fonts | Geist & Geist Mono via `next/font` |
| ✅ Linting | ESLint 9 (Next.js flat config) |

---

## ✨ Key Features

- 🏠 **Orphanage Portal** (`/orphanage`) — Register unidentified children with a name/temporary code, approximate age, and location found, then upload their DNA profile as a `.json` file.
- 👨‍👩‍👧 **Parents Portal** (`/parents`) — Parents of missing children register their details (name, expected child age, location where the child was lost) and upload their own DNA profile.
- 🧬 **Smart STR Matching Engine** — A deterministic Short Tandem Repeat (STR) algorithm compares alleles across genetic loci. A locus counts as matched when parent and child share at least one repeat value, and a pair is flagged as a **confirmed match at ≥ 92% similarity** (tolerance built in for rare mutations). Optimized with `Map`-based O(1) locus lookups.
- 📊 **Admin Dashboard** (`/dashboard`) — One-click scan of the entire cloud database that cross-matches every parent × child pair, with live stat cards (total children, total parents, matches found), a results table with match-percentage badges, and detailed **locus-by-locus match reports**.
- ☁️ **Cloud-Synced Data** — All records are stored in Firestore (`children` and `parents` collections) with server timestamps, so every portal stays in sync in real time.
- 🌍 **Arabic-First, RTL UI** — Fully right-to-left interface built for Arabic-speaking users, with accessible shadcn/ui components and instant toast feedback.
- 🌓 **Dark Mode Ready** — Theme tokens defined in oklch with a dark-mode variant via `next-themes`.

---

## ⚙️ Installation & Setup

### 📋 Prerequisites

- **Node.js 20+** and **npm**
- A **Firebase project** with **Cloud Firestore** enabled

### 🚀 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/<your-username>/dna-matching-system.git
cd dna-matching-system/Genosync
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure Firebase**

Update the Firebase configuration in `lib/firebase.ts` with your own project credentials (from **Firebase Console → Project Settings → Your apps**):

```ts
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};
```

> 💡 **Tip:** For production, move these values into `NEXT_PUBLIC_*` environment variables in a `.env.local` file (already covered by `.gitignore`).

**4. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

### 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | 🔧 Start the development server |
| `npm run build` | 📦 Create an optimized production build |
| `npm run start` | 🚀 Serve the production build |
| `npm run lint` | 🧹 Run ESLint checks |

---

## 🧪 DNA Profile Format

Uploaded DNA files must be valid JSON — either a raw array of loci or wrapped in a `dna_profile` key:

```json
{
  "dna_profile": [
    { "locus": "D3S1358", "repeats": [15, 17] },
    { "locus": "vWA",     "repeats": [16, 18] },
    { "locus": "FGA",     "repeats": [21, 24] }
  ]
}
```

Each entry represents an STR **locus** and the individual's two **allele repeat counts** at that locus.

---

## 📁 Project Structure

```
Genosync/
├── app/
│   ├── page.tsx              # 🏡 Landing page (Hero + Features)
│   ├── dashboard/page.tsx    # 📊 Admin dashboard — scan & match
│   ├── orphanage/page.tsx    # 🏠 Orphanage portal — register children
│   ├── parents/page.tsx      # 👨‍👩‍👧 Parents portal — register parents
│   └── globals.css           # 🎨 Tailwind v4 theme (oklch tokens)
├── components/
│   ├── ui/                   # 🧩 shadcn/ui primitives
│   └── Home/                 # 🖼️ Hero & Features sections
├── lib/
│   ├── firebase.ts           # 🔥 Firebase / Firestore initialization
│   └── utils.ts              # 🔧 cn() class helper
└── utils/
    └── dnaMatching.ts        # 🧬 Core STR matching algorithm
```

---

## 🗺️ Roadmap

- 🔐 Authentication & role-based access for the admin dashboard
- 📱 Instant notifications to parents when a match is confirmed
- 🌐 English localization alongside Arabic

---

## 📄 License

This project is currently unlicensed. All rights reserved.

---

<div align="center">

**© 2026 GenoSync** — نظام مطابقة حمض نووي للملاجئ

Made with ❤️ to bring families back together

</div>
