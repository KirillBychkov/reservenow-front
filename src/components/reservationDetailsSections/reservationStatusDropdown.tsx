import { Dropdown } from 'primereact/dropdown';
import Flex from '../UI/layout/flex';
import { useTranslation } from 'react-i18next';
import { Order } from '@/models/Order';
import styles from './reservationSections.module.scss'

type Props = {
  order: Order;
};

export const ReservationStatusDropdown = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex options={{ direction: 'column', gap: 0.75 }} className={styles.card}>
      <h6 className='heading heading-6'>{t('forms.status')}</h6>

      <Dropdown
        disabled
        style={{ width: '100%' }}
        placeholder={t(`status.${order?.status}`)}
      />
    </Flex>
  );
};
