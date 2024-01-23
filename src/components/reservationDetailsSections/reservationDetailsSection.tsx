import Flex from '@/components/UI/layout/flex';
import { Order } from '@/models/Order';
import { formatPhoneIn } from '@/utils/formatters/formatPhone';
import { useTranslation } from 'react-i18next';
import { Reservation } from '@/models/Reservation';
import { ReservationDetailCard } from '../UI/reservationDetails/reservationDetailCard/reservationDetailCard';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Props = {
  order: Order;
};

const getObjectNames = (reservations: Reservation[]) => {
  const reservationsOfObject = reservations.filter(
    (reservation) => reservation.rental_object !== null,
  );
  return reservationsOfObject.map(
    ({ rental_object }) => rental_object?.organization?.name,
  );
};

const ReservationDetailsSection = ({ order }: Props) => {
  const { t } = useTranslation();
  const { created_at, id, payment_method, reservations, client, user } = order;
  const objectNames = getObjectNames(reservations);
  const isLaptop = useMediaQuery('(max-width:1200px)');

  return (
    <Flex options={{ gap: 1.5, justify: 'space-between' }}>
      <ReservationDetailCard
        status={order.status}
        title={t('reservationHistory.details.title', { id })}
        details={[
          {
            label: t('reservationHistory.details.createdAt'),
            value: created_at as string,
          },
          {
            label: t('reservationHistory.details.paymentMethod'),
            value: t(`payment.${payment_method}`),
          },
          {
            label: t('reservationHistory.details.organization'),
            value: objectNames.join(', '),
          },
        ]}
      />
      <ReservationDetailCard
        title={t('reservationHistory.details.customer')}
        details={[
          {
            label: t('reservationHistory.details.customer'),
            value: `${client.first_name} ${client.last_name}`,
          },
          {
            label: t('reservationHistory.details.phone'),
            value: formatPhoneIn(client.phone),
          },
        ]}
      />
      
      {!isLaptop && (
        <ReservationDetailCard
          title={t('reservationHistory.details.info')}
          details={[
            {
              label: t('reservationHistory.details.createdBy'),
              value: `${user.first_name} ${user.last_name}`,
            },
            {
              label: t('reservationHistory.details.creatorDescription'),
              value: user.description,
            },
          ]}
        />
      )}
    </Flex>
  );
};

export default ReservationDetailsSection;
