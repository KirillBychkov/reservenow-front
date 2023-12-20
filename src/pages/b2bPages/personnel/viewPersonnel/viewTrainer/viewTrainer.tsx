import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import personnelStore from '@/store/personnelStore';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useContext, useState } from 'react';
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
import OrdersTable from '@/components/b2bclient/tables/reservationsTable';
import Button from '@/components/UI/buttons/button';
import getTrainersStatsData from './getTrainersStatsData';

const ViewTrainer: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showError } = useContext(ToastContext);
  const [search, setSearch] = useState('');
  const { sortField, sortOrder, handleSort, sort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(ordersStore.filters);

  const {
    data: trainer,
    isLoading,
    errorMsg,
  } = useFetch<Trainer>(
    () => personnelStore.getTrainer(parseInt(id || '0')),
    [id],
  );

  const { data: orders } = useFetch<Order[]>(
    () =>
      ordersStore.getOrders(
        { limit, skip, search, sort },
        { trainerId: parseInt(id || '0') },
      ),
    [limit, skip, search, sort, id],
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  if (!trainer || !orders) {
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
              setSearch={setSearch}
              statCardsData={statsData}
            />
          }
          Table={
            <OrdersTable
              first={first}
              onPageChange={onPageChange}
              onSortChange={handleSort}
              sortField={sortField}
              sortOrder={sortOrder}
              orders={orders}
            />
          }
        />
      )}
    </div>
  );
});

export default ViewTrainer;
