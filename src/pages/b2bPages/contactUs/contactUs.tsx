import Flex from '@/components/UI/layout/flex';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from './contactUs.module.scss';
import Button from '@/components/UI/buttons/button';
import { useTranslation } from 'react-i18next';
import { FileUpload } from '@/components/UI/fileUpload/FileUpload';
import { useContext } from 'react';
import { useFormik } from 'formik';
import { CreateSupportDTO } from '@/models/requests/SupportRequests';
import { observer } from 'mobx-react-lite';
import supportRecordsStore from '@/store/SupportRecordsStore';
import ToastContext from '@/context/toast';
import { useFileUpload } from '@/hooks/useFileUpload';

const ContactUs = observer(() => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useContext(ToastContext);
  const { ref, handleSelect, handleClearFile, fileName } = useFileUpload();

  const formik = useFormik<CreateSupportDTO>({
    initialValues: {
      client_description: '',
    },
    onSubmit: async (values) => {
      const { client_description } = values;
      const file = ref.current?.getFiles()[0];

      const { successMsg, errorMsg } =
        await supportRecordsStore.createSupportRecord(client_description, file);

      if (successMsg) {
        showSuccess(successMsg);
      }

      if (errorMsg) {
        showError(errorMsg);
      }

      clearForm();
    },
  });

  const clearForm = () => {
    formik.resetForm();
    handleClearFile();
  };

  return (
    <Flex className={styles.page} options={{ direction: 'column', gap: 2.375 }}>
      <h3 className='heading heading-3'>{t('contact-us.heading')}</h3>

      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <div className={styles.formBody}>
          <h4 className='heading heading-4 heading-primary'>
            {t('forms.overallInfo')}
          </h4>

          <Flex options={{ direction: 'column', gap: 1 }}>
            <Flex options={{ direction: 'column', gap: 0.25 }}>
              <h6 className='heading heading-6'>{t('forms.enterMessage')}</h6>
              <InputTextarea
                name='client_description'
                value={formik.values.client_description}
                onChange={formik.handleChange}
                autoResize
                rows={8}
                placeholder={t('forms.enterDescription')}
              />
            </Flex>

            <Flex options={{ direction: 'column', gap: 0.25 }}>
              <h6 className='heading heading-6'>{t('forms.chooseFile')}</h6>
              <FileUpload
                fileUploadRef={ref}
                onChange={handleSelect}
                onClear={handleClearFile}
                fileName={fileName}
              />
            </Flex>
          </Flex>
        </div>

        <div className={styles.formFooter}>
          <Button fill type='submit' className={styles.btn}>
            {t('actions.send')}
          </Button>
        </div>
      </form>
    </Flex>
  );
});

export default ContactUs;
