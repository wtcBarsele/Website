// Server-side Supabase client.
// Wordt pas écht gebruikt vanaf fase 2 (login + ledendata).
// Aanroepen vanuit Server Components, Server Actions of Route Handlers.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Wordt aangeroepen vanuit een Server Component — die kan geen cookies zetten.
            // Veilig om te negeren wanneer middleware de sessie ververst.
          }
        },
      },
    },
  );
}
