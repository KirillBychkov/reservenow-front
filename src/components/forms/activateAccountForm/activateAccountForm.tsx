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
import authStore from '@/store/authStore';

const ActivateAccountForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const verifyToken = new URLSearchParams(window.location.search).get(
    'verify_token',
  );

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(4, t('invalid.passwordLength', { length: 4 }))
      .required(t('invalid.required')),
    confirmPassword: Yup.string()
      .min(1, t('invalid.required'))
      .oneOf([Yup.ref('password')], t('invalid.passwordMatch'))
      .required(t('invalid.required')),
  });

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = async (values: typeof initialValues) => {
    const { confirmPassword } = values;

    const res = await authStore.verify(confirmPassword, verifyToken);
    if (res.successMsg) {
      navigate('/signin');
      resetForm();
      return;
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
