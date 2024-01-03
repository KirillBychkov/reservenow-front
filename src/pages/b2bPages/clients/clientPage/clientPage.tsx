import Button from '@/components/UI/buttons/button';
import Flex from '@/components/UI/layout/flex';
import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import { Client } from '@/models/Client';
import clientStore from '@/store/ClientStore';
import { Home } from '@blueprintjs/icons';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './clientPage.module.scss';
import LeftSideComponent from '@/components/b2bclient/clients/leftSideComponent';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSort } from '@/hooks/useSort';
import usePaginate from '@/hooks/usePaginate';
import { observer } from 'mobx-react-lite';
import ClientOrdersTable from '@/components/tables/clientOrdersTable';
import { Order } from '@/models/Order';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import getClientStatsData from './getClientStatsData';
import RightSide from '@/components/UI/viewPage/rightSide/rightSide';
import ViewStatsLayout from '@/components/UI/layout/viewStatsLayout';

const ClientPage = observer(() => {
  const { id } = useParams();
  const { showError } = useContext(ToastContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: client, errorMsg } = useFetch<Client>(
    () => clientStore.getClientById(parseInt(id || '0')),
    [id],
  );
  const [search, setSearch] = useState('');
  const { sort, sortField, sortOrder, handleSort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(
    clientStore.ordersFilters,
  );
  const { data: orders } = useFetch<Order[]>(
    () =>
      clientStore.getClientOrders(parseInt(id || '0'), {
        limit,
        skip,
        search,
        sort,
      }),
    [limit, skip, search, sort],
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  if (!client) {
    return <ProgressSpinner />;
  }

  const { total_reservation_amount, total_reservation_sum } = client;
  const clientStatsData = getClientStatsData({
    total_reservation_amount,
    total_reservation_sum: formatToUpperUnit(total_reservation_sum || 0),
  });

  return (
    <div className={styles.page}>
      <Flex options={{ direction: 'column', gap: 0.625 }}>
        <h3 className='heading heading-3'>{`${client.first_name} ${client.last_name}`}</h3>
        <div className={styles.heading}>
          <BreadCrumb
            home={{ icon: <Home color='gray' />, url: '/' }}
            model={[
              { label: t('clients.clients'), url: '/clients' },
              {
                label: `${client.first_name} ${client.last_name}`,
                disabled: true,
              },
            ]}
          />

          <Button
            className={styles.headerBtn}
            fill
            onClick={() => navigate('edit')}
          >
            {t('actions.edit')}
          </Button>
        </div>
      </Flex>

      <ViewStatsLayout
        LeftSideComponent={
          <LeftSideComponent client={formatObjectIn(client)} />
        }
        RightSideComponent={
          <RightSide
            heading={t('clients.ordersHistory')}
            setSearch={setSearch}
            statCardsData={clientStatsData}
          />
        }
        Table={
          <div className={styles.tableBg}>
            {orders ? (
              <ClientOrdersTable
                sortField={sortField}
                first={first}
                sortOrder={sortOrder}
                onPageChange={onPageChange}
                onSortChange={handleSort}
                orders={orders}
              />
            ) : (
              <Flex
                className={styles.notFoundContainer}
                options={{ justify: 'center', align: 'center' }}
              >
                <h2 className='heading heading-2 heading-primary'>
                  {t('clients.ordersNull')}
                </h2>
              </Flex>
            )}
          </div>
        }
      />
    </div>
  );
});

export default ClientPage;
