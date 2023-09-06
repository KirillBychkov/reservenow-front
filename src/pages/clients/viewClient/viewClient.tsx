import React, { useMemo } from 'react';
import styles from './viewClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home, ChevronLeft } from '@blueprintjs/icons';
import classNames from 'classnames';
import { User } from '@/types/user';
import { useNavigate } from 'react-router-dom';

interface ViewClientProps {
  initialValues: User;
}

const ViewClient: React.FC<ViewClientProps> = ({ initialValues }) => {
  const navigate = useNavigate();

  const UserInfoList = useMemo(
    () =>
      Object.entries(initialValues).map(([key, value], index) => {
        if (key === 'id' || key === 'status' || !value) return null;
        return (
          <div className={styles.clientInfoItem} key={index}>
            <h4 className='heading heading-4'>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h4>
            <p className='paragraph'>{value}</p>
          </div>
        );
      }),
    [initialValues]
  );

  return (
    <div className={styles.viewClient}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {`${initialValues.firstName} ${initialValues.lastName}`}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: 'Клієнти', url: '/clients' },
          {
            label: `${initialValues.id}`,
            url: '/clients/view',
          },
        ]}
      />
      <div className={styles.client}>
        <a
          className={classNames(
            'heading heading-4 heading-primary',
            styles.back
          )}
          onClick={() => navigate('/clients')}
        >
          <ChevronLeft />
          Повернутися назад
        </a>
        <div className={styles.clientInfo}>
          <h4
            className={classNames(
              'heading heading-4 heading-primary',
              styles.status
            )}
          >
            Загальна інформація
            <span className='heading heading-4'>{initialValues.status}</span>
          </h4>
          {UserInfoList}
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
