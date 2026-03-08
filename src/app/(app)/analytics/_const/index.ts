export type TimeRange = '24h' | '7d' | '30d' | '90d';

export const RANGES: { value: TimeRange; label: string; isPro: boolean }[] = [
  { value: '24h', label: '24h', isPro: false },
  { value: '7d', label: '7 Días', isPro: false },
  { value: '30d', label: '30 Días', isPro: true },
  { value: '90d', label: '90 Días', isPro: true },
];

export const COLORS = ['#4f46e5', '#93c5fd', '#e5e7eb', '#f3f4f6'];

export const DEVICE_NAMES: Record<string, string> = {
  mobile: 'Móvil',
  desktop: 'Escritorio',
  tablet: 'Tablet',
  console: 'Consola',
};

export const COUNTRY_MAPPING: Record<string, string> = {
  UK: 'gb',
  USA: 'us',
};
