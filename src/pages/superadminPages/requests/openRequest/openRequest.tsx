import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './openRequest.module.scss';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import supportRecordsStore, {
  PlainSupportRecordInfo,
} from '@/store/SupportRecordsStore';
import { useTranslation } from 'react-i18next';
import FormField from '@/components/UI/fields/formField';
import { Dropdown } from 'primereact/dropdown';
import { SupportStatus, SupportStatusOptions } from '@/types/enums/support';
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import Button from '@/components/UI/buttons/button';
import * as Yup from 'yup';
import SupportService from '@/services/supportService';
import isValidClassname from '@/utils/isValidClassname';

const OpenRequest: React.FC = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<
    PlainSupportRecordInfo | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(!!id);

  useEffect(() => {
    const getSupportRecord = async (id: number) => {
      try {
        setIsLoading(true);
        const supportRecord =
          await supportRecordsStore.getPlainSupportRecordInfo(id);
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

  const requestData = useMemo(() => {
    return {
      status: initialValues?.status || SupportStatus.IN_PROGRESS,
      description: initialValues?.resultDescription || '',
    };
  }, [initialValues]);

  const validationSchema = Yup.object({
    description: Yup.string().required(t('invalid.required')),
  });

  const formik = useFormik({
    initialValues: requestData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (!initialValues) return;
      try {
        const response = await SupportService.updateSupportRecordById(
          initialValues.id,
          {
            status: values.status,
            result_description: values.description,
          }
        );
        console.log(response);
      } catch (error) {
        console.error('Error updating support record:', error);
      }
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
              <FormField
                label={t('forms.description')}
                isValid={
                  !(formik.touched.description && formik.errors.description)
                }
                invalidMessage={formik.errors.description}
              >
                <InputTextarea
                  name='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t('forms.enterDescription')}
                  className={classNames(
                    isValidClassname(formik, 'description')
                  )}
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
