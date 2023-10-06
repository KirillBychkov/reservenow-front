import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import Button from '@/components/UI/buttons/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import styles from './addClientForm.module.scss';
import { useTranslation } from 'react-i18next';
import UserService from '@/services/userService';
import { UserStatus } from '@/types/enums/user';
import { observer } from 'mobx-react-lite';
import clientsStore from '@/store/ClientsStore';

export interface PlainClientInfo {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  description: string;
  status: UserStatus;
}

interface Props {
  initialValues?: PlainClientInfo;
}

const AddClientForm: React.FC<Props> = observer(({ initialValues }) => {
  const { t } = useTranslation();

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
    companyName: Yup.string().required(t('invalid.required')),
  });

  const formData: PlainClientInfo = initialValues || {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    companyName: '',
    description: '',
    status: UserStatus.PENDING,
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (initialValues) {
          await UserService.updateUser(initialValues.id || 0, {
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
            domain_url: values.companyName,
            description: values.description,
          });

          return;
        }

        await UserService.createUser({
          email: values.email,
          status: values.status,
          user: {
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
            domain_url: values.companyName,
            description: values.description,
          },
        });

        resetForm();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
  });

  const handleDeleteUser = async () => {
    if (!initialValues) {
      return;
    }
    return await clientsStore.deleteClient(initialValues.id!);
  };

  const handleClearForm = () => formik.resetForm();

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
            mask='+38 (999) 999-9999'
            placeholder='+38 (___) ___-____'
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
            onClick={handleDeleteUser}
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

export default AddClientForm;
