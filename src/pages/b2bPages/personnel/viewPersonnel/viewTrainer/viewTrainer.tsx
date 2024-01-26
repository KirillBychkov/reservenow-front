import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import personnelStore from '@/store/personnelStore';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Trainer } from '@/models/Trainer';
import styles from './viewTrainer.module.scss';
import TrainerInfo from './trainerInfo';
import ViewStatsLayout from '@/components/UI/layout/viewStatsLayout';
import RightSide from '@/components/UI/viewPage/rightSide/rightSide';
import { Order } from '@/models/Order';
import ordersStore from '@/store/ordersStore';
import { useSort } from '@/hooks/useSort';
import usePaginate from '@/hooks/usePaginate';
import OrdersTable from '@/components/tables/ordersTable';
import Button from '@/components/UI/buttons/button';
import getTrainersStatsData from './getTrainersStatsData';
import useSearch from '@/hooks/useSearch';
import { TableEmptyMessage } from '@/components/UI/tableEmptyMessage/tableEmptyMessage';
import { formatPhoneOut } from '@/utils/formatters/formatPhone';
import Flex from '@/components/UI/layout/flex';

const ViewTrainer: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showError } = useContext(ToastContext);

  const { sortField, sortOrder, handleSort, sort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(ordersStore.filters);
  const { search, handleSearch } = useSearch(onPageChange);

  const { data: trainer, isLoading } = useFetch<Trainer>(
    () => personnelStore.getTrainer(parseInt(id || '0')),
    [id],
    { onError: showError },
  );

  const { data: orders, isLoading: ordersLoading } = useFetch<Order[]>(
    () =>
      ordersStore.getOrders(
        { limit, skip, search: formatPhoneOut(search), sort },
        { trainerId: parseInt(id || '0') },
      ),
    [limit, skip, search, sort, id],
    { onError: showError },
  );

  if (!trainer) {
    return <ProgressSpinner />;
  }

  const statsData = getTrainersStatsData(trainer);

  return (
    <div className={styles.viewTrainer}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {`${trainer?.first_name || ''} ${trainer?.last_name || ''}`}
      </h3>
      <div className={styles.heading}>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('personnel.personnel'), url: '/personnel' },
            {
              label: `${trainer?.first_name} ${trainer?.last_name}`,
              url: `/personnel/trainer/${trainer?.id}`,
            },
          ]}
        />
        <Button onClick={() => navigate('edit')}>{t('actions.edit')}</Button>
      </div>
      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <ViewStatsLayout
          LeftSideComponent={<TrainerInfo data={trainer} />}
          RightSideComponent={
            <RightSide
              heading={t('orders.reservationHistory')}
              setSearch={handleSearch}
              statCardsData={statsData}
            />
          }
          Table={
            !ordersLoading ? (
              <OrdersTable
                emptyMessage={
                  <TableEmptyMessage text={t('personnel.reservationsNull')} />
                }
                first={first}
                onPageChange={onPageChange}
                onSortChange={handleSort}
                sortField={sortField}
                sortOrder={sortOrder}
                orders={orders || []}
              />
            ) : (
              <Flex
                className={styles.loaderContainer}
                options={{ justify: 'center', align: 'center' }}
              >
                <ProgressSpinner />
              </Flex>
            )
          }
        />
      )}
    </div>
  );
});

export default ViewTrainer;
