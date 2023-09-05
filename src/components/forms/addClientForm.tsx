import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/input/input';
import Button from '@/components/UI/buttons/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import styles from './addClientForm.module.scss';
import { User, UserStatus, StatusOptions } from '@/types/user';
import { Dropdown } from 'primereact/dropdown';

interface AddClientFormProps {
  initialValues?: User;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ initialValues }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    companyName: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      companyName: '',
      description: '',
      status: UserStatus.PENDING,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // TODO: implement submit functionality
      resetForm();
    },
  });

  const handleDeleteUser = () => {
    // TODO: implement delete functionality
  };

  const handleClearForm = () => formik.resetForm();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.form}>
        <h4 className='heading-4 heading-primary'>Загальна інформація</h4>
        <FormField
          label="Ім'я*"
          isValid={!(formik.touched.firstName && formik.errors.firstName)}
          invalidMessage={formik.errors.firstName}
        >
          <InputText
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ім'я"
            className={classNames(isValidClassname(formik, 'firstName'))}
          />
        </FormField>
        <FormField
          label='Прізвище*'
          isValid={!(formik.touched.lastName && formik.errors.lastName)}
          invalidMessage={formik.errors.lastName}
        >
          <InputText
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Прізвище'
            className={classNames(isValidClassname(formik, 'lastName'))}
          />
        </FormField>
        <FormField
          label='Номер телефону*'
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
        <FormField
          label='Електронна адреса*'
          isValid={!(formik.touched.email && formik.errors.email)}
          invalidMessage={formik.errors.email}
        >
          <InputText
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Електронна адреса'
            className={classNames(isValidClassname(formik, 'email'))}
          />
        </FormField>
        <FormField
          label='Назва компанії*'
          isValid={!(formik.touched.companyName && formik.errors.companyName)}
          invalidMessage={formik.errors.companyName}
        >
          <InputText
            name='companyName'
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Назва компанії'
            className={classNames(isValidClassname(formik, 'companyName'))}
          />
        </FormField>
        <FormField label='Опис'>
          <InputTextarea
            autoResize
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder='Введіть опис'
          />
        </FormField>
        {initialValues && (
          <FormField label='Статус'>
            <Dropdown
              className={styles.dropdown}
              name='status'
              value={formik.values.status}
              onChange={formik.handleChange}
              options={StatusOptions}
            />
          </FormField>
        )}
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
            Видалити
          </Button>
        )}
        <Button
          severity='danger'
          fill
          className={styles.button}
          onClick={handleClearForm}
        >
          Скасувати
        </Button>
        <Button type='submit' fill className={styles.button}>
          Зберегти
        </Button>
      </div>
    </form>
  );
};

export default AddClientForm;
