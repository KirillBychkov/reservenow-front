import ModalContext from "@/context/modal";
import { IAccount } from "@/models/IUser";
import { useFormik } from "formik";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import FormField from "../UI/fields/formField";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import Flex from "../UI/layout/flex";
import Button from "../UI/buttons/button";
import styles from "./manageEquipmentForm.module.scss";
import { observer } from "mobx-react-lite";

type Props = {
  initialValues: IAccount;
};

export const EditProfileForm = observer(({ initialValues }: Props) => {
  const { showModal } = useContext(ModalContext);
  const { t } = useTranslation();

  const handleShowModalAndSubmit = async () => {
    const res = await showModal(t("forms.areYouSure"));
    if (res) {
      formik.handleSubmit();
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const handleResetForm = () => formik.resetForm();

  return (
    <form className={styles.formSection}>
      <h4 className="heading heading-4 heading-primary">
        {t("forms.overallInfo")}
      </h4>
      <FormField label={t("forms.firstName")}>
        <InputText
          name="user.first_name"
          value={formik.values.user?.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t("forms.enterFirstName")}
        />
      </FormField>

      <FormField label={t("forms.lastName")}>
        <InputText
          name="user.last_name"
          value={formik.values.user?.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t("forms.enterLastName")}
        />
      </FormField>

      <FormField label={t('profile.changeEmail')}>
        <InputText
          disabled
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormField>

      <FormField label={t('forms.phone')}>
        <InputMask
          name="user.phone"
          mask="+38 (999) 999-9999"
          placeholder="+38 (___) ___-____"
          value={formik.values.user?.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormField>

      <Flex options={{ justify: "flex-end", gap: 1 }}>
        <Button
          severity="danger"
          fill
          className={styles.btn}
          onClick={handleResetForm}
        >
          {t('actions.cancel')}
        </Button>
        <Button onClick={handleShowModalAndSubmit} fill className={styles.btn}>
          {t('actions.save')}
        </Button>
      </Flex>
    </form>
  );
});
