import { Trainer } from '@/models/Trainer';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { BankAccount, Endorsed, ShoppingCart } from '@blueprintjs/icons';

const getTrainersStatsData = (trainer: Trainer) => {
  const {
    total_reservation_sum,
    total_reservation_amount,
    total_clients_amount,
  } = trainer;
  return [
    {
      icon: <BankAccount />,
      heading: `${formatToUpperUnit(total_reservation_sum || 0)}`,
      subheading: 'orders.totalReservationsSum',
    },
    {
      icon: <ShoppingCart />,
      heading: `${total_reservation_amount || 0}`,
      subheading: 'orders.totalReservations',
    },
    {
      icon: <Endorsed />,
      heading: `${total_clients_amount || 0}`,
      subheading: 'orders.totalClients',
    },
  ];
};

export default getTrainersStatsData;
