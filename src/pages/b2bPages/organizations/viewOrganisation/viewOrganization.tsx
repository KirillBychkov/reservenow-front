import React, { useContext } from 'react';
import styles from './viewOrganization.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { BankAccount, Endorsed, Home, ShoppingCart } from '@blueprintjs/icons';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import organizationStore from '@/store/organizationsStore';
import Button from '@/components/UI/buttons/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import ViewStatsLayout from '@/components/UI/layout/viewStatsLayout';
import objectsStore from '@/store/objectsStore';
import usePaginate from '@/hooks/usePaginate';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';
import LeftSideComponent from '@/components/UI/viewPage/leftSide/leftSide';
import RightSideComponent, {
  StatsCardsData,
} from '@/components/UI/viewPage/rightSide/rightSide';
import ObjectsTable from '@/components/b2bclient/tables/objectsTable';
import { Organization, OrganizationStatistics } from '@/models/Organization';
import { RentalObject } from '@/models/RentalObject';
import { useSort } from '@/hooks/useSort';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';

const ViewOrganization: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { showError } = useContext(ToastContext);
  const { sortOrder, sortField, handleSort, sort } = useSort();

  const { limit, skip, first, onPageChange } = usePaginate(
    objectsStore.filters,
  );

  const { data: organization } = useFetch<Organization>(
    () => organizationStore.getOrganizationById(parseInt(id || '0')),
    [id],
  );

  const { data: organizationStatistics } = useFetch<OrganizationStatistics[]>(
    () => organizationStore.getOrganizationStatistics(parseInt(id || '0')),
    [id],
  );

  const {
    data: objects,
    errorMsg,
    isLoading,
  } = useFetch<RentalObject[]>(
    () =>
      objectsStore.getRentalObjects({ limit, skip, sort }, parseInt(id || '0')),
    [limit, skip, id, sort],
  );

  if (!organization || !objects) {
    return <ProgressSpinner />;
  }
  if (errorMsg) {
    showError(errorMsg);
  }

  const statsCardData: StatsCardsData[] | undefined = organizationStatistics
    ? [
        {
          icon: <BankAccount />,
          heading: `${formatToUpperUnit(
            organizationStatistics[0]?.total_revenue || 0,
          )}`,
          subheading: 'organizations.totalSales',
        },
        {
          icon: <ShoppingCart />,
          heading: `${organizationStatistics[0]?.total_reservations || 0}`,
          subheading: 'organizations.totalBookings',
        },
        {
          icon: <Endorsed />,
          heading: `${organizationStatistics[0]?.total_hours || 0}`,
          subheading: 'organizations.totalHours',
        },
      ]
    : undefined;

  return (
    <div className={styles.ViewOrganizations}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {organization?.name}
      </h3>
      <div className={styles.Heading}>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('organizations.organizations'), url: '/organizations' },
            {
              label: `${organization?.name}`,
              url: `/organizations/${organization?.id}`,
            },
          ]}
        />
        <Button onClick={() => navigate('edit')}>{t('actions.edit')}</Button>
      </div>
      {/* <MetricsOrganization /> */}
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
            LeftSideComponent={<LeftSideComponent data={organization} />}
            RightSideComponent={
              <RightSideComponent
                statCardsData={statsCardData}
                heading={t('objects.objects')}
                buttonText={t('objects.add')}
              />
            }
            Table={
              <ObjectsTable
                objects={objects}
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

export default ViewOrganization;
