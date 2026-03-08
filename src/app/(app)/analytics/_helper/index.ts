import { DEVICE_NAMES } from '@/src/app/(app)/analytics/_const/index';

export function getDeviceName(key: string): string {
  return DEVICE_NAMES[key.toLowerCase()] || key || 'Desconocido';
}

export function getCountryDisplayName(
  code: string,
  originalName: string
): string {
  if (code.length !== 2) return originalName;
  try {
    const name = new Intl.DisplayNames(['es'], { type: 'region' }).of(
      code.toUpperCase()
    );
    return name || originalName;
  } catch {
    return originalName;
  }
}

export function getDomain(url: string): string | null {
  try {
    if (!url || ['Directo', 'Desconocido', 'Direct', 'Unknown'].includes(url)) {
      return null;
    }
    // Aseguramos protocolo para que URL() funcione
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    return new URL(fullUrl).hostname;
  } catch {
    return null;
  }
}

export function getFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}
