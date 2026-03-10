import type { CountryData } from '@/src/hooks/useRealtimeGeo';

export function processGeoData(
  rpcEvents: { country_code: string; count: number }[] | null
): CountryData[] {
  if (!rpcEvents || rpcEvents.length === 0) return [];

  const regionNames = new Intl.DisplayNames(['es'], { type: 'region' });

  return rpcEvents.map((event) => {
    const rawCode = event.country_code;
    const isUnknown = rawCode === 'XX' || rawCode === 'Unknown' || !rawCode;
    let name = rawCode;

    try {
      name = isUnknown ? 'Desconocido' : regionNames.of(rawCode) || rawCode;
    } catch {}

    return {
      country_code: isUnknown ? '??' : rawCode,
      country_name: name,
      count: Number(event.count),
    };
  });
}

export function getFlagUrl(countryCode: string) {
  let code = countryCode.toLowerCase();
  if (code === 'uk') code = 'gb';
  return `https://flagcdn.com/${code}.svg`;
}

export function isUnknownCountry(code: string) {
  return code === '??' || code === 'Unknown';
}
