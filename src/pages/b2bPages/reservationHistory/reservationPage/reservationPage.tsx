import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import { Order } from '@/models/Order';
import ordersStore from '@/store/ordersStore';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './reservationPage.module.scss';
import Flex from '@/components/UI/layout/flex';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { Dropdown } from 'primereact/dropdown';
import ReservationsTable from '@/components/tables/reservationsTable';
import { ProgressSpinner } from 'primereact/progressspinner';
import ReservationDetailsSection from '@/components/reservationDetailsSections/reservationDetailsSection';
import ReservationStatusCard from '@/components/reservationDetailsSections/reservationStatusCard';
import { observer } from 'mobx-react-lite';

const ReservationPage = observer(() => {
  const { id } = useParams();
  const { showError } = useContext(ToastContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: order,
    errorMsg,
    isLoading,
  } = useFetch<Order>(
    () => ordersStore.getOrderById(parseInt(id || '0')),
    [id],
  );

  if (errorMsg) {
    showError(errorMsg);
    navigate('/booking');
  }

  const formattedOrder = useMemo(() => {
    if (!order) {
      return null;
    }

    return formatObjectIn(order);
  }, [order]);

  return (
    <Flex options={{ direction: 'column', gap: 1.5 }} className={styles.page}>
      <Flex options={{ justify: 'space-between' }} className={styles.title}>
        <Flex options={{ direction: 'column' }}>
          <h3 className='heading heading-3'>
            {t('reservationHistory.reservationDetails')}
          </h3>
          <BreadCrumb
            home={{ icon: <Home color='gray' />, url: '/' }}
            model={[
              { label: t('reservations.history'), url: '/booking' },
              {
                label: t('reservationHistory.reservationDetails'),
                disabled: true,
              },
            ]}
          />
        </Flex>
        <Button
          onClick={() => navigate(`/schedule/${id}/edit`)}
          fill
          className={styles.button}
        >
          {t('actions.edit')}
        </Button>
      </Flex>

      {formattedOrder && !isLoading ? (
        <>
          <ReservationDetailsSection order={formattedOrder} />
          <Flex options={{ gap: 1.5 }}>
            <div className={styles.reservationList}>
              <ReservationsTable
                total={formattedOrder?.order_sum}
                reservations={formattedOrder.reservations}
              />
            </div>
            <Flex
              options={{ gap: 1, direction: 'column' }}
              className={styles.statusSection}
            >
              <Flex
                options={{ direction: 'column', gap: 0.75 }}
                className={styles.card}
              >
                <h6 className='heading heading-6'>{t('forms.status')}</h6>

                <Dropdown
                  disabled
                  style={{ width: '100%' }}
                  placeholder={t(`status.${order?.status}`)}
                />
              </Flex>
              <ReservationStatusCard order={order as Order} />
            </Flex>
          </Flex>
        </>
      ) : (
        <ProgressSpinner />
      )}
    </Flex>
  );
});

export default ReservationPage;
