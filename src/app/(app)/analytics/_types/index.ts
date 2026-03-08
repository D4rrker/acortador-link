export interface AnalyticsStats {
  totalClicks: number;
  growth: number; // añadir más adelante.
  topCountry: { name: string; code: string; percent: number } | null;
  topDevice: { name: string; percent: number } | null;
  latestClick: string | null;
}
