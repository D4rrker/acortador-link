export const getDomainFromUrl = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return 'unknown';
  }
};

export const getFaviconUrl = (url: string) => {
  const domain = getDomainFromUrl(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
};

export const getShortUrl = (shortCode: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/${shortCode}`;
};
