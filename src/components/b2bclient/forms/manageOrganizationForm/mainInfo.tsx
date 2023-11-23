import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from './manageOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { CustomFormikProps } from '@/types/formik';
import FormField from '@/components/UI/fields/formField';
import { OrganizationFormData } from '@/types/organization';

export const MainInfo: React.FC<CustomFormikProps<OrganizationFormData>> = ({
  formik,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.section}>
      <h4 className='heading heading-4 heading-primary'>
        {t('forms.overallInfo')}
      </h4>
      <FormField label={t('organizations.name')}>
        <InputText
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('addOrganizationForm.enterName')}
        />
      </FormField>
      <FormField label={t('forms.description')}>
        <InputTextarea
          autoResize
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder={t('addOrganizationForm.enterDescription')}
          rows={6}
        />
      </FormField>
    </div>
  );
};
