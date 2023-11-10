import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from './addOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { IAddOrganizationInfo } from './addOrganizationForm';
import { CustomFormikProps } from '@/types/formik';

export const MainInfo: React.FC<CustomFormikProps<IAddOrganizationInfo>> = ({
  formik,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles['Form-MainInfo']}>
      <h4 className='heading heading-4 heading-primary'>
        {t('forms.overallInfo')}
      </h4>
      <div>
        <h6 className='heading-6'>{t('organizations.name')}</h6>
        {/* margin-bottom: 0.3rem; */}
        <InputText
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('addOrganizationForm.enterName')}
        />
      </div>

      <div>
        <h6 className='heading-6'>{t('forms.description')}</h6>

        <InputTextarea
          autoResize
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder={t('addOrganizationForm.enterDescription')}
          rows={6}
        />
      </div>
    </div>
  );
};
