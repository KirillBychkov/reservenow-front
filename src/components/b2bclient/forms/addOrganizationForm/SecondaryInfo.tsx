import isValidClassname from '@/utils/isValidClassname';
import classNames from 'classnames';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import styles from './addOrganizationForm.module.scss';

export const SecondaryInfo = ({ t, formik }: any) => (
  <div className={styles['Form-SecondaryInfo']}>
    <h4 className='heading heading-4 '>{t('forms.info')}</h4>

    <div>
      <h6 className='heading-6'>{t('addOrganizationForm.phone')}</h6>

      <InputMask
        name='phone'
        mask='+38 (999) 999-9999'
        placeholder='+38 (___) ___-____'
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={classNames(isValidClassname(formik, 'phone'))}
      />
    </div>
    <div>
      <h6 className='heading-6'>{t('addOrganizationForm.name')}</h6>

      <InputText
        name='address'
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={t('addOrganizationForm.enterLocation')}
        className={classNames(isValidClassname(formik, 'address'))}
      />
    </div>
  </div>
);
