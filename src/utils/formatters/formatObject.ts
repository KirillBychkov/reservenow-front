import { formatDate } from './formatDate';
import { formatPhoneIn, formatPhoneOut } from './formatPhone';
import { formatToLowerUnit, formatToUpperUnit } from './formatPrice';

interface FormatterObj {
  created_at?: (date: string | Date, language: string) => string;
  order_sum?: (price: number) => number;
  price_per_hour: (price: number) => number;
  price: (price: number) => number;
  phone: (phone: string) => string;
}

// Define input and output types for each formatter
const formatterObjIn = (language: string) => ({
  created_at: formatDate(language),
  order_sum: formatToUpperUnit,
  price_per_hour: formatToUpperUnit,
  price: formatToUpperUnit,
  phone: formatPhoneIn,
});

const formatterObjOut: FormatterObj = {
  price_per_hour: formatToLowerUnit,
  price: formatToLowerUnit,
  phone: formatPhoneOut,
};

// Define the object type to format
interface ObjectToFormat {
  created_at?: string | Date;
  order_sum?: number;
  price_per_hour?: number;
  price?: number;
  phone?: string;
}

// Refactor the formatObject function to correctly apply formatters
const formatObject = <T extends ObjectToFormat>(
  obj: T,
  formatterObj: FormatterObj,
): T => {
  const objKeys = Object.keys(obj) as (keyof ObjectToFormat)[];
  const formattedObj = objKeys.reduce((acc, key) => {
    if (formatterObj[key]) {
      const formatter = formatterObj[key] as (value: any) => any;
      return { ...acc, [key]: formatter(obj[key]) };
    }
    return { ...acc, [key]: obj[key] };
  }, {} as T);
  return formattedObj;
};

// Functions to format objects
export const formatObjectIn = <T extends ObjectToFormat>(
  obj: T,
  language: string,
): T => {
  return formatObject(obj, formatterObjIn(language));
};

export const formatObjectOut = <T extends ObjectToFormat>(obj: T): T => {
  return formatObject(obj, formatterObjOut);
};
