import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { formatHour } from '@/utils/organizationHelpers';
import { WeekWorkingHours } from '@/types/weekWorkingHours';
import styles from './workingHours.module.scss';

interface DataWithWorkingHours extends WeekWorkingHours {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Props {
  data: DataWithWorkingHours;
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
    <p
      className={classNames('paragraph paragraph--normal', styles.hoursText)}
      style={{ marginBottom: '4px' }}
    >
      {t(`dates.days.${day}`) + ' '}
      <span className='paragraph-muted'>
        {isDayOff
          ? t('dates.days.dayOff')
          : `${formatHour(startHour as number)} - ${formatHour(
              endHour as number,
            )}`}
      </span>
    </p>
  );
};
