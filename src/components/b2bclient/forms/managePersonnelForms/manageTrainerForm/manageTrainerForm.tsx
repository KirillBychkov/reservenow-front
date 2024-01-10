import FormField from '@/components/UI/fields/formField';
import { Trainer } from '@/models/Trainer';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import isValidClassname from '@/utils/isValidClassname';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import styles from './manageTrainerForm.module.scss';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import Button from '@/components/UI/buttons/button';
import { WorkingHours } from '@/components/UI/workingHours/workingHours';
import { transformWorkingHours } from '@/utils/formHelpers/formHelpers';
import { TrainerFormData } from '@/types/trainer';
import { createTrainer, updateTrainer } from './submitHandlers';
import ToastContext from '@/context/toast';

interface Props {
  initialValues?: Trainer;
}

const ManageTrainerForm: React.FC<Props> = ({ initialValues }) => {
  const { t, i18n } = useTranslation();
  const { showError, showSuccess } = useContext(ToastContext);

  if (initialValues) {
    initialValues = formatObjectIn(initialValues, i18n.language);
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('invalid.required')),
    lastName: Yup.string().required(t('invalid.required')),
    description: Yup.string(),
    phone: Yup.string().required(t('invalid.required')),
    price: Yup.number().required(t('invalid.required')),
    email: Yup.string()
      .required(t('invalid.required'))
      .email(t('invalid.email')),
  });

  const workingHours = transformWorkingHours<Trainer>(initialValues);

  const formData: TrainerFormData = {
    firstName: initialValues?.first_name || '',
    lastName: initialValues?.last_name || '',
    phone: initialValues?.phone || '',
    email: initialValues?.account?.email || '',
    description: initialValues?.description || '',
    price: initialValues?.price_per_hour || 0,
    workingHours,
  };

  const handleClearForm = () => {
    formik.resetForm();
    formik.setFieldValue('workingHours', workingHours);
  };

  const onSubmit = async (values: TrainerFormData) => {
    const res = initialValues
      ? await updateTrainer(initialValues.id, values)
      : await createTrainer(values);

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

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formSection}>
        <h4 className='heading heading-4 heading-primary'>
          {t('forms.overallInfo')}
        </h4>
        <FormField label={t('personnel.role')}>
          <p className='paragraph-muted'>{t('personnel.trainer')}</p>
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
            mask='+38 (999) 999-9999'
            placeholder='+38 (___) ___-____'
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
      <div className={styles.formSection}>
        <FormField
          label={t('forms.price')}
          isValid={!(formik.touched.price && formik.errors.price)}
          invalidMessage={formik.errors.price}
        >
          <InputNumber
            style={{ width: '100%' }}
            type='text'
            name='price'
            mode='currency'
            currency='UAH'
            locale='uk-UA'
            placeholder={t('forms.enterPrice')}
            value={formik.values.price}
            onChange={(e) => formik.setFieldValue('price', e.value)}
            onBlur={formik.handleBlur}
            className={classNames(isValidClassname(formik, 'price'))}
          />
        </FormField>
      </div>
      <WorkingHours formik={formik} />
      <div className={styles.Controls}>
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
};

export default ManageTrainerForm;
