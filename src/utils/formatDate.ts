export const formatDateToTimezone = (
  dateString: string,
  timezone: string = 'UTC'
): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timezone,
  }).format(date);
};
