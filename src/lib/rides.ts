import { createClient } from './supabase-server';

export type Ride = {
  id: string;
  title: string;
  start_at: string;
  team_code: string;
  team_name: string;
  distance_km: number | null;
  gpx_url: string | null;
  barsele_challenge: boolean;
};

export async function getUpcomingRides(limit = 20): Promise<Ride[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('rides')
      .select('id, title, start_at, team_code, distance_km, gpx_url, barsele_challenge, teams(name)')
      .gte('start_at', new Date().toISOString())
      .order('start_at', { ascending: true })
      .limit(limit);

    if (error || !data) return [];

    return data.map((r: any) => ({
      id: r.id,
      title: r.title,
      start_at: r.start_at,
      team_code: r.team_code,
      team_name: r.teams?.name ?? r.team_code,
      distance_km: r.distance_km,
      gpx_url: r.gpx_url,
      barsele_challenge: r.barsele_challenge ?? false,
    }));
  } catch {
    return [];
  }
}
