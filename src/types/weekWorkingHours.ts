export interface WeekWorkingHours {
  monday_start_hours: number | null;
  monday_end_hours: number | null;
  tuesday_start_hours: number | null;
  tuesday_end_hours: number | null;
  wednesday_start_hours: number | null;
  wednesday_end_hours: number | null;
  thursday_start_hours: number | null;
  thursday_end_hours: number | null;
  friday_start_hours: number | null;
  friday_end_hours: number | null;
  saturday_start_hours: number | null;
  saturday_end_hours: number | null;
  sunday_start_hours: number | null;
  sunday_end_hours: number | null;
}

export interface Day {
  enabled: boolean;
  start: number | null;
  end: number | null;
}

export interface Week {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}
