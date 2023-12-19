import { OrganizationStatistics } from '@/models/Organization';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { BankAccount, Endorsed, ShoppingCart } from '@blueprintjs/icons';

const getOrganizationsStatsData = (
  organizationStatistics: OrganizationStatistics[] | null,
) => {
  return organizationStatistics
    ? [
        {
          icon: <BankAccount />,
          heading: `${formatToUpperUnit(
            organizationStatistics[0]?.total_revenue || 0,
          )}`,
          subheading: 'orders.totalReservationsSum',
        },
        {
          icon: <ShoppingCart />,
          heading: `${organizationStatistics[0]?.total_reservations || 0}`,
          subheading: 'orders.totalReservations',
        },
        {
          icon: <Endorsed />,
          heading: `${organizationStatistics[0]?.total_hours || 0}`,
          subheading: 'orders.totalHours',
        },
      ]
    : undefined;
};

export default getOrganizationsStatsData;
