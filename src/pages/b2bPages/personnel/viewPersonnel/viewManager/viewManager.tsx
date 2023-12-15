import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import { Manager } from '@/models/Manager';
import personnelStore from '@/store/personnelStore';
import { ChevronLeft, Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './viewManager.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';

const ViewManager: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showError } = useContext(ToastContext);

  const {
    data: manager,
    isLoading,
    errorMsg,
  } = useFetch<Manager>(
    () => personnelStore.getManager(parseInt(id || '0')),
    [id],
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  return (
    <div className={styles.viewManager}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {`${manager?.first_name || ''} ${manager?.last_name || ''}`}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('personnel.personnel'), url: '/personnel' },
          {
            label: `${manager?.id}`,
            url: `/personnel/manager/${manager?.id}`,
          },
        ]}
      />
      {isLoading || !manager ? (
        <ProgressSpinner />
      ) : (
        <div className={styles.manager}>
          <a
            className={classNames(
              'heading heading-4 heading-primary',
              styles.back,
            )}
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
            {t('actions.goBack')}
          </a>

          <div className={styles.managerInfo}>
            <h4
              className={classNames(
                'heading heading-4 heading-primary',
                styles.managerInfoHeading,
              )}
            >
              {t('forms.overallInfo')}
            </h4>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-4'>{t(`personnel.role`)}</h4>
              <p className='paragraph'>{t('personnel.manager')}</p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-4'>{t(`forms.firstName`)}</h4>
              <p className='paragraph'>{manager.first_name}</p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-4'>{t(`forms.lastName`)}</h4>
              <p className='paragraph'>{manager.last_name}</p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-4'>{t(`forms.email`)}</h4>
              <p className='paragraph'>{manager.account?.email || ''}</p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-4'>{t(`forms.phone`)}</h4>
              <p className='paragraph'>{manager.phone}</p>
            </div>
            {manager.description && (
              <div className={styles.managerInfoItem}>
                <h4 className='heading heading-4'>{t(`forms.description`)}</h4>
                <p className='paragraph'>{manager.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default ViewManager;
