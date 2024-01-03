import { CreditCard, Endorsed } from '@blueprintjs/icons';

type ClientStatistics = {
  total_reservation_amount: number;
  total_reservation_sum: number;
};

const getClientStatsData = ({
  total_reservation_amount,
  total_reservation_sum,
}: ClientStatistics) => {
  return [
    {
      icon: <CreditCard />,
      heading: `${total_reservation_sum}`,
      subheading: 'clients.total_reservation_sum',
    },
    {
      icon: <Endorsed />,
      heading: `${total_reservation_amount}`,
      subheading: 'clients.total_reservation_amount',
    },
  ];
};

export default getClientStatsData;
