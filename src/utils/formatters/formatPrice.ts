const formatToLowerUnit = (upperUnit: number): number => {
  const centsValue = Math.floor(upperUnit * 100);
  return centsValue;
};

const formatToUpperUnit = (lowerUnit: number): number => {
  const dollarValue = lowerUnit / 100;
  return dollarValue;
};

export const formatObjectPriceToUpperUnit = <
  T extends { price_per_hour?: number },
>(
  obj: T,
): T => {
  if (!obj.price_per_hour) {
    return obj;
  }
  return { ...obj, price_per_hour: formatToUpperUnit(obj.price_per_hour) };
};

export const formatObjectPriceToLowerUnit = <
  T extends { price_per_hour?: number },
>(
  obj: T,
): T => {
  if (!obj.price_per_hour) {
    return obj;
  }
  return { ...obj, price_per_hour: formatToLowerUnit(obj.price_per_hour) };
};
