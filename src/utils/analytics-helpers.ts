import { formatDistanceToNow, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import type { AnalyticsStats } from '@/src/app/(app)/analytics/_types/index';
import type { ClickEvent, MetricResult } from '@/src/types';

const DEVICE_NAMES: Record<string, string> = {
  mobile: 'Móvil',
  desktop: 'Escritorio',
  tablet: 'Tablet',
  console: 'Consola',
  smarttv: 'Smart TV',
  wearable: 'Reloj',
};

const UNKNOWN_COUNTRIES = ['XX', 'Unknown', '??'];

function getTopMetric<T, K extends keyof T>(data: T[], key: K) {
  if (!data || data.length === 0) return null;

  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const rawValue = item[key];
    const value = typeof rawValue === 'string' ? rawValue : 'Desconocido';
    counts[value] = (counts[value] || 0) + 1;
  });

  const topKey = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  const checkTopKey = UNKNOWN_COUNTRIES.some((e) => e === topKey);

  return {
    name: checkTopKey ? 'Desconocido' : topKey,
    count: counts[topKey],
    percent: Math.round((counts[topKey] / data.length) * 100),
  };
}

export function getRanking<T, K extends keyof T>(
  data: T[],
  key: K
): MetricResult[] {
  if (!data || data.length === 0) return [];

  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const rawValue = item[key];
    const value = typeof rawValue === 'string' ? rawValue : 'Desconocido';
    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.keys(counts)
    .map((name) => ({
      name: name === 'Unknown' ? 'Desconocido' : name,
      value: counts[name],
      percent: Math.round((counts[name] / data.length) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

export function getGrowth(events: ClickEvent[]): number {
  const now = new Date();

  const currentPeriodStart = subDays(now, 30);

  const previousPeriodStart = subDays(now, 60);

  let currentCount = 0;
  let previousCount = 0;

  events.forEach((event) => {
    const date = new Date(event.created_at);

    if (date >= currentPeriodStart) {
      currentCount++;
    } else if (date >= previousPeriodStart) {
      previousCount++;
    }
  });

  if (previousCount === 0) {
    return currentCount > 0 ? 100 : 0;
  }

  const growth = ((currentCount - previousCount) / previousCount) * 100;

  return Math.round(growth);
}

export function processAnalyticsStats(events: ClickEvent[]): AnalyticsStats {
  const topCountryData = getTopMetric(events, 'country');
  const topDeviceData = getTopMetric(events, 'device_type');
  const growthData = getGrowth(events);

  const getLastClick = () => {
    const lastClic = formatDistanceToNow(new Date(events[0]?.created_at), {
      addSuffix: true,
      locale: es,
    });

    const lastClicFormated =
      lastClic.at(0)?.toLocaleUpperCase().concat(lastClic.slice(1)) ??
      'Hace unos minutos';

    return lastClicFormated;
  };

  let nameTopCountry = 'Desconocido';

  if (topCountryData && topCountryData.name !== 'Desconocido') {
    try {
      const translator = new Intl.DisplayNames(['es'], { type: 'region' });
      nameTopCountry =
        translator.of(topCountryData.name) || topCountryData.name;
    } catch {
      nameTopCountry = topCountryData.name;
    }
  }

  return {
    totalClicks: events.length,
    topCountry: topCountryData
      ? {
          name: nameTopCountry,
          code:
            topCountryData.name === 'Desconocido' ? 'XX' : topCountryData.name,
          percent: topCountryData.percent,
        }
      : null,
    topDevice: topDeviceData
      ? {
          name:
            DEVICE_NAMES[topDeviceData.name.toLowerCase()] ||
            topDeviceData.name,
          percent: topDeviceData.percent,
        }
      : null,
    latestClick: events.length > 0 ? getLastClick() : null,
    growth: growthData,
  };
}
