import { OrganizationStatistics } from '@/models/Organization';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { BankAccount, Endorsed, ShoppingCart } from '@blueprintjs/icons';

const getOrganizationsStatsData = (
  organizationStatistics: OrganizationStatistics | null,
) => {
  return [
    {
      icon: <BankAccount />,
      heading: `${formatToUpperUnit(
        organizationStatistics?.total_revenue || 0,
      )}`,
      subheading: 'orders.totalReservationsSum',
    },
    {
      icon: <ShoppingCart />,
      heading: `${organizationStatistics?.total_reservations || 0}`,
      subheading: 'orders.totalReservations',
    },
    {
      icon: <Endorsed />,
      heading: `${organizationStatistics?.total_hours || 0}`,
      subheading: 'orders.totalHours',
    },
  ];
};

export default getOrganizationsStatsData;
