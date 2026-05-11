import Link from 'next/link';

export const metadata = { title: 'Lid worden' };

export default function LidmaatschapPage() {
  return (
    <>
      <section className="bg-barsele-mist">
        <div className="container-page py-16">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
            Lidmaatschap
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Word lid van WTC Barsele
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-barsele-ink/80">
            Hou je van fietsen in groep, samen ontdekken, samen afzien, samen
            koffie drinken? Dan ben je bij ons aan het juiste adres.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <Step
            n="1"
            title="Sluit een keer aan"
            body="Kom eens langs op een zaterdagrit en proef van de groep. Geen verplichting, gewoon kennismaken."
          />
          <Step
            n="2"
            title="Schrijf je in"
            body="Bevalt het? Stuur ons een mailtje of vul het inschrijfformulier in. We helpen je verder."
          />
          <Step
            n="3"
            title="Welkom bij Barsele"
            body="Je krijgt toegang tot het ledenportaal, kan inschrijven voor ritten en bent welkom op alle activiteiten."
          />
        </div>

        <div className="card mt-12 p-8">
          <h2 className="text-2xl font-semibold">Praktisch</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium uppercase tracking-wider text-barsele-ink/50">
                Lidgeld
              </dt>
              <dd className="mt-1 text-base text-barsele-ink/80">
                Wordt jaarlijks vastgelegd. Vraag het bij het bestuur.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium uppercase tracking-wider text-barsele-ink/50">
                Vertrekplaats
              </dt>
              <dd className="mt-1 text-base text-barsele-ink/80">
                Vaste vertrekplaats in Bazel. Adres krijg je bij inschrijving.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium uppercase tracking-wider text-barsele-ink/50">
                Verzekering
              </dt>
              <dd className="mt-1 text-base text-barsele-ink/80">
                Als lid van de Vlaamse Wielerbond ben je verzekerd tijdens
                clubritten.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium uppercase tracking-wider text-barsele-ink/50">
                Outfit
              </dt>
              <dd className="mt-1 text-base text-barsele-ink/80">
                Op clubritten dragen we de clubkledij. Bestellen kan via het
                ledenportaal (binnenkort).
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:info@wtcbarsele.be" className="btn-primary">
              Stuur ons een mailtje
            </a>
            <Link href="/" className="btn-secondary">
              Terug naar home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="card p-6">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-barsele-blue-700 font-display text-lg font-semibold text-white">
        {n}
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-barsele-ink/70">{body}</p>
    </div>
  );
}
