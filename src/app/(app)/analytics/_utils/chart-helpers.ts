import {
  eachDayOfInterval,
  eachHourOfInterval,
  format,
  subDays,
  subHours,
  startOfHour,
  endOfHour,
  endOfDay,
  startOfDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import type { TimeRange } from '@/src/app/(app)/analytics/_const';
import type { ClickEvent } from '@/src/types';

export interface ChartDataPoint {
  date: string;
  clicks: number;
  originalDate: Date;
}

const RANGE_CONFIG: Record<
  string,
  {
    unit: 'hour' | 'day';
    amount: number;
    dateFormat: string;
  }
> = {
  '24h': { unit: 'hour', amount: 23, dateFormat: 'HH:mm' },
  '7d': { unit: 'day', amount: 6, dateFormat: 'dd MMM' },
  '30d': { unit: 'day', amount: 29, dateFormat: 'dd MMM' },
  '90d': { unit: 'day', amount: 89, dateFormat: 'dd MMM' },
};

const toZonedTime = (date: Date | string, timeZone: string) => {
  return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
};

const getDateKey = (date: Date, unit: 'hour' | 'day') => {
  return format(date, unit === 'hour' ? 'yyyy-MM-dd-HH' : 'yyyy-MM-dd');
};

export function processChartData(
  events: ClickEvent[],
  range: TimeRange,
  isPro: boolean,
  timezone: string = 'UTC'
): ChartDataPoint[] {
  let effectiveRange = range;
  if (!isPro && range !== '24h' && range !== '7d') {
    effectiveRange = '24h';
  }

  const config = RANGE_CONFIG[effectiveRange] || RANGE_CONFIG['7d'];

  const now = toZonedTime(new Date(), timezone);
  let intervalDates: Date[] = [];

  if (config.unit === 'hour') {
    intervalDates = eachHourOfInterval({
      start: subHours(startOfHour(now), config.amount),
      end: endOfHour(now),
    });
  } else {
    intervalDates = eachDayOfInterval({
      start: subDays(startOfDay(now), config.amount),
      end: endOfDay(now),
    });
  }

  const dataPoints: ChartDataPoint[] = intervalDates.map((date) => ({
    date: format(date, config.dateFormat, { locale: es }),
    clicks: 0,
    originalDate: date,
  }));

  const lookup = new Map<string, ChartDataPoint>();
  dataPoints.forEach((p) => {
    const key = getDateKey(p.originalDate, config.unit);
    lookup.set(key, p);
  });

  events.forEach((event) => {
    const eventDate = toZonedTime(event.created_at, timezone);
    const key = getDateKey(eventDate, config.unit);

    const point = lookup.get(key);
    if (point) {
      point.clicks += 1;
    }
  });

  return dataPoints;
}
