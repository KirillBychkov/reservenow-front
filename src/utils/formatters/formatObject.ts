import { formatPhoneIn, formatPhoneOut } from './formatPhone';
import { formatToLowerUnit, formatToUpperUnit } from './formatPrice';

interface FormatterObj {
  price_per_hour: (price: number) => number;
  phone: (phone: string) => string;
}

// Define input and output types for each formatter
const formatterObjIn: FormatterObj = {
  price_per_hour: formatToUpperUnit,
  phone: formatPhoneIn,
};

const formatterObjOut: FormatterObj = {
  price_per_hour: formatToLowerUnit,
  phone: formatPhoneOut,
};

// Define the object type to format
interface ObjectToFormat {
  price_per_hour?: number;
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
export const formatObjectIn = <T extends ObjectToFormat>(obj: T): T => {
  return formatObject(obj, formatterObjIn);
};

export const formatObjectOut = <T extends ObjectToFormat>(obj: T): T => {
  return formatObject(obj, formatterObjOut);
};