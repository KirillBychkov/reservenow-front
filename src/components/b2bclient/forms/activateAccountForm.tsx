import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import Button from '@/components/UI/buttons/button';
import styles from './activateAccountForm.module.scss';
import { Password } from 'primereact/password';

import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';
import passwordStore from '@/store/PasswordStore';

const ActivateAccountForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(4, t('invalid.passwordLength'))
      .required(t('invalid.required')),
    confirmPassword: Yup.string()
      .min(1, t('invalid.required'))
      .oneOf([Yup.ref('password')], t('invalid.passwordMatch'))
      .required(t('invalid.required')),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { confirmPassword } = values;

      await passwordStore.confirmPassword(confirmPassword);
      passwordStore.isSuccess ? navigate('/signin') : null;
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.form}>
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
            placeholder={t('forms.b2benterPassword')}
            className={classNames(isValidClassname(formik, 'password'))}
            feedback={false}
          />
        </FormField>
        <FormField
          label={t('forms.b2bconfirmPassword')}
          isValid={
            !(formik.touched.confirmPassword && formik.errors.confirmPassword)
          }
          invalidMessage={formik.errors.confirmPassword}
        >
          <Password
            name='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.b2benterPassword')}
            className={classNames(isValidClassname(formik, 'confirmPassword'))}
            feedback={false}
          />
        </FormField>
      </div>
      <Button type='submit' fill>
        {t('actions.b2bsignup')}
      </Button>
    </form>
  );
});

export default ActivateAccountForm;
