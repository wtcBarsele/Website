# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

WTC Barsele — clubwebsite en ledenportaal voor een wielerclub. Gebouwd met **Next.js 15** (App Router), **Supabase**, **Tailwind CSS**, gedeployed op **Vercel**.

## Commands

```bash
npm install       # dependencies installeren
npm run dev       # dev server op http://localhost:3000
npm run build     # productie build
npm run lint      # ESLint
```

## Architecture

### Paginastructuur (Next.js App Router)

Elke map in `src/app/` is een URL-segment. `page.tsx` is de routecomponent, `layout.tsx` wrapt alle pagina's met de `SiteHeader` en `SiteFooter`.

- Standaard: **Server Components** — draaien op de server, sturen HTML.
- Met `'use client'` bovenaan: **Client Components** — draaien in de browser, kunnen state en event handlers gebruiken.
- `SiteHeader` is een Client Component (togglebaar mobiel menu).

### Supabase-clients

Gebruik de juiste client op de juiste plek:

| Bestand | Gebruik |
|---|---|
| `src/lib/supabase-browser.ts` | Client Components (`'use client'`) |
| `src/lib/supabase-server.ts` | Server Components, Server Actions, Route Handlers |

### Styling

Alle klassen zijn Tailwind. Globale utility-klassen staan in `src/app/globals.css`:

- `.container-page` — standaard paginabreedte (max-w-6xl)
- `.btn-primary` — hoofdknop (barsele-blue-700 achtergrond)
- `.btn-secondary` — secundaire knop (wit met border)
- `.card` — witte kaart met schaduw en ring

Kleuren altijd via de `barsele.*`-tokens uit `tailwind.config.ts`:

- `barsele-blue-700` — hoofdaccentkleur (knoppen, links)
- `barsele-blue-950` — donkere secties
- `barsele-ink` — tekst (bijna-zwart `#0e1525`)
- `barsele-mist` — lichte achtergrond
- `barsele-cloud` — iets donkerder licht voor kaarten

Fonts: `font-sans` (Inter) voor bodytekst, `font-display` (Space Grotesk) voor koppen.

### Database (Supabase)

Schema staat in `supabase/schema.sql` — nog niet actief in fase 1. Tabellen:

- `profiles` — ledendata, gekoppeld aan `auth.users`
- `roles` / `user_roles` — rollen: `member`, `admin`, `calendar_admin`, `activity_admin`
- `teams` / `team_preferences` — A-Slow, A, A+, Gravel, MTB
- `rides` / `ride_signups` — ritten in de kalender
- `activities` / `activity_signups` — weekends en uitstappen
- `sponsors` — sponsorgegevens

RLS is actief op alle tabellen. Helper-functies `has_role(role)` en `is_approved_member()` worden gebruikt in policies. Nieuwe leden worden pas zichtbaar na `approved = true` door een admin.

### Omgevingsvariabelen

Kopieer `.env.example` naar `.env.local` en vul in:

```
NEXT_PUBLIC_SUPABASE_URL=https://JOUW-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key
```

Pas nodig vanaf fase 2. In fase 1 draaien alle pagina's zonder database.

### Fasering

- **Fase 1 (huidig):** Statische publieke pagina's, geen login, geen database.
- **Fase 2:** Login, registratie, profielbeheer, smoelenboek, admin-goedkeuring, sponsorbeheer.
- **Fase 3:** Kalender met ritten, in- en uitschrijven, GPX-upload, iCal-feed (`/api/calendar.ics`).
- **Fase 4:** Barsele Challenge klassement.

### Next.js `Image` remote hostnames

Geconfigureerd in `next.config.mjs`: `*.supabase.co` (voor user uploads) en `impro.usercontent.one`.
