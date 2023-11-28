import Flex from '@/components/UI/layout/flex';
import styles from './forms.module.scss';
import FormField from '@/components/UI/fields/formField';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import Button from '@/components/UI/buttons/button';
import { useFormik } from 'formik';

const AddClientForm = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, { resetForm }) => {},
  });

  return (
    <form>
      <Flex options={{ direction: 'column', gap: 1.5 }}>
        <Flex
          className={styles.formSection}
          options={{ direction: 'column', gap: 1 }}
        >
          <h4 className='heading heading-4 heading-primary'>
            {t('forms.overallInfo')}
          </h4>
          <FormField label='Ім`я'>
            <InputText placeholder='Ім`я' />
          </FormField>

          <FormField label='Прізвище'>
            <InputText placeholder='Прізвище' />
          </FormField>

          <FormField label={t('forms.phone')}>
            <InputMask
              name='phone'
              mask='+38 (999) 999-9999'
              placeholder='+38 (___) ___-____'
            />
          </FormField>

          <FormField label={t('forms.description')}>
            <InputTextarea
              autoResize
              rows={7}
              placeholder={t('forms.enterDescription')}
            />
          </FormField>
        </Flex>

        <Flex options={{ justify: 'flex-end', gap: 1 }}>
          <Button severity='danger' fill className={styles.btn}>
            {t('actions.cancel')}
          </Button>
          <Button fill className={styles.btn}>
            {t('actions.save')}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default AddClientForm;
