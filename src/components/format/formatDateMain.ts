export const formatRelativeDate = (publicationDate: string): string => {
  const date = new Date(publicationDate);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate.getTime() - date.getTime();
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const differenceInMonths = Math.floor(differenceInDays / 30);
  const differenceInYears = Math.floor(differenceInMonths / 12);

  if (differenceInDays === 0) {
    return 'сегодня';
  } else if (differenceInDays === 1) {
    return 'вчера';
  } else if (differenceInMonths === 1) {
    return '1 месяц назад';
  } else if (differenceInMonths > 1 && differenceInMonths < 12) {
    return `${differenceInMonths} месяца назад`;
  } else if (differenceInMonths >= 12 && differenceInYears === 1) {
    return '1 год назад';
  } else if (differenceInYears > 1) {
    return `${differenceInYears} года назад`;
  } else {
    return `${differenceInDays} дней назад`;
  }
};
