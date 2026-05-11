export const metadata = { title: 'Inloggen' };

export default function LoginPage() {
  return (
    <section className="container-page py-20">
      <div className="card mx-auto max-w-md p-8">
        <h1 className="text-2xl font-semibold">Inloggen</h1>
        <p className="mt-2 text-sm text-barsele-ink/70">
          Login wordt actief vanaf fase 2 (Supabase Auth). Voor nu kunnen
          bezoekers de publieke pagina&apos;s bekijken.
        </p>

        <form className="mt-6 space-y-4" aria-disabled>
          <label className="block">
            <span className="text-sm font-medium">E-mail</span>
            <input
              type="email"
              disabled
              className="mt-1 block w-full rounded-md border border-barsele-ink/10 bg-barsele-mist px-3 py-2 text-sm"
              placeholder="jouw@email.be"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Wachtwoord</span>
            <input
              type="password"
              disabled
              className="mt-1 block w-full rounded-md border border-barsele-ink/10 bg-barsele-mist px-3 py-2 text-sm"
            />
          </label>
          <button type="button" disabled className="btn-primary w-full opacity-60">
            Binnenkort
          </button>
        </form>
      </div>
    </section>
  );
}
