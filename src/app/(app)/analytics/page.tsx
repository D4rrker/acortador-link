import { createClient } from '@/src/utils/supabase/server';

import AnalyticsView from './_components/analytics-view';
import {
  getUserPlan,
  getUserTimeZone,
} from '@/src/app/(app)/dashboard/_lib/queries';
import { getFilteredEvents } from '@/src/app/(app)/analytics/_lib/queries';
import { AnalyticsFilter } from '@/src/components/analytics/analytics-filter';

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  let { code } = await searchParams;
  const activeCode = code;

  const supabase = await createClient();
  const [linksResult, plan, userTimezone] = await Promise.all([
    supabase.from('links').select('id, short_code, original_url'),
    getUserPlan(),
    getUserTimeZone(),
  ]);

  if (plan !== 'pro') {
    code = '';
  }

  const links = linksResult.data || [];

  const { events, selectedLinkId } = await getFilteredEvents(
    supabase,
    links,
    code,
    plan
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Analíticas
          </h1>
          <p className="text-sm text-gray-500">
            Resumen de rendimiento {activeCode ? `de /${activeCode}` : 'global'}
            .
          </p>
        </div>

        <AnalyticsFilter links={links} plan={plan} />
      </div>

      <AnalyticsView
        initialEvents={events}
        linkId={selectedLinkId}
        plan={plan}
        userTimezone={userTimezone}
      />
    </div>
  );
}
