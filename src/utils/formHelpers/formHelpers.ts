export const generateDropdownOptions = () => {
  const options = [];
  for (let i = 0; i < 24; i++) {
    options.push({ label: `${i.toString().padStart(2, '0')}:00`, value: i });
  }
  // options.unshift({ label: '00:00', value: 0 });
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
  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  const day = days[index];
  const timingKey = timing === 'start' ? 'start_hours' : 'end_hours';
  return `${day}_${timingKey}`;
};

export const initializeWorkingHours = (numDays: number) => {
  const defaultHours = {
    enabled: false,
    dropdown1Value: 0,
    dropdown2Value: 0,
  };

  return Array.from({ length: numDays }, () => ({ ...defaultHours }));
};

export const numDaysInWeek = 7;

export const getDayLabel = (index: number) => {
  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  const dayIndex = index % 7;
  return daysOfWeek[dayIndex];
};
