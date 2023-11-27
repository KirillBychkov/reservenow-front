export const formatDate = (dateString: string | Date, lang: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat(lang, options).format(date);
  return formattedDate;
};
