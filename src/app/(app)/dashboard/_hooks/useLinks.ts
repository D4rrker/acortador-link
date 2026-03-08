import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/src/utils/supabase/client';
import type { ILinkData } from '@/src/app/(app)/dashboard/_types/types';

export function useRealtimeLinks(
  initialLinks: ILinkData[],
  plan: string = 'free'
) {
  const [links, setLinks] = useState<ILinkData[]>(initialLinks);

  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  useEffect(() => {
    if (plan === 'free') return;

    const channelName = `realtime-links-${Date.now()}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'links' },
        (payload) => {
          const updatedLink = payload.new as ILinkData;

          setLinks((currentLinks) =>
            currentLinks.map((link) =>
              link.id === updatedLink.id
                ? { ...link, clicks: updatedLink.clicks }
                : link
            )
          );
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('🟢 Conectado a Realtime Links');
        }
        if (status === 'TIMED_OUT') {
          console.error('🔴 Timeout. Intentando reconexión manual...');
        }
      });

    return () => {
      console.log(`🧹 Limpiando canal (${channelName})...`);

      supabase.removeChannel(channel);
    };
  }, [plan, supabase]);

  return { links };
}
