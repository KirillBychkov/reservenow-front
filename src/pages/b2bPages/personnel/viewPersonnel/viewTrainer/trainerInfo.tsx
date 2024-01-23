import { Trainer } from '@/models/Trainer';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './trainerInfo.module.scss';
import { daysOfWeek } from '@/utils/formHelpers/formHelpers';
import { RenderWorkingHours } from '@/components/UI/workingHours/renderWorkingHours';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Props {
  data: Trainer;
}

const TrainerInfo: React.FC<Props> = ({ data }) => {
  const { t, i18n } = useTranslation();
  const isLaptopL = useMediaQuery('(max-width:1440px)');

  data = formatObjectIn(data, i18n.language);

  return (
    <div className={styles.container}>
      {isLaptopL && (
        <div>
          <div className={styles.infoItem}>
            <h6 className={'heading heading-6'}>{t('forms.phone')}</h6>
            <h6 className={'heading heading-muted heading-6'}>
              {data.phone || '-'}
            </h6>
          </div>
          <div className={styles.infoItem}>
            <h6 className={'heading heading-6'}>{t('dates.date')}</h6>
            <h6 className={'heading heading-muted heading-6'}>
              {String(data.created_at)}
            </h6>
          </div>
        </div>
      )}

      <div>
        <div className={styles.infoItem}>
          <p className={'heading heading-6'}>{t('forms.id')}</p>
          <h6 className={'heading heading-muted heading-6'}>{data.id}</h6>
        </div>
        <div className={styles.infoItem}>
          <h6 className={'heading heading-6'}>{t('forms.firstName')}</h6>
          <h6 className={'heading heading-muted heading-6'}>
            {data.first_name}
          </h6>
        </div>
        <div className={styles.infoItem}>
          <h6 className={'heading heading-6'}>{t('forms.lastName')}</h6>
          <h6 className={'heading heading-muted heading-6'}>
            {data.last_name}
          </h6>
        </div>
        <div className={styles.infoItem}>
          <h6 className={'heading heading-6'}>{t('forms.email')}</h6>
          <h6 className={'heading heading-muted heading-6'}>
            {data.account.email}
          </h6>
        </div>
        {!isLaptopL && (
          <>
            <div className={styles.infoItem}>
              <h6 className={'heading heading-6'}>{t('forms.phone')}</h6>
              <h6 className={'heading heading-muted heading-6'}>
                {data.phone || '-'}
              </h6>
            </div>
            <div className={styles.infoItem}>
              <h6 className={'heading heading-6'}>{t('dates.date')}</h6>
              <h6 className={'heading heading-muted heading-6'}>
                {String(data.created_at)}
              </h6>
            </div>
          </>
        )}
      </div>

      <div className={styles.hours}>
        <h6 className={'heading heading-6'}>{t('organizations.workHours')}</h6>
        {daysOfWeek.map((day, i) => (
          <RenderWorkingHours data={data} day={day} key={i} />
        ))}
      </div>
    </div>
  );
};

export default TrainerInfo;
