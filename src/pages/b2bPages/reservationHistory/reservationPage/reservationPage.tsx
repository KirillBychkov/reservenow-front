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
import { Export, Home } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import ReservationsTable from '@/components/tables/reservationsTable';
import { ProgressSpinner } from 'primereact/progressspinner';
import ReservationDetailsSection from '@/components/reservationDetailsSections/reservationDetailsSection';
import ReservationStatusCard from '@/components/reservationDetailsSections/reservationStatusCard';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { ReservationDetailCard } from '@/components/UI/reservationDetails/reservationDetailCard/reservationDetailCard';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ReservationStatusDropdown } from '@/components/reservationDetailsSections/reservationStatusDropdown';

const ReservationPage = observer(() => {
  const { id } = useParams();
  const { showError } = useContext(ToastContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isLaptop = useMediaQuery('(max-width:1200px)');
  const { data: order, isLoading } = useFetch<Order>(
    () => ordersStore.getOrderById(parseInt(id || '0')),
    [id],
    {
      onError(err) {
        showError(err);
        navigate('/booking');
      },
    },
  );

  const formattedOrder = useMemo(() => {
    if (!order) {
      return null;
    }

    return formatObjectIn(order, i18n.language);
  }, [order]);

  return (
    <Flex options={{ direction: 'column', gap: 1.5 }} className={styles.page}>
      <Flex options={{ justify: 'space-between' }} className={styles.title}>
        <Flex options={{ direction: 'column' }}>
          <h3 className={classNames('heading heading-3', styles.heading)}>
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

        <Flex options={{ gap: 1 }}>
          <Button
            fill
            icon={<Export color='white' />}
            severity='secondary'
            className={styles.button}
            onClick={() => ordersStore.initiateExport(parseInt(id || '0'))}
          >
            {t('actions.export')}
          </Button>
          <Button
            onClick={() => navigate(`/schedule/${id}/edit`)}
            fill
            className={styles.button}
          >
            {t('actions.edit')}
          </Button>
        </Flex>
      </Flex>

      {formattedOrder && !isLoading ? (
        <>
          <ReservationDetailsSection order={formattedOrder} />

          {isLaptop && (
            <Flex options={{ justify: 'space-between', gap: 1.25 }}>
              <Flex
                className={styles.section}
                options={{ direction: 'column', gap: 1.5 }}
              >
                <ReservationDetailCard
                  title={t('reservationHistory.details.info')}
                  details={[
                    {
                      label: t('reservationHistory.details.createdBy'),
                      value: `${formattedOrder.client.first_name} ${formattedOrder.client.last_name}`,
                    },
                    {
                      label: t('reservationHistory.details.creatorDescription'),
                      value: formattedOrder.client.description,
                    },
                  ]}
                />

                <ReservationStatusDropdown order={formattedOrder} />
              </Flex>

              <div className={styles.section}>
                <ReservationStatusCard order={order as Order} />
              </div>
            </Flex>
          )}
          <Flex options={{ gap: 1.5 }}>
            <div className={styles.reservationList}>
              <div className={styles.tableHeader}>
                <h2 className='heading heading-4'>
                  {t('orders.reservationList')}
                </h2>
              </div>
              <ReservationsTable
                total={formattedOrder?.order_sum}
                reservations={formattedOrder.reservations}
              />
            </div>

            {!isLaptop && (
              <Flex
                options={{ gap: 1, direction: 'column' }}
                className={styles.section}
              >
                <ReservationStatusDropdown order={formattedOrder} />
                <ReservationStatusCard order={formattedOrder} />
              </Flex>
            )}
          </Flex>
        </>
      ) : (
        <ProgressSpinner />
      )}
    </Flex>
  );
});

export default ReservationPage;
