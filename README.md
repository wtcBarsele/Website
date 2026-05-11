# WTC Barsele — clubwebsite

Moderne website + ledenportaal voor wielerclub WTC Barsele.
Gebouwd met **Next.js 15**, **Supabase**, **Tailwind CSS** en wordt gedeployed op **Vercel**.

---

## Wat zit hier al in (fase 1)

- ✅ Volledige Next.js-projectstructuur
- ✅ Tailwind ingesteld met de Barsele-kleuren (blauw + zwart + licht)
- ✅ Responsieve header met mobiel menu, en footer
- ✅ Pagina's: Home, Lid worden, Saeftinghe Classic, Activiteiten, Kalender (placeholder), Inloggen (placeholder)
- ✅ Supabase database-schema klaar in `supabase/schema.sql` (nog niet actief)
- ✅ Voorbereide clientbestanden voor login (`src/lib/supabase-*.ts`)

Wat **nog moet** komen (fase 2-4): login, smoelenboek, ritten, GPX-upload, inschrijven, iCal-feed, Barsele Challenge klassement.

---

## Stap 1 — Lokaal draaien

### Voor je begint

Installeer eerst:

1. **Node.js** (versie 20 of hoger) → https://nodejs.org
2. **Git** → https://git-scm.com
3. **Visual Studio Code** → https://code.visualstudio.com
4. Een **GitHub-account** → https://github.com (gratis)

In VS Code raad ik deze extensies aan (allemaal gratis):
- **ESLint** — pakt fouten in je JavaScript/TypeScript op
- **Prettier** — houdt je code netjes geformatteerd
- **Tailwind CSS IntelliSense** — autocomplete voor de Tailwind klassen
- **GitLens** — handig overzicht van Git in VS Code

### Project aan de praat krijgen

Open een terminal in de projectmap en draai:

```bash
npm install
npm run dev
```

Open dan in je browser: http://localhost:3000

Je ziet de homepagina met de Barsele-kleuren. Probeer de menu's, klik door naar Lid worden, Saeftinghe Classic, etc.

> **Pro tip:** Elke keer dat je een bestand aanpast, herlaadt de pagina vanzelf. Geen herstart nodig.

---

## Stap 2 — Op GitHub zetten

1. Maak een nieuwe **lege repository** op github.com (bv. `wtc-barsele-site`). Maak hem **privé** voor nu.
2. In je terminal in de projectmap:

```bash
git init
git add .
git commit -m "Initiële opzet — fase 1 publieke pagina's"
git branch -M main
git remote add origin https://github.com/JOUW-USER/wtc-barsele-site.git
git push -u origin main
```

---

## Stap 3 — Online zetten met Vercel

1. Ga naar https://vercel.com en maak een account met je GitHub-login.
2. Klik **Add New → Project** en kies je `wtc-barsele-site` repository.
3. Vercel detecteert vanzelf dat het Next.js is. Klik **Deploy**.
4. Na een minuut of twee staat je site online op een `*.vercel.app` URL.

Elke `git push` naar GitHub vanaf nu zet automatisch een nieuwe versie live. Pull requests krijgen automatisch hun eigen preview-URL — handig om iets te testen voor je het naar productie pusht.

> **Eigen domein later:** zodra je www.wtcbarsele.be of een nieuw domein wil koppelen, kan dat in Vercel onder **Settings → Domains**.

---

## Mappenstructuur

```
wtc-barsele/
├── src/
│   ├── app/                    # De pagina's (file = URL in Next.js)
│   │   ├── page.tsx            # → '/'         (Home)
│   │   ├── layout.tsx          # Root layout (header/footer rond elke pagina)
│   │   ├── globals.css         # Tailwind + globale stijlen
│   │   ├── lidmaatschap/page.tsx       # → '/lidmaatschap'
│   │   ├── saeftinghe-classic/page.tsx # → '/saeftinghe-classic'
│   │   ├── activiteiten/page.tsx       # → '/activiteiten'
│   │   ├── kalender/page.tsx           # → '/kalender' (placeholder)
│   │   ├── login/page.tsx              # → '/login'    (placeholder)
│   │   ├── leden/                      # (fase 2: smoelenboek)
│   │   ├── sponsors/                   # (fase 2: sponsors)
│   │   └── account/                    # (fase 2: profielbeheer)
│   ├── components/             # Herbruikbare blokjes (header, footer, ...)
│   └── lib/                    # Helpers (supabase clients)
├── public/                     # Statische bestanden (logo, foto's)
├── supabase/
│   └── schema.sql              # Database-opzet voor fase 2 (nog niet draaien)
├── tailwind.config.ts          # Kleurenpalet en design-tokens
├── package.json                # Welke pakketten gebruikt worden
├── .env.example                # Voorbeeld environment variables
└── README.md                   # Dit bestand
```

---

## De fasering — wat komt er nog

### ✅ Fase 1 — Publieke schil (HUIDIG)
Home, Lid worden, Saeftinghe Classic, Activiteiten, kalender-placeholder.
Geen login, geen database. Alles is statisch en snel.

### Fase 2 — Login en leden
1. Supabase project aanmaken op https://supabase.com (gratis tier volstaat).
2. `supabase/schema.sql` plakken in **SQL Editor** en uitvoeren — dat maakt alle tabellen + RLS-policies aan.
3. `.env.example` kopiëren naar `.env.local` en de echte waarden invullen.
4. Login implementeren (mail + wachtwoord), registratie, profielpagina (foto, bio, team-voorkeuren), smoelenboek, admin-paneel voor goedkeuring + rol toekennen. Sponsors-beheer (admin kan logo's en links toevoegen — de pagina zelf is publiek zichtbaar).

### Fase 3 — Kalender en ritten
- Pagina voor kalenderbeheerders om ritten aan te maken (titel, datum, team, GPX-bestand, beschrijving, deel-van-challenge ja/nee).
- Kalenderoverzicht met filtering per team.
- In- en uitschrijven door leden.
- **iCal-feed**: een `/api/calendar.ics` route die alle ritten teruggeeft in iCalendar-formaat. Leden kunnen die URL in hun agenda-app (Google, Apple, Outlook) plakken via "Abonneren op kalender" en krijgen elke nieuwe rit automatisch in hun agenda.
- GPX-bestanden via Supabase Storage.

### Fase 4 — Barsele Challenge
- Klassementen op aantal gereden ritten en op kilometers.
- Filter op alleen "challenge"-ritten.

### Fase 5 (later) — Webshop voor clubkledij
Niet in scope nu.

---

## Het kleurenpalet

Alle kleuren staan in `tailwind.config.ts` onder `barsele.*`. Gebruik ze in je JSX zoals:

```jsx
<div className="bg-barsele-blue-700 text-white">...</div>
<p className="text-barsele-ink/70">...</p>  {/* /70 = 70% transparantie */}
```

- `barsele-blue-700` is de hoofdaccentkleur (knoppen, links)
- `barsele-blue-950` is heel diep — voor donkere secties
- `barsele-ink` is bijna-zwart — voor tekst
- `barsele-mist` is een rustige lichte achtergrond
- `barsele-cloud` is iets donkerder licht voor kaarten

Pas het palet aan in `tailwind.config.ts` als je een andere blauw wilt.

---

## Veelgestelde vragen tijdens het bouwen

**Q: Wat is een Server Component vs Client Component?**
In Next.js 15 is alles standaard een **Server Component** — die draait op de server en stuurt alleen HTML naar de browser. Sneller, beter voor SEO. Een **Client Component** (met `'use client'` bovenaan) draait in de browser en kan interactief zijn (klikken, formulieren, state). De header is Client (heeft een togglebaar mobiel menu), de meeste pagina's zijn Server.

**Q: Wat is Row Level Security (RLS)?**
Een Supabase-feature waarmee de databank zelf bepaalt wie welke rijen mag zien. Dus zelfs als iemand probeert om buiten je app om data op te vragen, krijgt hij alleen wat hij mag zien volgens de regels in `schema.sql`. Veel veiliger dan checks alleen in je app-code.

**Q: Hoe pas ik iets aan?**
1. Pas het bestand aan in VS Code.
2. Sla op (Ctrl+S).
3. De browser laadt automatisch de nieuwe versie.
4. Wanneer tevreden: `git add . && git commit -m "wat je veranderde" && git push`. Vercel zet het binnen 1 minuut live.

---

## Hulp nodig?

Plak een fout of vraag bij Claude en vraag specifiek welk bestand je moet aanpassen. Bewaar deze README open zodat je hem als referentie hebt.
