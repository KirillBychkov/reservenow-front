import { Password } from "primereact/password";
import FormField from "../UI/fields/formField";
import styles from "./passwordChangeForm.module.scss";
import Button from "../UI/buttons/button";
import Flex from "../UI/layout/flex";
import * as yup from "yup";
import { useFormik } from "formik";
import passwordStore from "@/store/PasswordStore";
import { IChangePasswordDTO } from "@/models/requests/PasswordRequests";
import classNames from "classnames";
import isValidClassname from "@/utils/isValidClassname";
import { useContext } from "react";
import ToastContext from "@/context/toast";
import { useTranslation } from "react-i18next";

type FormType = IChangePasswordDTO & {
  confirm_password: string;
};

type Props = {
  onSubmit?: (formData?: Partial<FormType>) => void;
};

const PasswordChangeForm = ({ onSubmit }: Props) => {
  const { showSuccess, showError } = useContext(ToastContext);
  const { t } = useTranslation();

  const validationSchema = yup.object({
    old_password: yup.string().required(t("invalid.required")),
    new_password: yup
      .string()
      .required(t("invalid.required"))
      .min(6, t("invalid.passwordLength")),
    confirm_password: yup
      .string()
      .required(t("invalid.required"))
      .oneOf([yup.ref("new_password")], t("invalid.confirmPasswordMustMatch")),
  });

  const initialValues: FormType = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const formik = useFormik<FormType>({
    validationSchema,
    initialValues,
    onSubmit: async ({ old_password, new_password }, { resetForm }) => {
      const { successMsg, errorMsg } = await passwordStore.changePassword({
        old_password,
        new_password,
      });

      if (errorMsg) {
        showError(errorMsg);
      }

      if (successMsg) {
        showSuccess(successMsg);
      }

      if (onSubmit) {
        onSubmit({ old_password, new_password });
      }

      resetForm();
    },
  });

  const handleFormReset = () => formik.resetForm();

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formSection}>
      <h4 className="heading heading-4 heading-primary">{t('profile.changePassword')}</h4>
      <FormField
        label={t('forms.oldPassword')}
        isValid={!(formik.touched.old_password && formik.errors.old_password)}
        invalidMessage={formik.errors.old_password}
      >
        <Password
          name="old_password"
          value={formik.values.old_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classNames(isValidClassname(formik, "old_password"))}
          placeholder={t('forms.enterPassword')}
          toggleMask
          feedback={false}
        />
      </FormField>

      <FormField
        label={t('forms.newPassword')}
        isValid={!(formik.touched.new_password && formik.errors.new_password)}
        invalidMessage={formik.errors.new_password}
      >
        <Password
          name="new_password"
          value={formik.values.new_password}
          placeholder={t('forms.enterPassword')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classNames(isValidClassname(formik, "new_password"))}
          toggleMask
          feedback={false}
        />
      </FormField>

      <FormField
        label={t('forms.b2bconfirmPassword')}
        isValid={
          !(formik.touched.confirm_password && formik.errors.confirm_password)
        }
        invalidMessage={formik.errors.confirm_password}
      >
        <Password
          name="confirm_password"
          value={formik.values.confirm_password}
          placeholder={t('forms.enterPassword')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classNames(isValidClassname(formik, "confirm_password"))}
          toggleMask
          feedback={false}
        />
      </FormField>

      <Flex options={{ justify: "flex-end", gap: 1 }}>
        <Button
          onClick={handleFormReset}
          severity="danger"
          fill
          className={styles.btn}
        >
          {t('actions.cancel')}
        </Button>
        <Button fill type="submit" className={styles.btn}>
          {t('actions.save')}
        </Button>
      </Flex>
    </form>
  );
};

export default PasswordChangeForm;
