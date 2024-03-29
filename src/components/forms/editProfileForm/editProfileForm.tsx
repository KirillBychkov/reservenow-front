import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import styles from './editProfileForm.module.scss';
import { observer } from 'mobx-react-lite';
import { CroppImageModal } from '@/components/croppImageModal/croppImageModal';
import FormField from '@/components/UI/fields/formField';
import Flex from '@/components/UI/layout/flex';
import Button from '@/components/UI/buttons/button';
import * as Yup from 'yup';
import usersStore from '@/store/usersStore';
import ToastContext from '@/context/toast';
import { imageStringToFile } from '@/utils/cropImage';
import { Account, User } from '@/models/User';
import { formatPhoneOut } from '@/utils/formatters/formatPhone';

type Props = {
  initialValues: Account;
};

type FormType = User & {
  email: string;
};

export const EditProfileForm = observer(({ initialValues }: Props) => {
  const initialImage = initialValues.user?.image;
  const { t } = useTranslation();
  const { showSuccess, showError } = useContext(ToastContext);
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [visible, setVisible] = useState(false);
  const isAvatarChanged = image !== initialImage;

  const handleReset = () => {
    formik.resetForm();
    setImage(initialImage || null);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required(t('invalid.required')),
    last_name: Yup.string().required(t('invalid.required')),
    phone: Yup.string()
      .required(t('invalid.required'))
      .test('phone', t('invalid.phone'), (value) => {
        if (value) {
          return !value.includes('_');
        }
        return false;
      }),
  });

  const formik = useFormik<FormType>({
    initialValues: {
      email: initialValues.email,
      ...(initialValues.user as User),
    },
    validationSchema,
    onSubmit: async (values) => {

      const { successMsg, errorMsg } = await usersStore.updateUserFull(
        initialValues.user?.id as number,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          phone: formatPhoneOut(values.phone),
        },
        isAvatarChanged ? await imageStringToFile(image) : undefined,
      );

      if (errorMsg) {
        showError(errorMsg);
        return;
      }

      showSuccess(successMsg);
    },
  });

  const imgUrl = isAvatarChanged ? image : `${image}?${new Date().getTime()}`

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formSection}>
      <h4 className='heading heading-4 heading-primary'>
        {t('forms.overallInfo')}
      </h4>

      <Flex options={{ direction: 'column', gap: 0.25 }}>
        <p className='heading heading-6'>{t('forms.profilePhoto')}</p>
        <Flex
          className={styles.photoContainer}
          options={{ direction: 'column', gap: 0.75 }}
        >
          {imgUrl && image ? (
            <>
              <div className={styles.photoBg}>
                <img className={styles.photo} src={imgUrl} />
              </div>
              <Button onClick={handleOpen} outlined>
                {t('profile.updatePhoto')}
              </Button>
            </>
          ) : (
            <Button onClick={handleOpen} outlined>
              {t('profile.addPhoto')}
            </Button>
          )}
        </Flex>
      </Flex>

      <FormField
        label={t('forms.firstName')}
        isValid={!(formik.touched.first_name && formik.errors.first_name)}
        invalidMessage={formik.errors.first_name}
      >
        <InputText
          name='first_name'
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('forms.enterFirstName')}
        />
      </FormField>

      <FormField
        label={t('forms.lastName')}
        isValid={!(formik.touched.last_name && formik.errors.last_name)}
        invalidMessage={formik.errors.last_name}
      >
        <InputText
          name='last_name'
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('forms.enterLastName')}
        />
      </FormField>

      <FormField label={t('profile.changeEmail')}>
        <InputText
          disabled
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormField>

      <FormField
        label={t('forms.phone')}
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
        />
      </FormField>

      <Flex options={{ justify: 'flex-end', gap: 1 }}>
        <Button
          severity='danger'
          fill
          className={styles.btn}
          onClick={handleReset}
        >
          {t('actions.cancel')}
        </Button>
        <Button type='submit' fill className={styles.btn}>
          {t('actions.save')}
        </Button>
      </Flex>

      <CroppImageModal
        visible={visible}
        onHide={handleClose}
        onCropComplete={setImage}
      />
    </form>
  );
});
