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
import { Export } from '@blueprintjs/icons';
import useSearch from '@/hooks/useSearch';
import { Calendar } from '@/components/UI/calendar/calendar';
import { generateTimeSpanOptions } from '@/utils/formHelpers/formHelpers';
import { formatPhoneOut } from '@/utils/formatters/formatPhone';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ReservationHistory = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);

  const { sort, sortField, sortOrder, handleSort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(ordersStore.filters);
  const { search, handleSearch } = useSearch(onPageChange);
  const [dates, setDates] = useState<Date[] | null>(null);
  const isLaptopL = useMediaQuery('(max-width:1440px)');
  const { startDate, endDate } = useMemo(() => {
    const isFirstDateNotNull = dates !== null && dates[0] !== null;
    const isSecondDateNotNull = dates !== null && dates[1] !== null;
    return {
      startDate: isFirstDateNotNull ? dates[0].toISOString() : undefined,
      endDate: isSecondDateNotNull ? dates[1].toISOString() : undefined,
    };
  }, [dates]);
  const { data: orders, isLoading } = useFetch<Order[]>(
    () =>
      ordersStore.getOrders(
        {
          limit,
          skip,
          search: formatPhoneOut(search),
          sort,
        },
        {},
        { startDate, endDate },
      ),
    [limit, skip, search, sort, startDate, endDate],
    {
      onError: (err) => {
        showError(err);

        if (search) {
          return;
        }
        navigate('/');
      },
    },
  );

  const dateSpanOptions = useMemo(() => generateTimeSpanOptions(t), [t]);
  const isOrdersEmpty = (orders?.length === 0 || orders === null) && !isLoading;

  return (
    <Flex options={{ direction: 'column', gap: 2 }} className={styles.page}>
      <Flex options={{ direction: 'column', gap: 1.25 }}>
        <Flex options={{ justify: 'space-between', align: 'center' }}>
          <h3 className='heading heading-3'>{t('clients.ordersHistory')}</h3>
          {isLaptopL && (
            <Flex options={{ gap: 1 }}>
              <Button
                icon={<Export color='white' />}
                severity='secondary'
                onClick={() =>
                  ordersStore.initiateExport({ limit, skip, search, sort })
                }
              >
                {t('actions.export')}
              </Button>
              <Button onClick={() => navigate('/schedule/add')}>
                {t('reservationHistory.addReservation')}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex options={{ align: 'center', justify: 'space-between' }}>
          <div className={styles.controls}>
            <Flex options={{ align: 'center', gap: 1 }}>
              <SelectButton
                value={dates ? dates[0] : null}
                onChange={(e) => {
                  if (e.value === null) {
                    setDates(null);
                  } else {
                    setDates([e.value, new Date()]);
                  }
                }}
                options={dateSpanOptions}
              />
              <Calendar
                placeholder={t('timeRanges.chooseDates')}
                value={dates}
                onChange={(e) => setDates(e.value as Date[])}
              />
            </Flex>
            <Searchbar setSearch={handleSearch} />
          </div>
          {!isLaptopL && (
            <Flex className={styles.buttonControls} options={{ gap: 1 }}>
              <Button
                icon={<Export color='white' />}
                severity='secondary'
                onClick={() =>
                  ordersStore.initiateExport({ limit, skip, search, sort })
                }
              >
                {t('actions.export')}
              </Button>
              <Button fill onClick={() => navigate('/schedule/add')}>
                {t('reservationHistory.addReservation')}
              </Button>
            </Flex>
          )}
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

      {isOrdersEmpty && (
        <Flex
          className={styles.notFoundContainer}
          options={{
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
