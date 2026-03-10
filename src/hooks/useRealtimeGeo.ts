import { useState, useEffect, useMemo } from 'react';
import { getSupabaseBrowserClient } from '@/src/utils/supabase/client';

export interface CountryData {
  country_code: string;
  country_name: string;
  count: number;
}

const regionNames = new Intl.DisplayNames(['es'], { type: 'region' });

export function useRealtimeGeo(
  initialData: CountryData[],
  plan: string = 'free',
  linkId?: number
) {
  const [data, setData] = useState<CountryData[]>(initialData);
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    // if (plan === 'free') return;

    const channelName = `realtime-geo-${linkId || 'global'}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'click_events',
          filter: linkId ? `link_id=eq.${linkId}` : undefined,
        },
        (payload) => {
          const newEvent = payload.new;
          const rawCode =
            newEvent.country && newEvent.country !== 'XX'
              ? newEvent.country
              : 'Unknown';
          const finalCode = rawCode === 'Unknown' ? '??' : rawCode;

          setData((currentData) => {
            const baseData = currentData ?? [];
            const exists = baseData.some((d) => d.country_code === finalCode);

            if (exists) {
              return baseData.map((item) =>
                item.country_code === finalCode
                  ? { ...item, count: item.count + 1 }
                  : item
              );
            }

            let name = rawCode;
            try {
              name =
                rawCode === 'Unknown'
                  ? 'Desconocido'
                  : regionNames.of(rawCode) || rawCode;
            } catch {}

            return [
              ...baseData,
              { country_code: finalCode, country_name: name, count: 1 },
            ];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [plan, supabase, linkId]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.count - a.count);
  }, [data]);

  return { data: sortedData };
}
