import Button from '@/components/UI/buttons/button';
import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import { BankAccount, Endorsed, Home, ShoppingCart } from '@blueprintjs/icons';
import classNames from 'classnames';
import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './viewObject.module.scss';
import objectsStore from '@/store/objectsStore';
import { RentalObject } from '@/models/RentalObject';
import { ProgressSpinner } from 'primereact/progressspinner';
import ViewStatsLayout from '@/components/UI/layout/viewStatsLayout';
import LeftSideComponent from '@/components/UI/viewPage/leftSide/leftSide';
import RightSideComponent, {
  StatsCardsData,
} from '@/components/UI/viewPage/rightSide/rightSide';
import { Order } from '@/models/Order';
import ordersStore from '@/store/ordersStore';
import OrdersTable from '@/components/b2bclient/tables/reservationsTable';
import usePaginate from '@/hooks/usePaginate';
import { observer } from 'mobx-react-lite';
import { useSort } from '@/hooks/useSort';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';

const ViewObject: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id, objectId } = useParams();
  const { showError } = useContext(ToastContext);
  const [search, setSearch] = useState('');
  const { sortField, sortOrder, handleSort, sort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(ordersStore.filters);

  const {
    data: object,
    isLoading,
    errorMsg,
  } = useFetch<RentalObject>(
    () => objectsStore.getRentalObject(parseInt(objectId || '0')),
    [objectId],
  );
  console.log(object);

  const { data: orders } = useFetch<Order[]>(
    () =>
      ordersStore.getOrders(
        { limit, skip, sort, search },
        parseInt(objectId || ''),
      ),
    [limit, skip, objectId, sort, search],
  );

  if (!object || !orders) {
    return <ProgressSpinner />;
  }

  if (errorMsg) {
    showError(errorMsg);
  }

  const statsCardsData: StatsCardsData[] = [
    {
      icon: <BankAccount />,
      heading: `${formatToUpperUnit(object.total_reservation_sum)}`,
      subheading: 'organizations.totalSales',
    },
    {
      icon: <ShoppingCart />,
      heading: `${object.total_reservation_amount}`,
      subheading: 'organizations.totalBookings',
    },
    {
      icon: <Endorsed />,
      heading: `${object.total_clients_amount}`,
      subheading: 'organizations.totalClients',
    },
  ];

  return (
    <div className={styles.viewObject}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {object?.name}
      </h3>
      <div className={styles.heading}>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('organizations.organizations'), url: '/organizations' },
            { label: `${id}`, url: '../' },
            {
              label: `${object?.name}`,
              url: `${objectId}`,
            },
          ]}
        />
        <Button onClick={() => navigate('edit')}>{t('actions.edit')}</Button>
      </div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <ViewStatsLayout
            LeftSideComponent={<LeftSideComponent data={object} />}
            RightSideComponent={
              <RightSideComponent
                statCardsData={statsCardsData}
                heading={t('orders.reservationHistory')}
                setSearch={setSearch}
              />
            }
            Table={
              <OrdersTable
                orders={orders}
                first={first}
                onPageChange={onPageChange}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSort}
              />
            }
          />
        </>
      )}
    </div>
  );
});

export default ViewObject;
