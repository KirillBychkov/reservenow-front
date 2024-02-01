import {
  FileUpload as PrFileUpload,
  FileUploadProps,
} from 'primereact/fileupload';
import { ChangeEvent, ReactNode, RefObject } from 'react';
import Button from '../buttons/button';
import styles from './FileUpload.module.scss';
import { useTranslation } from 'react-i18next';
import { Cross, Media } from '@blueprintjs/icons';

type Props = {
  fileUploadRef: RefObject<PrFileUpload>;
  buttonText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
} & FileUploadProps;

export const FileUpload = ({
  fileUploadRef,
  emptyTemplate,
  itemTemplate,
  buttonText,
  onChange,
  onClear,
  onBeforeDrop,
  fileName,
  ...rest
}: Props) => {
  const { t } = useTranslation();

  const template = () => {
    return (
      <>
        <input id='file' type='file' onChange={onChange} hidden />
        <label className={styles.label} htmlFor='file'>
          {(emptyTemplate as ReactNode) || (
            <>
              <div className={styles.icon}>
                <Media color='white' size={22} />
              </div>
              <p className='heading heading-6 heading-disabled '>
                {t('contact-us.howToAddFile')}
              </p>
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
        onBeforeDrop={onBeforeDrop}
        itemTemplate={template || itemTemplate}
        ref={fileUploadRef}
        {...rest}
      />
      {fileName && (
        <div className={styles.fileContainer}>
          <p className='paragraph paragraph--normal'>{fileName}</p>
          <Cross color='#7961db' className={styles.cross} onClick={onClear} />
        </div>
      )}
    </div>
  );
};
