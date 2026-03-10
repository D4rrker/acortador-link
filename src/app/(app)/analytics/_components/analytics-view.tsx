'use client';

import { useMemo } from 'react';
import {
  processAnalyticsStats,
  getRanking,
} from '@/src/utils/analytics-helpers';

import StatsCards from '@/src/app/(app)/analytics/_components/stats-cards/index';
import MainChart from '@/src/app/(app)/analytics/_components/main-chart/index';
import DevicesChart from '@/src/app/(app)/analytics/_components/devices-chart/index';
import LocationsList from '@/src/app/(app)/analytics/_components/locations-list/index';
import ReferrersList from '@/src/app/(app)/analytics/_components/referrers-list/index';
import { useRealtimeClicks } from '@/src/hooks/useRealtimeClicks';
import type { ClickEvent } from '@/src/types';

interface AnalyticsViewProps {
  initialEvents: ClickEvent[];
  linkId?: number;
  plan?: string;
  userTimezone: string;
}

export default function AnalyticsView({
  initialEvents,
  linkId,
  plan = 'free',
  userTimezone,
}: AnalyticsViewProps) {
  const { events } = useRealtimeClicks({ initialEvents, linkId, plan });

  const isPro = plan === 'pro';

  const stats = useMemo(() => {
    const rawStats = processAnalyticsStats(events);
    return {
      ...rawStats,
    };
  }, [events]);

  const topCountries = useMemo(() => getRanking(events, 'country'), [events]);
  const topDevices = useMemo(() => getRanking(events, 'device_type'), [events]);
  const topReferrers = useMemo(() => getRanking(events, 'referrer'), [events]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-border/40 h-px w-full" />

      <StatsCards stats={stats} />

      <div className="w-full">
        <MainChart events={events} isPro={isPro} timezone={userTimezone} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LocationsList data={topCountries} isPro={isPro} />

        <div className="flex flex-col gap-6">
          <DevicesChart data={topDevices} />

          <ReferrersList data={topReferrers} isPro={isPro} />
        </div>
      </div>
    </div>
  );
}
