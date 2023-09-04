import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/input/input';
import Button from '@/components/UI/buttons/button';
import styles from './signinForm.module.scss';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';

const SigninForm: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
            placeholder='Ваша електронна адреса'
            className={classNames(isValidClassname(formik, 'email'))}
          />
        </FormField>
        <FormField
          label='Пароль*'
          isValid={!(formik.touched.password && formik.errors.password)}
          invalidMessage={formik.errors.password}
        >
          <Password
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Ваш пароль'
            className={classNames(isValidClassname(formik, 'password'))}
            toggleMask
            feedback={false}
          />
        </FormField>
      </div>
      <Button type='submit' fill>
        Submit
      </Button>
    </form>
  );
};

export default SigninForm;
