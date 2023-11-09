import {
  ItemTemplateOptions,
  FileUpload as PrFileUpload,
} from "primereact/fileupload";
import { ChangeEvent, ReactNode, RefObject } from "react";
import Flex from "../layout/flex";
import Button from "../buttons/button";
import styles from "./FileUpload.module.scss";
import { useTranslation } from "react-i18next";

type Props = {
  fileUploadRef: RefObject<PrFileUpload>;
  buttonText?: string;
  emptyTemplate?: ReactNode;
  itemTemplate?:
    | ReactNode
    | ((file: object, options: ItemTemplateOptions) => ReactNode);
  onSelect?: (file: File) => void;
};

export const FileUpload = ({
  fileUploadRef,
  emptyTemplate,
  itemTemplate,
  buttonText,
  onSelect,
}: Props) => {
  const { t } = useTranslation()

  const handleFileSelectByButton = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (onSelect) {
      onSelect(file);
    }

    fileUploadRef.current?.setFiles([file]);
  };

  const template = () => {
    return (
      <>
        <input
          id="file"
          type="file"
          onChange={handleFileSelectByButton}
          hidden
        />
        <label className={styles.label} htmlFor="file">
          {emptyTemplate || (
            <Flex
              options={{
                justify: "center",
                direction: "column",
                align: "center",
                gap: 1,
              }}
            >
              <div className={styles.clip}></div>
              <p>{t('contact-us.howToAddFile')}</p>
              <Button type="button" className={styles.btn} outlined>
                {buttonText || t('contact-us.addFile')}
              </Button>
            </Flex>
          )}
        </label>
      </>
    );
  };

  return (
    <PrFileUpload
      headerTemplate={() => null}
      emptyTemplate={template}
      itemTemplate={template || itemTemplate}
      ref={fileUploadRef}
    />
  );
};
