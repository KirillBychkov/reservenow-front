import { PlainSupportRecordInfo, SupportRecordFormData } from '@/types/support';
import * as Yup from 'yup';
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { SupportStatus, SupportStatusOptions } from '@/types/enums/support';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import supportRecordsStore from '@/store/supportRecordsStore';
import ToastContext from '@/context/toast';
import FormField from '../../UI/fields/formField';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import Button from '../../UI/buttons/button';
import styles from './openRequestForm.module.scss';

interface Props {
  initialValues?: PlainSupportRecordInfo;
}

const OpenRequestForm: React.FC<Props> = observer(({ initialValues }) => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useContext(ToastContext);

  const formattedSupportStatusOptions = SupportStatusOptions.map((value) => {
    return {
      value,
      label: t(`status.${value}`),
    };
  });

  const validationSchema = Yup.object({
    resultDescription: Yup.string().required(t('invalid.required')),
    status: Yup.string().required(t('invalid.required')),
  });

  const formData: SupportRecordFormData = {
    status: initialValues?.status || SupportStatus.IN_PROGRESS,
    resultDescription: initialValues?.resultDescription || '',
  };

  const onSubmit = async (values: SupportRecordFormData) => {
    if (!initialValues) return;

    const { successMsg, errorMsg } =
      await supportRecordsStore.updateSupportRecord(initialValues.id, {
        status: values.status as SupportStatus,
        result_description: values.resultDescription,
      });
    if (successMsg) {
      showSuccess(successMsg);
    } else {
      showError(errorMsg);
    }
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit,
  });

  const handleClearForm = () => {
    formik.resetForm();
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.response}>
        <h3 className='heading heading-3 heading-primary'>{`${t(
          'requests.response',
        )} #${initialValues?.id}`}</h3>
        <FormField label={t('forms.status')}>
          <Dropdown
            name='status'
            style={{ width: '100%' }}
            value={formik.values.status}
            options={formattedSupportStatusOptions}
            onChange={formik.handleChange}
          />
        </FormField>
        <FormField
          label={t('forms.description')}
          isValid={
            !(
              formik.touched.resultDescription &&
              formik.errors.resultDescription
            )
          }
          invalidMessage={formik.errors.resultDescription}
        >
          <InputTextarea
            name='resultDescription'
            value={formik.values.resultDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterDescription')}
            className={classNames(
              isValidClassname(formik, 'resultDescription'),
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
  );
});

export default OpenRequestForm;
