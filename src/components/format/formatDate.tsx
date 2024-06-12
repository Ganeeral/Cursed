import { DateTimeFormatOptions } from 'intl';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('ru-RU', options);
};
