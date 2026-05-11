export const metadata = { title: 'Activiteiten' };

const activiteiten = [
  { jaar: '2025', titel: 'Dolomieten', plaats: 'Italië', type: 'Uitstap' },
  { jaar: '2025', titel: 'Weekend Melden', plaats: 'Melden', type: 'Weekend' },
  { jaar: '2024', titel: 'Mont-Ventoux', plaats: 'Frankrijk', type: 'Uitstap' },
  { jaar: '2024', titel: 'Weekend Alveringem', plaats: 'Hotel Hinterland', type: 'Weekend' },
  { jaar: '2023', titel: 'Weekend Oisterwijk', plaats: 'Nederland', type: 'Weekend' },
  { jaar: '2022', titel: 'Weekend Kinrooi', plaats: 'Limburg', type: 'Weekend' },
];

export default function ActiviteitenPage() {
  return (
    <>
      <section className="bg-barsele-mist">
        <div className="container-page py-16">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-barsele-blue-700">
            Onze activiteiten
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Uitstappen & weekends
          </h1>
          <p className="mt-4 max-w-2xl text-barsele-ink/80">
            Naast de wekelijkse ritten trekken we er een paar keer per jaar
            samen op uit. Van een lang weekend in eigen land tot meerdaagse
            uitstappen in de bergen.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <ul className="space-y-3">
          {activiteiten.map((a, i) => (
            <li key={i}>
              <a
                href="#"
                className="card flex flex-col gap-2 p-5 transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl font-semibold text-barsele-blue-800 sm:text-3xl">
                    {a.jaar}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-barsele-ink">
                      {a.titel}
                    </p>
                    <p className="text-sm text-barsele-ink/60">{a.plaats}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-barsele-blue-50 px-2.5 py-0.5 text-xs font-medium text-barsele-blue-800">
                    {a.type}
                  </span>
                  <span aria-hidden className="text-barsele-ink/40">→</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
