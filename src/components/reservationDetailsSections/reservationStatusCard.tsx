import Flex from '@/components/UI/layout/flex';
import styles from './reservationSections.module.scss';
import { Order } from '@/models/Order';
import { useTranslation } from 'react-i18next';
import { OrderStatus } from '@/types/enums/order';
import * as dayjs from 'dayjs'
import { StatusStep } from '../UI/reservationDetails/statusStep/statusStep';

type Props = {
  order: Order;
};

const formatTime = (isoString: string) => {
  return dayjs(isoString).format("DD/MM/YYYY, HH:mm")
}

const ReservationStatusCard = ({ order }: Props) => {
  const { t } = useTranslation();
  const isOrderCompleted =
    order.status === OrderStatus.REJECTED || order.status === OrderStatus.PAID;
  const formattedTimeOfCreation = formatTime(order.created_at as string)
  const formattedTimeOfUpdate = formatTime(order.updated_at as string)

  return (
    <Flex
      className={styles.section}
      options={{ direction: 'column', gap: 1.5 }}
    >
      <h4 className='heading heading-4'>{t('reservationHistory.status.status')}</h4>
      <StatusStep
        checked={true}
        title={t('reservationHistory.status.created')}
        time={formattedTimeOfCreation}
      />
      <StatusStep checked={true} title={t('reservationHistory.status.processing')} time={formattedTimeOfCreation} />
      <StatusStep
        checked={isOrderCompleted}
        title={t('reservationHistory.status.completed')}
        // Todo: Add logic to get time when the order was completed when backend implements it
        time={formattedTimeOfUpdate}
      />
    </Flex>
  );
};

export default ReservationStatusCard;
