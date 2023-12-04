import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { formatHour } from '@/utils/organizationHelpers';
import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { ViewPageData } from './leftSide';

interface Props {
  data: ViewPageData;
  day: string;
}

export const RenderWorkingHours: React.FC<Props> = ({ data, day }) => {
  const { t } = useTranslation();

  const startHourKey = `${day}_start_hours` as keyof WeekWorkingHours;
  const endHourKey = `${day}_end_hours` as keyof WeekWorkingHours;

  const startHour = data[startHourKey];
  const endHour = data[endHourKey];

  // Check if both startHour and endHour are 0
  const isDayOff = startHour === null && endHour === null;

  return (
    <p className={classNames('text-medium')} key={day}>
      {t(`days.${day}`)}{' '}
      {isDayOff ? (
        <span className='text-medium-muted'>{t('days.dayOff')}</span>
      ) : (
        <span className='text-medium-muted'>
          {formatHour(startHour as number)} - {formatHour(endHour as number)}
        </span>
      )}
    </p>
  );
};
