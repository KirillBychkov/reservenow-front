import {
  ItemTemplateOptions,
  FileUpload as PrFileUpload,
} from 'primereact/fileupload';
import { ChangeEvent, ReactNode, RefObject } from 'react';
import Button from '../buttons/button';
import styles from './FileUpload.module.scss';
import { useTranslation } from 'react-i18next';
import { Cross, Media } from '@blueprintjs/icons';

// TODO:
// refactor Props to extend FileUploadProps from primereact
// check ./dropdown/customDropdown or ./buttons/button for example
// show initialValues url as attached file too
// check ./links/viewImage.tsx for example

type Props = {
  fileUploadRef: RefObject<PrFileUpload>;
  buttonText?: string;
  emptyTemplate?: ReactNode;
  itemTemplate?:
    | ReactNode
    | ((file: object, options: ItemTemplateOptions) => ReactNode);
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  fileName: string;
};

export const FileUpload = ({
  fileUploadRef,
  emptyTemplate,
  itemTemplate,
  buttonText,
  onChange,
  onClear,
  fileName,
}: Props) => {
  const { t } = useTranslation();

  const template = () => {
    return (
      <>
        <input id='file' type='file' onChange={onChange} hidden />
        <label className={styles.label} htmlFor='file'>
          {emptyTemplate || (
            <>
              <div className={styles.icon}>
                <Media color='white' size={22} />
              </div>
              <p>{t('contact-us.howToAddFile')}</p>
              <Button type='button' className={styles.btn} outlined>
                {buttonText || t('contact-us.addFile')}
              </Button>
            </>
          )}
        </label>
      </>
    );
  };

  return (
    <div>
      <PrFileUpload
        headerTemplate={() => null}
        emptyTemplate={template}
        itemTemplate={template || itemTemplate}
        ref={fileUploadRef}
      />
      {fileName && (
        <div className={styles.fileContainer}>
          <p className="paragraph paragraph--normal">
            {t("actions.addImage")}
          </p>
          <Cross color="#7961db" className={styles.cross} onClick={onClear} />
        </div>
      )}
    </div>
  );
};
