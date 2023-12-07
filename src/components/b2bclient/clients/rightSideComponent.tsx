import Flex from '@/components/UI/layout/flex';
import styles from './rightSideComponent.module.scss';
import { CreditCard, Endorsed } from '@blueprintjs/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  totalReservationSum: number | null;
  totalReservationAmount: number;
};

const RightSideComponent = ({
  totalReservationAmount,
  totalReservationSum,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Flex options={{ gap: 1.5 }}>
      <Flex
        options={{ direction: 'column', gap: 1 }}
        className={styles.infoCard}
      >
        <CreditCard size={24} color='#fff' className={styles.icon} />

        <Flex options={{ direction: 'column', gap: 0.5 }}>
          <p className='heading heading-5 heading-muted'>
            {t('clients.total_reservation_sum')}
          </p>
          <p className='heading heading-3'>{`UAH ${
            totalReservationSum || 0
          }`}</p>
        </Flex>
      </Flex>
      <Flex
        options={{ direction: 'column', gap: 1 }}
        className={styles.infoCard}
      >
        <Endorsed size={24} color='#fff' className={styles.icon} />

        <Flex options={{ direction: 'column', gap: 0.5 }}>
          <p className='heading heading-5 heading-muted'>
            {t('clients.total_reservation_amount')}
          </p>
          <p className='heading heading-3'>{totalReservationAmount}</p>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightSideComponent;
