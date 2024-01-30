import styles from './leftSide.module.scss';
import FootballField from '@/assets/footballField.png';
import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { useTranslation } from 'react-i18next';
import { daysOfWeek } from '@/utils/formHelpers/formHelpers';
import { RenderWorkingHours } from '../../workingHours/renderWorkingHours';
import classNames from 'classnames';

export interface ViewPageData extends WeekWorkingHours {
  name: string;
  id: number;
  address: string;
  photo?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // any other data
}
interface Props {
  data: ViewPageData;
}

const LeftSide: React.FC<Props> = ({ data }) => {
  const { name, id, address } = data;
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={classNames(styles.image)}>
        <img src={data.photo || FootballField} alt={data.name} />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <div className={styles.infoItem}>
            <p className={'heading heading-muted heading-6'}>{t('forms.id')}</p>
            <h6 className={'heading heading-6'}>{id}</h6>
          </div>
          <div className={styles.infoItem}>
            <h6 className={'heading heading-muted heading-6'}>
              {t('forms.name')}
            </h6>
            <h6 className={'heading heading-6'}>{name}</h6>
          </div>
          <div className={styles.infoItem}>
            <h6 className={'heading heading-muted heading-6'}>
              {t('organizations.location')}
            </h6>
            <h6 className={'heading heading-6'}>{address}</h6>
          </div>
        </div>

        <div className={styles.hours}>
          <h6 className={classNames('heading', 'heading-6', styles.hoursHeading)}>
            {t('organizations.workHours')}
          </h6>
          {daysOfWeek.map((day, i) => (
            <RenderWorkingHours data={data} day={day} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
