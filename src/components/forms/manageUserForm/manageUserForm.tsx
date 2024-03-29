import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import Button from '@/components/UI/buttons/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import styles from './manageUserForm.module.scss';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import usersStore from '@/store/usersStore';
import { PlainUserInfo, UserFormData } from '@/types/user';
import ToastContext from '@/context/toast';
import ModalContext from '@/context/modal';
import { createUser, updateUser } from './submitHandlers';

interface Props {
  initialValues?: PlainUserInfo;
}

const ManageUserForm: React.FC<Props> = observer(({ initialValues }) => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useContext(ToastContext);
  const { showModal } = useContext(ModalContext);

  const handleShowModalAndDelete = async () => {
    const res = await showModal(t('forms.areYouSure'));
    if (res) {
      await handleDeleteUser();
    }
  };

  const handleDeleteUser = async () => {
    if (!initialValues) {
      return;
    }
    const { successMsg, errorMsg } = await usersStore.deleteUser(
      initialValues.id!,
    );
    if (errorMsg) {
      showError(errorMsg);
      return;
    }
    showSuccess(successMsg);
  };

  const handleClearForm = () => formik.resetForm();

  const validationSchema = Yup.object({
    id: Yup.number(),
    firstName: Yup.string().required(t('invalid.required')),
    lastName: Yup.string().required(t('invalid.required')),
    phone: Yup.string()
      .required(t('invalid.required'))
      .test('phone', t('invalid.phone'), (value) => {
        if (value) {
          return !value.includes('_');
        }
        return false;
      }),
    email: Yup.string()
      .email(t('invalid.email'))
      .required(t('invalid.required')),
    companyName: Yup.string()
      .required(t('invalid.required'))
      .test('companyName', t('invalid.companyName'), (value) => {
        if (value) {
          return /^[a-z0-9-]+$/.test(value);
        }
        return false;
      }),
  });

  const formData: UserFormData = initialValues || {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    companyName: '',
    description: '',
  };

  const onSubmit = async (values: UserFormData) => {
    const confirmed = await showModal(t('forms.areYouSure'));
    if (!confirmed) {
      return;
    }

    const { successMsg, errorMsg } = initialValues?.id
      ? await updateUser(values, initialValues.id)
      : await createUser(values, handleClearForm);

    if (errorMsg) {
      showError(errorMsg);
      return;
    }

    showSuccess(successMsg);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.form}>
        <h4 className='heading heading-4 heading-primary'>
          {t('forms.overallInfo')}
        </h4>
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
            placeholder={t('forms.enterFirstName')}
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
            placeholder={t('forms.enterLastName')}
            className={classNames(isValidClassname(formik, 'lastName'))}
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
        {!initialValues && (
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
            />
          </FormField>
        )}
        <FormField
          label={t('forms.companyName')}
          isValid={!(formik.touched.companyName && formik.errors.companyName)}
          invalidMessage={formik.errors.companyName}
        >
          <InputText
            name='companyName'
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterCompanyName')}
            className={classNames(isValidClassname(formik, 'companyName'))}
          />
        </FormField>
        <FormField label={t('forms.description')}>
          <InputTextarea
            autoResize
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder={t('forms.enterDescription')}
          />
        </FormField>
      </div>
      <div className={styles.controls}>
        {initialValues && (
          <Button
            severity='secondary'
            fill
            className={styles.button}
            outlined
            onClick={handleShowModalAndDelete}
          >
            {t('actions.delete')}
          </Button>
        )}
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

export default ManageUserForm;
