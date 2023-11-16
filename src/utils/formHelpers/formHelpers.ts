import { daysOfWeek } from '../organizationHelpers';

export const generateDropdownOptions = () => {
  const options = [];
  for (let i = 0; i < 24; i++) {
    options.push({ label: `${i.toString().padStart(2, '0')}:00`, value: i });
  }
  // options.unshift({ label: 'test', value: 0 });
  return options;
};

export const getUpdatedWorkingHoursForAllDays = (
  allHoursEnabled: boolean,
  workingHours: any[] // Adjust type
) => {
  const updatedHours: { [key: string]: number } = {};

  if (allHoursEnabled) {
    for (let i = 0; i < workingHours.length; i++) {
      const day = getDayKey(i, 'start');
      updatedHours[day] = 0;

      const endDay = getDayKey(i, 'end');
      updatedHours[endDay] = 23;
    }
  }

  return updatedHours;
};

export const getDayKey = (index: number, timing: 'start' | 'end') => {
  const day = daysOfWeek[index];
  const timingKey = timing === 'start' ? 'start_hours' : 'end_hours';
  return `${day}_${timingKey}`;
};
const numDaysInWeek = 7;

export const initializeWorkingHours = () => {
  const defaultHours = {
    enabled: false,
    dropdown1Value: 0,
    dropdown2Value: 0,
  };

  return Array.from({ length: numDaysInWeek }, () => ({ ...defaultHours }));
};

export const getDayLabel = (index: number) => {
  const dayIndex = index % 7;
  return daysOfWeek[dayIndex];
};
