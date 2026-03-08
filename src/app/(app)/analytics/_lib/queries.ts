import { SupabaseClient } from '@supabase/supabase-js';
import type { ClickEvent } from '@/src/types';
import type { TUserPlans } from '@/src/app/(app)/dashboard/_types/types';

type LinkItem = { id: number; short_code: string };

export async function getFilteredEvents(
  supabase: SupabaseClient,
  links: LinkItem[],
  activeCode: string | undefined,
  userPlan: TUserPlans
) {
  const daysLimit = userPlan === 'pro' ? 90 : 7;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysLimit);

  let query = supabase
    .from('click_events')
    .select('link_id, country, city, device_type, referrer, created_at')
    .gte('created_at', cutoffDate.toISOString())
    .order('created_at', { ascending: false });

  let selectedLinkId: number | undefined = undefined;

  if (activeCode) {
    const selectedLink = links.find((l) => l.short_code === activeCode);

    if (selectedLink) {
      query = query.eq('link_id', selectedLink.id);
      selectedLinkId = selectedLink.id;
    } else {
      return { events: [], selectedLinkId: undefined };
    }
  } else {
    const linkIds = links.map((l) => l.id);

    if (linkIds.length > 0) {
      query = query.in('link_id', linkIds);
    } else {
      return { events: [], selectedLinkId: undefined };
    }
  }

  const { data, error } = await query;

  const result: ClickEvent[] | null = data;

  if (error) {
    console.error('❌ fn[getFilteredEvents]:', error);
    return { events: [], selectedLinkId };
  }

  return {
    events: result || [],
    selectedLinkId,
  };
}
