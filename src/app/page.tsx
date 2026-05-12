import Link from 'next/link';
import { getUpcomingRides, type Ride } from '@/lib/rides';
import { Countdown } from '@/components/countdown';

// ---- datum/tijd helpers ----

function toISODate(isoString: string): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Brussels' }).format(
    new Date(isoString),
  );
}

function formatDateLabel(isoDate: string): string {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('nl-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('nl-BE', {
    timeZone: 'Europe/Brussels',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function groupByDate(rides: Ride[]): [string, Ride[]][] {
  const map = new Map<string, Ride[]>();
  for (const ride of rides) {
    const key = toISODate(ride.start_at);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(ride);
  }
  return Array.from(map.entries()).slice(0, 2);
}

// ---- team stijlen ----

const teamStyle: Record<string, { badge: string; ring: string }> = {
  a_slow: { badge: 'bg-barsele-blue-50 text-barsele-blue-800', ring: '' },
  a:      { badge: 'bg-barsele-blue-100 text-barsele-blue-900', ring: '' },
  a_plus: { badge: 'bg-barsele-blue-700 text-white', ring: 'ring-2 ring-barsele-blue-600' },
  gravel: { badge: 'bg-barsele-cloud text-barsele-ink', ring: '' },
  mtb:    { badge: 'bg-barsele-ink text-white', ring: '' },
};

// ---- pagina ----

export default async function HomePage() {
  const rides = await getUpcomingRides();
  const dateGroups = groupByDate(rides);
  const nextRide = rides[0] ?? null;
  const nextDateKey = nextRide ? toISODate(nextRide.start_at) : null;
  const nextDateTeams = nextDateKey
    ? rides.filter((r) => toISODate(r.start_at) === nextDateKey).map((r) => r.team_name)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-barsele-ink text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 15% 50%, #1650f0 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, #2060ff44 0%, transparent 45%), radial-gradient(ellipse at 60% 90%, #1245d066 0%, transparent 40%)',
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        <div className="container-page relative grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-300">
              Wielerclub sinds 2010
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Samen uit,<br />
              <span className="text-barsele-blue-400">samen thuis.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">
              WTC Barsele rijdt al meer dan een decennium in groep door Bazel,
              Kruibeke, Rupelmonde en ver daarbuiten. Veilig, hoffelijk en met
              veel goesting — zonder competitiestress.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kalender" className="btn-primary">
                Bekijk de kalender
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-barsele-blue-500/20 to-barsele-blue-900/40 ring-1 ring-white/10" />
            {nextRide && (
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-6 text-barsele-ink shadow-card sm:block min-w-[240px]">
                <p className="text-xs uppercase tracking-wider text-barsele-ink/60">Volgende rit</p>
                <p className="mt-2 font-display text-2xl font-bold capitalize text-barsele-blue-700">
                  {formatDateLabel(toISODate(nextRide.start_at))}
                </p>
                <p className="mt-1 text-sm text-barsele-ink/50">
                  {nextDateTeams.join(' · ')}
                </p>
                <Countdown target={nextRide.start_at} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Volgende ritten */}
      {dateGroups.length > 0 && (
        <section className="container-page py-16">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
            Planning
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Volgende ritten</h2>

          {dateGroups.map(([dateKey, groupRides]) => (
            <div key={dateKey} className="mt-10">
              <h3 className="mb-4 font-display text-xl font-semibold capitalize text-barsele-ink">
                {formatDateLabel(dateKey)}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupRides.map((ride) => {
                  const style = teamStyle[ride.team_code] ?? teamStyle['a'];
                  return (
                    <div key={ride.id} className={`card flex flex-col p-6 ${style.ring}`}>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${style.badge}`}>
                          {ride.team_name}
                        </span>
                        {ride.barsele_challenge && (
                          <span className="inline-block rounded-full bg-barsele-yellow px-2.5 py-0.5 text-xs font-bold text-barsele-ink">
                            Challenge
                          </span>
                        )}
                      </div>
                      <p className="mt-3 font-display text-lg font-bold text-barsele-ink leading-snug">
                        {ride.title}
                      </p>
                      <p className="mt-3 font-display text-3xl font-bold text-barsele-ink">
                        {formatTime(ride.start_at)}
                      </p>
                      {ride.distance_km && (
                        <p className="mt-1 text-sm text-barsele-ink/60">{ride.distance_km} km</p>
                      )}
                      {ride.gpx_url && (
                        <a
                          href={ride.gpx_url}
                          download
                          className="btn-secondary mt-5 self-start text-xs"
                        >
                          GPX downloaden ↓
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-8">
            <Link href="/kalender" className="text-sm font-medium text-barsele-blue-700 hover:underline">
              Volledige kalender bekijken →
            </Link>
          </div>
        </section>
      )}

      {/* Missie */}
      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
              Onze missie
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              In groep, op een verantwoorde en sportieve manier.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-barsele-ink/80">
            <p>
              WTC Barsele heeft als missie om in groep op een verantwoorde, veilige,
              hoffelijke en milieuvriendelijke manier te fietsen. We halen maximaal
              genot uit het fietsen in een leuke groepssfeer, zonder competitiegeest.
            </p>
            <p className="font-medium text-barsele-ink">
              Steeds geldt het principe: samen uit, samen thuis.
            </p>
          </div>
        </div>
      </section>

      {/* Groepen */}
      <section className="bg-barsele-mist">
        <div className="container-page py-20">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
            Onze groepen
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Voor elk tempo een ploeg
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <GroupCard
              tag="Baan"
              title="A-Slow"
              speed="22 — 24 km/u"
              distance="40 — 60 km"
              description="De ideale instap. Rustige snelheid, gezellige sfeer, koffiestop bijna verplicht."
            />
            <GroupCard
              tag="Baan"
              title="A"
              speed="23 — 25 km/u"
              distance="50 — 80 km"
              description="De fun-groep. Genieten in groep zonder de strijd op te zoeken. Koffiestop welkom."
            />
            <GroupCard
              tag="Baan"
              title="A+"
              speed="27 — 29 km/u"
              distance="60 — 100 km"
              description="Een tikkeltje pittiger. Voor wie iets verder en sneller wil, met af en toe een uitschieter."
              accent
            />
            <GroupCard
              tag="Gravel"
              title="Gravel"
              speed="op gevoel"
              distance="variabel"
              description="Onverharde wegen, dijken en jaagpaden. Avontuur voor de deur."
            />
            <GroupCard
              tag="MTB"
              title="Mountainbike"
              speed="op gevoel"
              distance="variabel"
              description="Singletracks en bospaden. Voor wie de wereld liever van een ruw kant ziet."
            />
            <div className="card flex flex-col justify-between p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-barsele-blue-700">
                  Twijfel je?
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-barsele-ink">
                  Kom gewoon eens proberen.
                </p>
                <p className="mt-2 text-sm text-barsele-ink/70">
                  Sluit een keer aan op een zaterdagrit, dan voel je vanzelf
                  in welke groep je thuishoort.
                </p>
              </div>
              <Link href="/lidmaatschap" className="btn-primary mt-6 self-start">
                Hoe lid worden
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Saeftinghe teaser */}
      <section className="container-page py-20">
        <div className="card overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="bg-barsele-blue-900 p-10 text-white md:col-span-2">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-300">
                Jaarlijks evenement
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold">
                Saeftinghe Classic
              </h3>
              <p className="mt-4 text-white/80">
                Onze eigen rit door het mooiste polderland van Vlaanderen en Zeeland.
              </p>
            </div>
            <div className="p-10 md:col-span-3">
              <p className="text-barsele-ink/80">
                Elk jaar organiseert WTC Barsele de Saeftinghe Classic, een
                toertocht door het grensgebied van Het Verdronken Land van Saeftinghe.
                Bekijk de vorige edities of schrijf je nu voorin voor de volgende.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/saeftinghe-classic" className="btn-primary">
                  Ontdek meer
                </Link>
                <Link href="/saeftinghe-classic#inschrijven" className="btn-secondary">
                  Voorinschrijven
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors strook */}
      <section className="border-t border-barsele-ink/5 bg-barsele-mist">
        <div className="container-page py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
                Met dank aan
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Onze sponsors</h2>
            </div>
            <Link
              href="/sponsors"
              className="hidden text-sm font-medium text-barsele-blue-700 hover:underline sm:inline-block"
            >
              Bekijk alle sponsors →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                aria-hidden
                className="card flex aspect-[3/2] items-center justify-center text-xs text-barsele-ink/40"
              >
                Sponsor {i + 1}
              </div>
            ))}
          </div>

          <Link
            href="/sponsors"
            className="mt-6 inline-block text-sm font-medium text-barsele-blue-700 hover:underline sm:hidden"
          >
            Bekijk alle sponsors →
          </Link>
        </div>
      </section>
    </>
  );
}


function GroupCard({
  tag,
  title,
  speed,
  distance,
  description,
  accent,
}: {
  tag: string;
  title: string;
  speed: string;
  distance: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className={`card p-6 ${accent ? 'ring-2 ring-barsele-blue-600' : ''}`}>
      <span className="inline-block rounded-full bg-barsele-blue-50 px-2.5 py-0.5 text-xs font-medium text-barsele-blue-800">
        {tag}
      </span>
      <h3 className="mt-3 font-display text-2xl font-semibold text-barsele-ink">{title}</h3>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-barsele-ink/50">Tempo</dt>
          <dd className="font-medium text-barsele-ink">{speed}</dd>
        </div>
        <div>
          <dt className="text-barsele-ink/50">Afstand</dt>
          <dd className="font-medium text-barsele-ink">{distance}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-barsele-ink/70">{description}</p>
    </div>
  );
}
