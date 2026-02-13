# Four-Sided Triangle — Frontend

React + TypeScript frontend built with Vite, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** — dev server & build tool
- **Tailwind CSS v4** — utility-first styling
- **shadcn/ui** (New York style) — component library
- **Lucide React** — icons
- **ESLint** — linting

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/fugeretrevin/four-sided-triangle.git
cd four-sided-triangle/frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server with HMR       |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
```

Components are installed to `src/components/ui/`. See [shadcn/ui docs](https://ui.shadcn.com) for the full component list.

## Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, SVGs
│   ├── components/     # React components
│   │   └── ui/         # shadcn/ui components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (cn helper, etc.)
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles & Tailwind
├── components.json     # shadcn/ui config
├── vite.config.ts      # Vite config
└── tsconfig.json       # TypeScript config
```

## Path Aliases

`@/` is aliased to `./src/` so you can import like:

```tsx
import { cn } from "@/lib/utils";
```
