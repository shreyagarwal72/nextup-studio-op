# Nextup Studio

Website for **Nextup Studio** — video editing, music production and gaming content by Vanshu Agarwal.

Live: https://nextup-studio.vercel.app

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router · EmailJS (contact form) · Supabase edge function (AI assistant)

## Develop

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
npm run preview
```

## Design system

Tokens live in `src/index.css` (HSL) and are mapped in `tailwind.config.ts`.

| Token | Use |
|---|---|
| `--primary` | Violet brand color, buttons and focus |
| `--signal` | Coral "playhead" accent |
| `--lane-video` / `--lane-music` / `--lane-game` | Timeline lane colors |

Fonts: Bricolage Grotesque (headings) and Figtree (body), loaded in `index.html`.

## Structure

- `src/components/` — Navigation, Hero, HeroTimeline, About, Services, Portfolio, Contact, Footer
- `src/pages/` — Index, AIAssistant (`/ai`), NotFound
- `supabase/functions/chat` — streaming chat endpoint (deploy after changes)

© Nextup Studio. All rights reserved.
