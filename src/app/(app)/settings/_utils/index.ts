export const formatTimeZone = (tz: string) => {
  const date = new Date();
  const offsetStr =
    new Intl.DateTimeFormat('es-ES', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    })
      .format(date)
      .split(' ')[1] || 'GMT';

  return `(${offsetStr}) ${tz.replace(/_/g, ' ')}`;
};

export const getFileSize = (fileSize: number): boolean => {
  return fileSize > 1024 * 1024;
};
