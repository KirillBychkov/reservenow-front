// format phone incoming from server
export const formatPhoneIn = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const countryCode = cleaned.slice(0, 2);
  const areaCode = cleaned.slice(2, 5);
  const firstPart = cleaned.slice(5, 8);
  const secondPart = cleaned.slice(8);

  return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
};

// format phone outgoing to server
export const formatPhoneOut = (phone: string) => {
  const regex = /(?![+])[\D\s]+/g;
  const phoneFormatted = phone.replace(regex, '');
  return phoneFormatted;
};
