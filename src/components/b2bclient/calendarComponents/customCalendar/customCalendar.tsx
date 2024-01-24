import { useMemo, useState } from 'react';
import {
  Calendar as RbcCalendar,
  Components,
  DateLocalizer,
  Formats,
  View,
  dayjsLocalizer,
  Event,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Events, ObjectUtils, OrganizationUtils } from '@/types/schedule';
import { Toolbar } from '../toolbar/toolbar';
import { useTranslation } from 'react-i18next';
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

dayjs.updateLocale('uk', {
  weekdaysMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
});

type Props = {
  events: Event[] | null;
  orgUtils: OrganizationUtils;
  objUtils: ObjectUtils;
  currentEvent: Events;
};

export const Calendar = ({
  events,
  orgUtils,
  objUtils,
  currentEvent,
}: Props) => {
  const [view, setView] = useState<View>('month');
  const { t, i18n } = useTranslation();

  const components: Components = useMemo(
    () => ({
      toolbar: (props) => (
        <Toolbar
          {...props}
          objUtils={objUtils}
          orgUtils={orgUtils}
          currentEvent={currentEvent}
        />
      ),
      timeGutterHeader:
        view === 'week' ? () => <div>{t('schedule.week')}</div> : undefined,
    }),
    [view, objUtils, orgUtils, i18n.language],
  );

  dayjs.locale(i18n.language);
  const localizer = dayjsLocalizer(dayjs);

  const formats: Formats = useMemo(
    () => ({
      dayFormat: 'dd DD',
      weekdayFormat: 'dd',
      dayHeaderFormat: 'dddd D MMMM',

      dayRangeHeaderFormat: (
        { start, end },
        _,
        localizer: DateLocalizer | undefined,
      ) =>
        `${localizer?.format(start, 'D')} - ${localizer?.format(
          end,
          'D MMMM',
        )}`,
    }),
    [],
  );

  return (
    <RbcCalendar
      components={components}
      localizer={localizer}
      events={events || []}
      formats={formats}
      view={view}
      onView={setView}
      style={{ height: view === 'month' ? '100%' : 'max-content' }}
    />
  );
};
