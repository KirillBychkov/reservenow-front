import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useContext, useMemo } from 'react';
import styles from './openRequest.module.scss';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import supportRecordsStore from '@/store/SupportRecordsStore';
import { useTranslation } from 'react-i18next';
import { ProgressSpinner } from 'primereact/progressspinner';
import { PlainSupportRecordInfo } from '@/types/support';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';
import OpenRequestForm from '@/components/forms/openRequestForm';

const OpenRequest: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const { id } = useParams();
  const {
    data: initialValues,
    errorMsg,
    isLoading,
  } = useFetch<PlainSupportRecordInfo>(() => {
    return supportRecordsStore.getPlainSupportRecordInfo(parseInt(id || '0'));
  }, [id]);

  if (errorMsg) {
    showError(errorMsg);
  }

  const requestInfoList = useMemo(() => {
    if (!initialValues) return null;
    const neededKeys = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'clientDescription',
    ];
    return Object.entries(initialValues).map(([key, value], index) => {
      if (!neededKeys.includes(key) || !value) return null;
      return (
        <div className={styles.requestInfoItem} key={index}>
          <h4 className='heading heading-4'>{t(`forms.${key}`)}</h4>
          <p className='paragraph'>{value}</p>
        </div>
      );
    });
  }, [initialValues, t]);

  return (
    <div className={styles.openRequest}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {`${t('requests.request')} #${initialValues?.id}`}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('requests.requests'), url: '/requests' },
          {
            label: `${initialValues?.id}`,
            url: `/requests/${initialValues?.id}`,
          },
        ]}
      />
      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <>
          <div className={styles.request}>
            <h3 className='heading heading-3 heading-primary'>{`${t(
              'requests.request'
            )} #${initialValues?.id}`}</h3>
            {requestInfoList}
          </div>
          <OpenRequestForm initialValues={initialValues ?? undefined} />
        </>
      )}
    </div>
  );
});

export default OpenRequest;
