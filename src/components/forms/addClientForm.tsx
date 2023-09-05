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

const AddClientForm: React.FC = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    companyName: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      companyName: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.form}>
        <h4 className='heading-4 heading-primary'>Загальна інформація</h4>
        <FormField
          label="Ім'я*"
          isValid={!(formik.touched.name && formik.errors.name)}
          invalidMessage={formik.errors.name}
        >
          <InputText
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ім'я"
            className={classNames(isValidClassname(formik, 'name'))}
          />
        </FormField>
        <FormField
          label='Прізвище*'
          isValid={!(formik.touched.surname && formik.errors.surname)}
          invalidMessage={formik.errors.surname}
        >
          <InputText
            name='surname'
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Прізвище'
            className={classNames(isValidClassname(formik, 'surname'))}
          />
        </FormField>
        <FormField
          label='Номер телефону*'
          isValid={!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
          invalidMessage={formik.errors.phoneNumber}
        >
          <InputMask
            name='phoneNumber'
            mask='+38 (999) 999-9999'
            placeholder='+38 (___) ___-____'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classNames(isValidClassname(formik, 'phoneNumber'))}
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
      </div>
      <div className={styles.controls}>
        <Button severity='danger' fill onClick={() => formik.resetForm()}>
          Скасувати
        </Button>
        <Button type='submit' fill>
          Зберегти
        </Button>
      </div>
    </form>
  );
};

export default AddClientForm;
