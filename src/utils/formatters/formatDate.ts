import dayjs from 'dayjs';

export const formatDate = (language: string) => (dateString: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat(language, options).format(date);

  return formattedDate;
};

export const formatCreatedAtTable = <T extends { created_at?: string | Date }>(
  object: T,
  language: string,
) => {
  dayjs.locale(language);

  return dayjs(object.created_at).format('D MMM YYYY');
};
