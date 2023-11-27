import { Day, Week, WeekWorkingHours } from '@/types/weekWorkingHours';

export const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const generateDropdownOptions = () => {
  const options = [];
  for (let i = 0; i <= 24; i++) {
    options.push({ label: `${i.toString().padStart(2, '0')}:00`, value: i });
  }
  return options;
};

export const dropdownOptions = generateDropdownOptions();

export const defaultDay: Omit<Day, 'enabled'> = {
  start: 9,
  end: 18,
};

export const fullDay: Omit<Day, 'enabled'> = {
  start: 0,
  end: 24,
};

export const getDayLabel = (index: number) => {
  const dayIndex = index % 7;
  return daysOfWeek[dayIndex];
};

const initializeWorkingHours = (
  initialWorkingHours?: WeekWorkingHours,
): Week => {
  const workingHours: Week = {
    monday: {
      enabled: false,
      start: null,
      end: null,
    },
    tuesday: {
      enabled: false,
      start: null,
      end: null,
    },
    wednesday: {
      enabled: false,
      start: null,
      end: null,
    },
    thursday: {
      enabled: false,
      start: null,
      end: null,
    },
    friday: {
      enabled: false,
      start: null,
      end: null,
    },
    saturday: {
      enabled: false,
      start: null,
      end: null,
    },
    sunday: {
      enabled: false,
      start: null,
      end: null,
    },
  };

  if (!initialWorkingHours) {
    return workingHours;
  }

  for (const key in initialWorkingHours) {
    const day = key.split('_')[0];
    const time = key.split('_')[1];
    const value = initialWorkingHours[key as keyof WeekWorkingHours];
    if (!value) continue;
    workingHours[day as keyof Week].enabled = true;
    if (time === 'start') {
      workingHours[day as keyof Week].start = value;
    } else {
      workingHours[day as keyof Week].end = value;
    }
  }

  return workingHours;
};

export const finalizeWorkingHours = (week: Week): WeekWorkingHours => {
  const workingHours: WeekWorkingHours = {} as WeekWorkingHours;

  for (const day in week) {
    workingHours[`${day}_start_hours` as keyof WeekWorkingHours] =
      week[day as keyof Week].start;
    workingHours[`${day}_end_hours` as keyof WeekWorkingHours] =
      week[day as keyof Week].end;
  }

  return workingHours;
};

export const transformWorkingHours = <T extends WeekWorkingHours>(
  initialValues?: T,
): Week => {
  if (!initialValues) return initializeWorkingHours();
  const initialWorkingHours = {} as T;

  Object.entries(initialValues).forEach(([key, value]) => {
    if (key.includes('hours')) {
      initialWorkingHours[key as keyof T] = value;
    }
  });

  return initializeWorkingHours(initialWorkingHours);
};
