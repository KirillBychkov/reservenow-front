import styles from './leftSideComponent.module.scss';
import OrganizationDetailsLeft from './details';
import FootballField from '@/assets/footballField.png';
import { WeekWorkingHours } from '@/types/weekWorkingHours';

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

const LeftSideComponent: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.OrganizationDetails}>
      <div className={styles.OrganizationImageDiv}>
        <img
          className={styles.OrganizationImage}
          src={data.photo || FootballField}
          alt={data.name}
        />
      </div>
      <div className={styles.OrganizationDetailsBottom}>
        <OrganizationDetailsLeft data={data} />
      </div>
    </div>
  );
};

export default LeftSideComponent;
