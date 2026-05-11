export const metadata = {
  title: 'Sponsors',
  description:
    'WTC Barsele dankt al haar sponsors. Zonder hen geen clubkledij, geen activiteiten, geen Saeftinghe Classic.',
};

// Tijdelijke voorbeeld-data. In fase 2 komen deze uit de Supabase 'sponsors' tabel.
const sponsors = [
  { name: 'Voorbeeld Sponsor 1', tier: 'Hoofdsponsor' },
  { name: 'Voorbeeld Sponsor 2', tier: 'Hoofdsponsor' },
  { name: 'Voorbeeld Sponsor 3', tier: 'Partner' },
  { name: 'Voorbeeld Sponsor 4', tier: 'Partner' },
  { name: 'Voorbeeld Sponsor 5', tier: 'Partner' },
  { name: 'Voorbeeld Sponsor 6', tier: 'Partner' },
];

export default function SponsorsPage() {
  const hoofdsponsors = sponsors.filter((s) => s.tier === 'Hoofdsponsor');
  const partners = sponsors.filter((s) => s.tier === 'Partner');

  return (
    <>
      <section className="bg-barsele-mist">
        <div className="container-page py-16">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
            Onze sponsors
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Bedankt aan onze partners</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-barsele-ink/80">
            Zonder de steun van onze sponsors zouden de clubkledij, activiteiten
            en de Saeftinghe Classic niet mogelijk zijn. Een welgemeend dankjewel
            aan iedereen die WTC Barsele mee draagt.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-2xl font-semibold">Hoofdsponsors</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {hoofdsponsors.map((s) => (
            <SponsorCard key={s.name} name={s.name} tier={s.tier} large />
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-semibold">Partners</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((s) => (
            <SponsorCard key={s.name} name={s.name} tier={s.tier} />
          ))}
        </div>
      </section>

      {/* Zelf sponsor worden */}
      <section className="bg-barsele-ink py-16 text-white">
        <div className="container-page grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">Zelf sponsor worden?</h2>
            <p className="mt-3 max-w-md text-white/80">
              Interesse om WTC Barsele te steunen? Onze leden trekken er
              wekelijks op uit door Bazel, Kruibeke, Rupelmonde en omstreken.
              Contacteer ons voor de mogelijkheden.
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <a href="mailto:info@wtcbarsele.be" className="btn-primary">
              Neem contact op
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SponsorCard({
  name,
  tier,
  large,
}: {
  name: string;
  tier: string;
  large?: boolean;
}) {
  return (
    <div
      className={`card flex items-center justify-center p-6 ${
        large ? 'aspect-[3/1]' : 'aspect-[2/1]'
      }`}
    >
      <div className="text-center">
        {/* Tijdelijke logo-placeholder. In fase 2 vervangen door <Image src={logo_url} /> */}
        <div
          aria-hidden
          className={`mx-auto mb-3 grid place-items-center rounded-md bg-barsele-blue-50 font-display font-semibold text-barsele-blue-800 ${
            large ? 'h-14 w-14 text-xl' : 'h-10 w-10 text-base'
          }`}
        >
          {name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')}
        </div>
        <p className={`font-display font-semibold text-barsele-ink ${large ? 'text-xl' : 'text-base'}`}>
          {name}
        </p>
        <p className="mt-0.5 text-xs uppercase tracking-wider text-barsele-ink/50">{tier}</p>
      </div>
    </div>
  );
}
