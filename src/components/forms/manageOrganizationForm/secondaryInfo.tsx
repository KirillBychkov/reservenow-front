import isValidClassname from '@/utils/isValidClassname';
import classNames from 'classnames';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import styles from './manageOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { CustomFormikProps } from '@/types/formik';
import FormField from '@/components/UI/fields/formField';
import { OrganizationFormData } from '@/types/organization';

export const SecondaryInfo: React.FC<
  CustomFormikProps<OrganizationFormData>
> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.section}>
      <h4 className='heading heading-4 '>{t('forms.info')}</h4>

      <FormField
        label={t('addOrganizationForm.phone')}
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
      <FormField
        label={t('organizations.location')}
        isValid={!(formik.touched.address && formik.errors.address)}
        invalidMessage={formik.errors.address}
      >
        <InputText
          name='address'
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('addOrganizationForm.enterLocation')}
          className={classNames(isValidClassname(formik, 'address'))}
        />
      </FormField>
    </div>
  );
};
