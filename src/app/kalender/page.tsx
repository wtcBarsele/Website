export const metadata = { title: 'Kalender' };

export default function KalenderPage() {
  return (
    <>
      <section className="bg-barsele-mist">
        <div className="container-page py-16">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
            Ritten en activiteiten
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Kalender</h1>
          <p className="mt-4 max-w-2xl text-barsele-ink/80">
            Bekijk de geplande ritten. Inschrijven kan na inloggen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/api/calendar.ics" className="btn-secondary">
              Abonneer (iCal)
            </a>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="card p-10 text-center">
          <h2 className="text-xl font-semibold">In opbouw</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-barsele-ink/70">
            De kalender komt online zodra fase 3 (ritten, GPX, inschrijven en
            iCal-feed) is afgewerkt. Je kunt deze pagina dan abonneren in je
            agenda-app.
          </p>
        </div>
      </section>
    </>
  );
}
