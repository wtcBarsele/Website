import Link from 'next/link';

export const metadata = { title: 'Saeftinghe Classic' };

export default function SaeftinghePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-barsele-blue-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 30%, #378add 0%, transparent 50%)',
          }}
        />
        <div className="container-page relative py-20">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-300">
            Jaarlijks evenement
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Saeftinghe Classic
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Een toertocht door het grensgebied van Het Verdronken Land van
            Saeftinghe — polders, dijken en eindeloze horizon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#inschrijven" className="btn-primary">
              Voorinschrijven
            </Link>
            <Link href="#meldingen" className="btn-secondary">
              Hou me op de hoogte
            </Link>
          </div>
        </div>
      </section>

      {/* Foto's placeholder */}
      <section className="container-page py-16">
        <h2 className="text-2xl font-semibold">Sfeer uit de voorbije edities</h2>
        <p className="mt-2 text-barsele-ink/70">
          Een impressie van de polders, de groep en de aankomst.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gradient-to-br from-barsele-blue-100 to-barsele-blue-300"
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-barsele-ink/50">
          Foto&apos;s worden geladen uit Supabase Storage zodra fase 2 actief is.
        </p>
      </section>

      {/* Voorbije edities */}
      <section className="bg-barsele-mist">
        <div className="container-page py-16">
          <h2 className="text-2xl font-semibold">Voorbije edities</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <EditieCard year="2024" subtitle="Vijfde editie" body="Mooi weer, recordopkomst." />
            <EditieCard year="2023" subtitle="Vierde editie" body="Tegenwind in de polder, sfeer aan de toog." />
            <EditieCard year="2022" subtitle="Derde editie" body="Eerste editie post-corona, alles uitverkocht." />
          </div>
        </div>
      </section>

      {/* Inschrijven */}
      <section id="inschrijven" className="container-page py-16">
        <div className="card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-barsele-blue-700 p-10 text-white">
              <h2 className="font-display text-3xl font-semibold">Volgende editie</h2>
              <p className="mt-3 text-white/85">
                De voorinschrijving voor de volgende Saeftinghe Classic opent
                binnenkort. Reserveer je plaats en krijg een melding zodra de
                inschrijvingen openen.
              </p>
            </div>
            <div className="p-10">
              <p className="text-sm font-medium text-barsele-ink/60">Datum</p>
              <p className="font-display text-2xl font-semibold">Aankondiging volgt</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#" className="btn-primary">Naar voorinschrijving</a>
                <a href="#meldingen" className="btn-secondary">Hou me op de hoogte</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notificatie */}
      <section id="meldingen" className="bg-barsele-ink py-16 text-white">
        <div className="container-page max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold">
            Hou me op de hoogte
          </h2>
          <p className="mt-3 text-white/80">
            Laat je e-mailadres achter en je krijgt als eerste een seintje zodra
            de inschrijvingen openen.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="jouw@email.be"
              className="flex-1 rounded-md border-0 px-4 py-3 text-barsele-ink placeholder:text-barsele-ink/40 focus:outline-none focus:ring-2 focus:ring-barsele-blue-500"
            />
            <button type="submit" className="btn-primary">
              Inschrijven
            </button>
          </form>
          <p className="mt-3 text-xs text-white/50">
            We gebruiken je adres alleen voor Saeftinghe Classic-meldingen.
          </p>
        </div>
      </section>
    </>
  );
}

function EditieCard({ year, subtitle, body }: { year: string; subtitle: string; body: string }) {
  return (
    <div className="card p-6">
      <p className="font-display text-3xl font-semibold text-barsele-blue-800">{year}</p>
      <p className="mt-1 text-sm font-medium uppercase tracking-wider text-barsele-ink/50">
        {subtitle}
      </p>
      <p className="mt-3 text-sm text-barsele-ink/70">{body}</p>
      <a href="#" className="mt-4 inline-block text-sm font-medium text-barsele-blue-700 hover:underline">
        Bekijk editie →
      </a>
    </div>
  );
}
