import Flex from '@/components/UI/layout/flex';
import Searchbar from '@/components/searchbar/searchbar';
import useFetch from '@/hooks/useFetch';
import usePaginate from '@/hooks/usePaginate';
import { useSort } from '@/hooks/useSort';
import { Order } from '@/models/Order';
import ordersStore from '@/store/ordersStore';
import { useContext, useMemo, useState } from 'react';
import styles from './reservationHistory.module.scss';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import OrdersHistoryTable from '@/components/tables/ordersHistoryTable';
import ToastContext from '@/context/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { observer } from 'mobx-react-lite';
import SelectButton from '@/components/UI/buttons/selectButton/selectButton';

const ReservationHistory = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const [search, setSearch] = useState('');
  const { sort, sortField, sortOrder, handleSort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(ordersStore.filters);
  const [startDate, setStartDate] = useState('');
  const [endDate] = useState(
    new Date(new Date().getTime()).toISOString(),
  );
  const {
    data: orders,
    isLoading,
    errorMsg,
  } = useFetch<Order[]>(
    () =>
      ordersStore.getOrders(
        {
          limit,
          skip,
          search,
          sort,
        },
        {},
        { startDate, endDate },
      ),
    [limit, skip, search, sort, startDate, endDate],
  );

  const dateSpanOptions = useMemo(
    () => [
      { label: t('timeRanges.allTime'), value: '' },
      {
        label: t('timeRanges.30days'),
        value: new Date(
          new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
      {
        label: t('timeRanges.7days'),
        value: new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
      {
        label: t('timeRanges.24hours'),
        value: new Date(
          new Date().getTime() - 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
    ],
    [t],
  );

  if (errorMsg) {
    showError(errorMsg);
    navigate('/');
  }

  return (
    <Flex options={{ direction: 'column', gap: 2 }} className={styles.page}>
      <Flex options={{ direction: 'column', gap: 1.25 }}>
        <h3 className='heading heading-3'>{t('clients.ordersHistory')}</h3>
        <Flex options={{ align: 'center', justify: 'space-between' }}>
          <Flex options={{ align: 'center', gap: 1 }}>
            <SelectButton
              value={startDate}
              onChange={(e) => {
                setStartDate(e.value);
                // console.log(e.value);
              }}
              options={dateSpanOptions}
            />
            <Searchbar setSearch={setSearch} />
          </Flex>
          <Button onClick={() => navigate('/schedule/add')}>
            {t('reservationHistory.addReservation')}
          </Button>
        </Flex>
      </Flex>

      {isLoading && (
        <Flex options={{ justify: 'center', align: 'center' }}>
          <ProgressSpinner />
        </Flex>
      )}

      {orders && orders.length !== 0 && (
        <OrdersHistoryTable
          orders={orders}
          onPageChange={onPageChange}
          onSortChange={handleSort}
          first={first}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      )}

      {orders?.length === 0 && (
        <Flex
          className={styles.notFoundContainer}
          options={{
            justify: 'center',
            align: 'center',
            direction: 'column',
            gap: 2,
          }}
        >
          <h2 className='heading heading-2 heading-primary'>
            {t('clients.ordersNull')}
          </h2>
          <Button onClick={() => navigate('/schedule/add')}>
            {t('reservationHistory.addReservation')}
          </Button>
        </Flex>
      )}
    </Flex>
  );
});
export default ReservationHistory;