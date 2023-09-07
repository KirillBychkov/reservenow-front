import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import Button from '@/components/UI/buttons/button';
import styles from './signinForm.module.scss';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import { useTranslation } from 'react-i18next';

const SigninForm: React.FC = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('invalid.email'))
      .required(t('invalid.required')),
    password: Yup.string()
      .min(6, t('invalid.passwordLength'))
      .required(t('invalid.required')),
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
        <FormField
          label={t('forms.password')}
          isValid={!(formik.touched.password && formik.errors.password)}
          invalidMessage={formik.errors.password}
        >
          <Password
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterPassword')}
            className={classNames(isValidClassname(formik, 'password'))}
            toggleMask
            feedback={false}
          />
        </FormField>
      </div>
      <Button type='submit' fill>
        {t('actions.submit')}
      </Button>
    </form>
  );
};

export default SigninForm;
