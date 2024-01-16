import { CalendarProps, Calendar as PrCalendar } from 'primereact/calendar';
import { Calendar as IconCalendar } from '@blueprintjs/icons';

export const Calendar = (props: CalendarProps) => {
  return (
    <PrCalendar
      showIcon
      readOnlyInput
      dateFormat='mm/dd'
      selectionMode='range'
      icon={<IconCalendar color='#7961DB' />}
      iconPos='left'
      {...props}
    />
  );
};
