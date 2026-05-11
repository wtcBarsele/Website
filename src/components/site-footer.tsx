import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-barsele-ink/5 bg-barsele-mist">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-md bg-barsele-blue-700 font-display text-sm font-bold text-white"
            >
              WB
            </span>
            <span className="font-display text-lg font-semibold text-barsele-ink">
              WTC Barsele
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-barsele-ink/70">
            Wielerclub uit Bazel, Kruibeke en Rupelmonde. Samen uit, samen thuis.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-barsele-ink">Navigeer</h4>
          <ul className="mt-3 space-y-2 text-sm text-barsele-ink/70">
            <li><Link href="/lidmaatschap" className="hover:text-barsele-blue-700">Lid worden</Link></li>
            <li><Link href="/kalender" className="hover:text-barsele-blue-700">Kalender</Link></li>
            <li><Link href="/activiteiten" className="hover:text-barsele-blue-700">Activiteiten</Link></li>
            <li><Link href="/saeftinghe-classic" className="hover:text-barsele-blue-700">Saeftinghe Classic</Link></li>
            <li><Link href="/sponsors" className="hover:text-barsele-blue-700">Sponsors</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-barsele-ink">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-barsele-ink/70">
            <li>Leo Heyrmanstraat 18, 9150 Bazel</li>
            <li>
              <a href="mailto:info@wtcbarsele.be" className="hover:text-barsele-blue-700">
                info@wtcbarsele.be
              </a>
            </li>
            <li>
              <a href="tel:+32495575085" className="hover:text-barsele-blue-700">
                +32 495 57 50 85
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-barsele-ink/10">
        <div className="container-page py-4 text-xs text-barsele-ink/60">
          © {new Date().getFullYear()} WTC Barsele. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
