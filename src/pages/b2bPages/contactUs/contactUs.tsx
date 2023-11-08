import Flex from "@/components/UI/layout/flex";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import styles from "./contactUs.module.scss";
import Button from "@/components/UI/buttons/button";
import { useTranslation } from "react-i18next";
import { RefObject, useRef, useState } from "react";

const ContactUs = () => {
  const { t } = useTranslation();
  const fileUploadRef = useRef<FileUpload>(null);

  return (
    <Flex className={styles.page} options={{ direction: "column", gap: 2.375 }}>
      {/* TODO: localization */}
      <h3 className="heading heading-3">{t("contact-us.heading")}</h3>

      <form
        className={styles.formContainer}
        onSubmit={(e) => {
          e.preventDefault();

          console.log(fileUploadRef.current?.getFiles()[0]);
        }}
      >
        <div className={styles.formBody}>
          <h4 className="heading heading-4 heading-primary">
            {t("forms.overallInfo")}
          </h4>

          <Flex options={{ direction: "column", gap: 0.25 }}>
            <h6 className="heading heading-6">{t("forms.enterMessage")}</h6>
            <InputTextarea
              autoResize
              pt={{ root: { className: styles.message } }}
              placeholder="Введіть опис"
            />
            
            <CustomFileUpload fileUploadRef={fileUploadRef} />
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

type Props = {
  fileUploadRef: RefObject<FileUpload>;
};

const CustomFileUpload = ({ fileUploadRef }: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const fileClear = () => {
    fileUploadRef.current?.clear();
    setFileName(null);
  };

  const headerTemplate = () => null;

  const emptyTemplate = () => {
    return (
      <Flex
        options={{
          justify: "center",
          direction: "column",
          align: "center",
          gap: 1,
        }}
      >
        <p>Перетягніть файл сюди або натисніть «Додати файл».</p>
        <Button outlined>
          <input
            id="file"
            type="file"
            onChange={(e) => {
              const file = e.target.files![0];
              fileUploadRef.current?.setFiles([file]);
              setFileName(file.name);
            }}
            hidden
          />
          <label style={{ height: "100%" }} htmlFor="file">
            Choose File
          </label>
        </Button>
      </Flex>
    );
  };

  return (
    <Flex options={{ direction: "column", gap: 0.25 }}>
      <h6 className="heading heading-6">Виберіть файл</h6>
      <FileUpload
        headerTemplate={headerTemplate}
        emptyTemplate={emptyTemplate}
        itemTemplate={emptyTemplate}
        ref={fileUploadRef}
      />

      <div
        style={{
          width: "286px",
          height: "40px",
          backgroundColor: "#F9F9FC",
        }}
      >
        {fileName ? fileName : "Виберіть файл"}
        <Button onClick={fileClear}>Close</Button>
      </div>
    </Flex>
  );
};

export default ContactUs;
