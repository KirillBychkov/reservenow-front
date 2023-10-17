import React, { useContext, useMemo } from 'react';
import styles from './viewClient.module.scss';
import statusStyles from '@/components/tables/status.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home, ChevronLeft } from '@blueprintjs/icons';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clientsStore from '@/store/ClientsStore';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import { PlainClientInfo } from '@/types/user';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';

const ViewClient: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const { id } = useParams();

  const {
    data: initialValues,
    isLoading,
    errorMsg,
  } = useFetch<PlainClientInfo>(
    () => clientsStore.getPlainClientInfo(parseInt(id || '0')),
    [id]
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  const userInfoList = useMemo(() => {
    if (!initialValues) return null;
    const neededKeys = [
      'firstName',
      'lastName',
      'phone',
      'email',
      'companyName',
      'description',
    ];
    return Object.entries(initialValues).map(([key, value], index) => {
      if (!neededKeys.includes(key) || !value) return null;
      return (
        <div className={styles.clientInfoItem} key={index}>
          <h4 className='heading heading-4'>{t(`forms.${key}`)}</h4>
          <p className='paragraph'>{value}</p>
        </div>
      );
    });
  }, [initialValues, t]);

  return (
    <div className={styles.viewClient}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {`${initialValues?.firstName || ''} ${initialValues?.lastName || ''}`}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('clients.clients'), url: '/clients' },
          {
            label: `${initialValues?.id}`,
            url: `/clients/${initialValues?.id}`,
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
        {isLoading ? (
          <ProgressSpinner />
        ) : (
          <div className={styles.clientInfo}>
            <h4
              className={classNames(
                'heading heading-4 heading-primary',
                styles.clientInfoHeading
              )}
            >
              {t('forms.overallInfo')}
              <span
                className={classNames(
                  'heading heading-4',
                  styles.status,
                  statusStyles.status,
                  statusStyles[initialValues?.status || '']
                )}
              >
                {t(`status.${initialValues?.status}`)}
              </span>
            </h4>
            {userInfoList}
          </div>
        )}
      </div>
    </div>
  );
});

export default ViewClient;
