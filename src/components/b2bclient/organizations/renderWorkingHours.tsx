import { IOrganization } from '@/models/IOrganization';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { formatHour } from '@/utils/organizationHelpers';

export const renderWorkingHours = (
  organization: IOrganization,
  day: string
) => {
  const { t } = useTranslation();

  const startHourKey = `${day}_start_hours` as keyof IOrganization;
  const endHourKey = `${day}_end_hours` as keyof IOrganization;

  const startHour = organization[startHourKey];
  const endHour = organization[endHourKey];

  // Check if both startHour and endHour are 0
  const isDayOff = startHour === 0 && endHour === 0;

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
