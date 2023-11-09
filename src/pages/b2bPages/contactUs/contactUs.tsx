import Flex from "@/components/UI/layout/flex";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload as PrFileUpload } from "primereact/fileupload";
import styles from "./contactUs.module.scss";
import Button from "@/components/UI/buttons/button";
import { useTranslation } from "react-i18next";
import { FileUpload } from "@/components/UI/fileUpload/FileUpload";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { ICreateSupportDTO } from "@/models/requests/SupportRequests";
import { Cross } from "@blueprintjs/icons";

const ContactUs = () => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | null>(null);
  const fileUploadRef = useRef<PrFileUpload>(null);
  const formik = useFormik<ICreateSupportDTO>({
    initialValues: {
      client_description: "",
    },
    onSubmit: (values) => {
      const { client_description } = values;
      const file = fileUploadRef.current?.getFiles()[0];

      // TODO Logic to create support record and image for it

      clearForm();
    },
  });

  const handlerClearFile = () => {
    fileUploadRef.current?.clear();
    setFileName(null);
  };

  const clearForm = () => {
    formik.resetForm();
    handlerClearFile();
  };

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
  };

  return (
    <Flex className={styles.page} options={{ direction: "column", gap: 2.375 }}>
      <h3 className="heading heading-3">{t("contact-us.heading")}</h3>

      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <div className={styles.formBody}>
          <h4 className="heading heading-4 heading-primary">
            {t("forms.overallInfo")}
          </h4>

          <Flex options={{ direction: "column", gap: 1 }}>
            <Flex options={{ direction: "column", gap: 0.25 }}>
              <h6 className="heading heading-6">{t("forms.enterMessage")}</h6>
              <InputTextarea
                name="client_description"
                value={formik.values.client_description}
                onChange={formik.handleChange}
                autoResize
                rows={8}
                placeholder={t('forms.enterDescription')}
              />
            </Flex>

            <Flex options={{ direction: "column", gap: 0.25 }}>
              <h6 className="heading heading-6">{t("forms.chooseFile")}</h6>
              <FileUpload
                fileUploadRef={fileUploadRef}
                buttonText={t("actions.addImage")}
                onSelect={handleFileSelect}
              />
              <div className={styles.fileContainer}>
                <p className="paragraph paragraph--normal">
                  {fileName || t("actions.addImage")}
                </p>
                <Cross
                  color="#7961db"
                  className={styles.cross}
                  onClick={handlerClearFile}
                />
              </div>
            </Flex>
          </Flex>
        </div>

        <div className={styles.formFooter}>
          <Button fill type="submit" className={styles.btn}>
            {t("actions.send")}
          </Button>
        </div>
      </form>
    </Flex>
  );
};

export default ContactUs;
