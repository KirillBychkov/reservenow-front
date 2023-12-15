import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { BankAccount, Endorsed, ShoppingCart } from '@blueprintjs/icons';

interface Props {
  total_revenue: number;
  total_reservations: number;
  total_hours: number;
}

const trainerStatCardsData = ({
  total_hours,
  total_reservations,
  total_revenue,
}: Props) => {
  return [
    {
      icon: <BankAccount />,
      heading: `${formatToUpperUnit(total_revenue || 0)}`,
      subheading: 'organizations.totalSales',
    },
    {
      icon: <ShoppingCart />,
      heading: `${total_reservations || 0}`,
      subheading: 'organizations.totalBookings',
    },
    {
      icon: <Endorsed />,
      heading: `${total_hours || 0}`,
      subheading: 'organizations.totalHours',
    },
  ];
};

export default trainerStatCardsData;
