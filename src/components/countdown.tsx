'use client';

import { useEffect, useState } from 'react';

export function Countdown({ target }: { target: string }) {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setDiff(new Date(target).getTime() - Date.now());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (diff === null || diff <= 0) return null;

  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  return (
    <p className="mt-3 font-display text-xl font-bold tabular-nums text-barsele-ink/40">
      {days > 0 && <span>{days}d </span>}
      {String(hours).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </p>
  );
}
