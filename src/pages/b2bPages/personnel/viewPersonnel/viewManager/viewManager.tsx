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
import Button from '@/components/UI/buttons/button';

const ViewManager: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showError } = useContext(ToastContext);

  const { data: manager, isLoading } = useFetch<Manager>(
    () => personnelStore.getManager(parseInt(id || '0')),
    [id],
    { onError: showError },
  );

  return (
    <div className={styles.viewManager}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {`${manager?.first_name || ''} ${manager?.last_name || ''}`}
      </h3>
      <div className={styles.heading}>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('personnel.personnel'), url: '/personnel' },
            {
              label: `${manager?.first_name || ''} ${manager?.last_name || ''}`,
              url: `/personnel/manager/${manager?.id}`,
            },
          ]}
        />
        <Button onClick={() => navigate('edit')}>{t('actions.edit')}</Button>
      </div>
      {isLoading || !manager ? (
        <ProgressSpinner />
      ) : (
        <div className={styles.manager}>
          <a
            className={classNames(
              'heading heading-5 heading-primary',
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
              <h4 className='heading heading-6'>{t(`personnel.role`)}</h4>
              <p className='paragraph paragraph--normal'>
                {t('personnel.manager')}
              </p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-6'>{t(`forms.firstName`)}</h4>
              <p className='paragraph paragraph--normal'>
                {manager.first_name}
              </p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-6'>{t(`forms.lastName`)}</h4>
              <p className='paragraph paragraph--normal'>{manager.last_name}</p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-6'>{t(`forms.email`)}</h4>
              <p className='paragraph paragraph--normal'>
                {manager.account?.email || ''}
              </p>
            </div>
            <div className={styles.managerInfoItem}>
              <h4 className='heading heading-6'>{t(`forms.phone`)}</h4>
              <p className='paragraph paragraph--normal'>{manager.phone}</p>
            </div>
            {manager.description && (
              <div className={styles.managerInfoItem}>
                <h4 className='heading heading-6'>{t(`forms.description`)}</h4>
                <p className='paragraph paragraph--normal'>
                  {manager.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default ViewManager;
