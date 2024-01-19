import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import styles from './manageManagerForm.module.scss';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import FormField from '@/components/UI/fields/formField';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Manager } from '@/models/Manager';
import Button from '@/components/UI/buttons/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { observer } from 'mobx-react-lite';
import { ManagerFormData } from '@/types/manager';
import { createManager, updateManager } from './submitHandlers';
import ToastContext from '@/context/toast';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import personnelStore from '@/store/personnelStore';
import { useNavigate } from 'react-router-dom';

interface Props {
  initialValues?: Manager;
}

const ManageManagerForm: React.FC<Props> = observer(({ initialValues }) => {
  const { t, i18n } = useTranslation();
  const { showError, showSuccess } = useContext(ToastContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('invalid.required')),
    lastName: Yup.string().required(t('invalid.required')),
    email: Yup.string()
      .email(t('invalid.email'))
      .required(t('invalid.required')),
    phone: Yup.string().required(t('invalid.required')),
    description: Yup.string(),
  });

  if (initialValues) {
    initialValues = formatObjectIn(initialValues, i18n.language);
  }

  const formData: ManagerFormData = {
    firstName: initialValues?.first_name || '',
    lastName: initialValues?.last_name || '',
    phone: initialValues?.phone || '',
    email: initialValues?.account.email || '',
    description: initialValues?.description || '',
  };

  const handleClearForm = () => formik.resetForm();

  const onSubmit = async (values: ManagerFormData) => {
    const res = initialValues
      ? await updateManager(initialValues.id, values)
      : await createManager(values, handleClearForm);
    if (res.errorMsg) {
      showError(res.errorMsg);
      return;
    }
    showSuccess(res.successMsg);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit,
  });

  const handleDelete = async () => {
    if (!initialValues) {
      return;
    }

    const { successMsg, errorMsg } = await personnelStore.deleteManager(
      initialValues.id,
    );

    if (errorMsg) {
      showError(errorMsg);
      return;
    }

    showSuccess(successMsg);
    navigate('/personnel');
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formSection}>
        <h4 className='heading heading-4 heading-primary'>
          {t('forms.overallInfo')}
        </h4>
        <FormField label={t('personnel.role')}>
          <p className='paragraph-muted'>{t('personnel.manager')}</p>
        </FormField>
        <FormField
          label={t('forms.firstName')}
          isValid={!(formik.touched.firstName && formik.errors.firstName)}
          invalidMessage={formik.errors.firstName}
        >
          <InputText
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterName')}
            className={classNames(isValidClassname(formik, 'firstName'))}
          />
        </FormField>
        <FormField
          label={t('forms.lastName')}
          isValid={!(formik.touched.lastName && formik.errors.lastName)}
          invalidMessage={formik.errors.lastName}
        >
          <InputText
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterName')}
            className={classNames(isValidClassname(formik, 'lastName'))}
          />
        </FormField>
        <FormField
          label={t('forms.email')}
          isValid={!(formik.touched.email && formik.errors.email)}
          invalidMessage={formik.errors.email}
        >
          <InputText
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterEmail')}
            className={classNames(isValidClassname(formik, 'email'))}
            disabled={!!initialValues}
          />
        </FormField>
        <FormField
          label={t('forms.phone')}
          isValid={!(formik.touched.phone && formik.errors.phone)}
          invalidMessage={formik.errors.phone}
        >
          <InputMask
            name='phone'
            mask='+38 (099) 999-9999'
            placeholder='+38 (0__) ___-____'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classNames(isValidClassname(formik, 'phone'))}
          />
        </FormField>
        <FormField label={t('objects.description')}>
          <InputTextarea
            autoResize
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder={t('forms.enterDescription')}
            rows={6}
          />
        </FormField>
      </div>
      <div className={styles.Controls}>
        {initialValues?.id && (
          <Button
            severity='secondary'
            fill
            className={styles.Button}
            outlined
            onClick={handleDelete}
          >
            {t('actions.delete')}
          </Button>
        )}
        <Button
          severity='danger'
          fill
          className={styles.Button}
          onClick={handleClearForm}
        >
          {t('actions.cancel')}
        </Button>
        <Button type='submit' fill className={styles.Button}>
          {initialValues ? t('personnel.edit') : t('personnel.add')}
        </Button>
      </div>
    </form>
  );
});

export default ManageManagerForm;
