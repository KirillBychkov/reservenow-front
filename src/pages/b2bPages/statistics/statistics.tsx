import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import {
  Organization,
  OrganizationStatistics,
  StatisticsPerPeriod,
} from '@/models/Organization';
import organizationStore from '@/store/organizationsStore';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import styles from './statistics.module.scss';
import Flex from '@/components/UI/layout/flex';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import classNames from 'classnames';
import StatisticsCard from '@/components/UI/cards/statisticsCard/statisticsCard';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { BankAccount, Endorsed, ShoppingCart } from '@blueprintjs/icons';
import { Knob } from 'primereact/knob';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TopObject } from '@/models/RentalObject';
import TopObjectsTable from '@/components/b2bclient/tables/statisticsTables/topObjectsTable';
import TopClientsTable from '@/components/b2bclient/tables/statisticsTables/topClientsTable';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type CustomTooltipProps = {
  payload?: any[];
  label?: string;
  active?: boolean;
  t: TFunction;
  data: any;
};

function CustomTooltip({
  payload,
  label,
  active,
  t,
  data,
}: CustomTooltipProps) {
  if (payload == null) return null;
  if (active) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${t('dates.week')}: ${label}`}</p>
        <p className='label'>{data[Number(label) - 1].week}</p>
        <p className='intro'>{`${t('orders.totalReservationsSum')}: ${
          payload[0].value
        }`}</p>
      </div>
    );
  }
}

const Statistics = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const [selectedOrganizationId, setSelectedOrganizationId] = React.useState<
    number | null
  >(null);

  const { data: organizations } = useFetch<Organization[]>(
    organizationStore.getOrganizations,
    [],
    false,
    (data) => data[0]?.id && setSelectedOrganizationId(data[0]?.id),
  );

  const {
    data: statistics,
    errorMsg,
    isLoading,
  } = useFetch<OrganizationStatistics[]>(
    () =>
      selectedOrganizationId
        ? organizationStore.getOrganizationStatistics(selectedOrganizationId)
        : Promise.resolve({
            data: {} as OrganizationStatistics[],
            error: '',
          }),
    [selectedOrganizationId],
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  if (!organizations || (selectedOrganizationId && !statistics)) {
    return <ProgressSpinner />;
  }

  const dropdownOptions = organizations?.map((organization) => ({
    label: organization.name,
    value: organization.id,
  }));

  const area = statistics?.[0]?.statistics_per_period ?? '[]';
  const statisticsPerPeriod: StatisticsPerPeriod[] = JSON.parse(area);
  const formattedStatisticsPerPeriod = statisticsPerPeriod.map((obj) => ({
    ...obj,
    total_revenue: formatToUpperUnit(obj.total_revenue),
  }));

  const data = formattedStatisticsPerPeriod.map((item: any, i: number) => ({
    weekNumber: i + 1,
    totalRevenue: item.total_revenue,
    week: item.week,
  }));

  const objects = statistics?.[0]?.top_objects ?? '[]';
  const topObjects: TopObject[] = JSON.parse(objects);

  const clients = statistics?.[0]?.top_clients ?? '[]';
  const topClients = JSON.parse(clients);
  console.log(topClients);

  return (
    <div className={styles.statistics}>
      <Flex options={{ gap: 1.25, align: 'center' }}>
        <Dropdown
          options={dropdownOptions}
          value={selectedOrganizationId}
          onChange={(e: DropdownChangeEvent) =>
            setSelectedOrganizationId(e.value)
          }
          placeholder='Select an organization'
        />
      </Flex>
      {!selectedOrganizationId ? (
        <h2
          className={classNames(
            'heading heading-2 heading-primary text-center',
            styles.null,
          )}
        >
          {t('statistics.notSelected')}
        </h2>
      ) : (
        statistics && (
          <div className={styles.statisticsContent}>
            <Flex options={{ justify: 'space-between', gap: 1.5 }}>
              <StatisticsCard
                icon={<BankAccount />}
                heading={`${formatToUpperUnit(
                  statistics[0]?.total_revenue || 0,
                )}`}
                subheading={t('orders.totalReservationsSum')}
              />
              <StatisticsCard
                icon={<ShoppingCart />}
                heading={`${statistics[0]?.total_reservations || 0}`}
                subheading={t('orders.totalReservations')}
              />
              <StatisticsCard
                icon={<Endorsed />}
                heading={`${statistics[0]?.total_hours || 0}`}
                subheading={t('orders.totalHours')}
              />
            </Flex>
            <Flex options={{ justify: 'space-between', gap: 1.5 }}>
              <div className={styles.card}>
                <h2 className={styles.heading}>
                  {t('statistics.organizationLoad')}
                </h2>
                <p className={styles.subheading}>{t('dates.thisMonth')}</p>
                <Flex options={{ justify: 'center' }}>
                  <Knob
                    readOnly
                    value={Math.floor(statistics[0]?.organization_load) || 0}
                    valueTemplate='{value}%'
                    size={200}
                    pt={{
                      value: {
                        style: { strokeLinecap: 'round', strokeWidth: '16px ' },
                      },
                      range: {
                        style: {
                          strokeWidth: '8px',
                          stroke: '#DCE0E5',
                          strokeLinecap: 'round',
                        },
                      },
                      svg: {
                        style: {},
                      },
                    }}
                  />
                </Flex>
              </div>
              <div className={styles.card} style={{ width: '100%' }}>
                <h2 className={styles.heading}>{t('statistics.statistics')}</h2>
                <p className={styles.subheading}>
                  {t('orders.totalReservations')}
                </p>
                <ResponsiveContainer width='100%' maxHeight={300}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                        <stop
                          offset='5%'
                          stopColor='#47C8FF'
                          stopOpacity={0.3}
                        />
                        <stop offset='95%' stopColor='white' stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey='weekNumber' />
                    <YAxis />
                    <CartesianGrid vertical={false} />
                    <Tooltip content={<CustomTooltip t={t} data={data} />} />
                    <Area
                      type='monotone'
                      dataKey='totalRevenue'
                      strokeWidth={2}
                      stroke='#7961DB'
                      fillOpacity={1}
                      fill='url(#colorUv)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Flex>
            <TopObjectsTable
              topObjects={topObjects}
              organizationId={selectedOrganizationId}
            />
            <TopClientsTable topClients={topClients} />
          </div>
        )
      )}
    </div>
  );
});

export default Statistics;