import isValidClassname from '@/utils/isValidClassname';
import classNames from 'classnames';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import styles from './addOrganizationForm.module.scss';
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

      <FormField label={t('addOrganizationForm.phone')}>
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
      <FormField label={t('organizations.location')}></FormField>
      <InputText
        name='address'
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={t('addOrganizationForm.enterLocation')}
        className={classNames(isValidClassname(formik, 'address'))}
      />
    </div>
  );
};
