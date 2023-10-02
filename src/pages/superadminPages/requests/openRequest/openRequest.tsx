import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './openRequest.module.scss';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import supportRecordsStore from '@/store/SupportRecordsStore';
import { ISupport } from '@/models/ISupport';
import { useTranslation } from 'react-i18next';
import FormField from '@/components/UI/fields/formField';
import { Dropdown } from 'primereact/dropdown';
import { SupportStatus, SupportStatusOptions } from '@/types/enums/support';
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import Button from '@/components/UI/buttons/button';

const OpenRequest: React.FC = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<ISupport | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(!!id);

  useEffect(() => {
    const getSupportRecord = async (id: number) => {
      try {
        setIsLoading(true);
        const supportRecord = await supportRecordsStore.getSupportRecordById(
          id
        );
        setInitialValues(supportRecord);
        console.log(supportRecord);
      } catch (error) {
        console.error('Error fetching support record:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) getSupportRecord(parseInt(id));
  }, [id]);

  const requestInfoList = useMemo(() => {
    if (!initialValues) return null;

    return Object.entries(initialValues).map(([key, value], index) => {
      if (!value) return null;
      return (
        <div className={styles.requestInfoItem} key={index}>
          <h4 className='heading heading-4'>{t(`forms.${key}`)}</h4>
          <p className='paragraph'>{value}</p>
        </div>
      );
    });
  }, [initialValues, t]);

  const requestData = useMemo(() => {
    return {
      status:
        (`${
          initialValues?.status?.charAt(0).toUpperCase() +
          (initialValues?.status?.slice(1) || '')
        }` as SupportStatus) || SupportStatus.IN_PROGRESS,
      description: initialValues?.result_description || '',
    };
  }, [initialValues]);

  const formik = useFormik({
    initialValues: requestData,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  const handleClearForm = () => {
    formik.resetForm();
  };

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
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.response}>
              <h3 className='heading heading-3 heading-primary'>{`${t(
                'requests.response'
              )} #${initialValues?.id}`}</h3>
              <FormField label={t('forms.status')}>
                <Dropdown
                  name='status'
                  style={{ width: '100%' }}
                  value={formik.values.status}
                  options={SupportStatusOptions}
                  onChange={formik.handleChange}
                />
              </FormField>
              <FormField label={t('forms.description')}>
                <InputTextarea
                  name='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder={t('forms.enterDescription')}
                />
              </FormField>
            </div>

            <div className={styles.controls}>
              <Button
                severity='danger'
                fill
                className={styles.button}
                onClick={handleClearForm}
              >
                {t('actions.clear')}
              </Button>
              <Button type='submit' fill className={styles.button}>
                {t('actions.submit')}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
});

export default OpenRequest;
