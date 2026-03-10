import { useEffect, useState, useMemo } from 'react';
import { getSupabaseBrowserClient } from '@/src/utils/supabase/client';
import type { ClickEvent } from '@/src/types';

interface AnalyticsViewProps {
  initialEvents: ClickEvent[];
  linkId?: number;
  plan?: string;
}

export function useRealtimeClicks({
  initialEvents,
  linkId,
  plan,
}: AnalyticsViewProps) {
  const [events, setEvents] = useState<ClickEvent[]>(initialEvents);
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  useEffect(() => {
    // if (plan === 'free' || !plan) return;

    const channelName = `realtime-clicks-${linkId || 'global'}`;

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
          const newEvent = payload.new as ClickEvent;
          setEvents((prev) => [newEvent, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, linkId, plan]);

  return { events };
}
