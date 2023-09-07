import React, { useMemo } from 'react';
import styles from './viewClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home, ChevronLeft } from '@blueprintjs/icons';
import classNames from 'classnames';
import { User } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ViewClientProps {
  initialValues: User;
}

const ViewClient: React.FC<ViewClientProps> = ({ initialValues }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const UserInfoList = useMemo(
    () =>
      Object.entries(initialValues).map(([key, value], index) => {
        if (key === 'id' || key === 'status' || !value) return null;
        return (
          <div className={styles.clientInfoItem} key={index}>
            <h4 className='heading heading-4'>{t(`forms.${key}`)}</h4>
            <p className='paragraph'>{value}</p>
          </div>
        );
      }),
    [initialValues, t]
  );

  return (
    <div className={styles.viewClient}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {`${initialValues.firstName} ${initialValues.lastName}`}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('clients.clients'), url: '/clients' },
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
          {t('actions.goBack')}
        </a>
        <div className={styles.clientInfo}>
          <h4
            className={classNames(
              'heading heading-4 heading-primary',
              styles.status
            )}
          >
            {t('forms.overallInfo')}
            <span className='heading heading-4'>{initialValues.status}</span>
          </h4>
          {UserInfoList}
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
