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
