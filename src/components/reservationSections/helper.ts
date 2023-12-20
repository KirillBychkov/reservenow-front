import { WeekWorkingHours } from "@/types/weekWorkingHours";

export const generateDropdownOptions = (start: number, end: number) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push({ label: `${i.toString().padStart(2, '0')}:00`, value: i });
  }
  return options;
};

enum DAYS {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}


export const getTimeOnCertainDay = <T extends WeekWorkingHours>(obj: T, day: number) => {
  switch (day) {
    case DAYS.SUNDAY:
      return {
        start: obj.sunday_start_hours,
        end: obj.sunday_end_hours,
      };
    case DAYS.MONDAY:
      return {
        start: obj.monday_start_hours,
        end: obj.monday_end_hours,
      };

    case DAYS.TUESDAY:
      return {
        start: obj.tuesday_start_hours,
        end: obj.tuesday_end_hours,
      };

    case DAYS.WEDNESDAY:
      return {
        start: obj.wednesday_start_hours,
        end: obj.wednesday_end_hours,
      };

    case DAYS.THURSDAY:
      return {
        start: obj.thursday_start_hours,
        end: obj.thursday_end_hours,
      };

    case DAYS.FRIDAY:
      return {
        start: obj.friday_start_hours,
        end: obj.friday_end_hours,
      };

    case DAYS.SATURDAY:
      return {
        start: obj.saturday_start_hours,
        end: obj.saturday_end_hours,
      };
    default:
      return {
        start: obj.monday_start_hours,
        end: obj.monday_end_hours,
      };
  }
};