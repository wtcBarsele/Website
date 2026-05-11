'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/lidmaatschap', label: 'Lid worden' },
  { href: '/kalender', label: 'Kalender' },
  { href: '/activiteiten', label: 'Activiteiten' },
  { href: '/saeftinghe-classic', label: 'Saeftinghe Classic' },
  { href: '/sponsors', label: 'Sponsors' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-barsele-ink/5 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.03]">
          <Image
            src="/images/logo.png"
            alt=""
            width={72}
            height={72}
            className="object-contain"
            priority
          />
          <span className="font-display text-lg font-bold text-barsele-ink">
            WTC Barsele
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${
                  active
                    ? 'nav-link-active bg-barsele-mist text-barsele-blue-700'
                    : 'text-barsele-ink/70 hover:bg-barsele-mist hover:text-barsele-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/login" className="btn-primary ml-2">
            Inloggen
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu openen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl p-2 text-barsele-ink transition-colors hover:bg-barsele-mist md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-barsele-ink/5 bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-barsele-ink/80 transition-colors hover:bg-barsele-mist"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Inloggen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
