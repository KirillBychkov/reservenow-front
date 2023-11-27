import { FileUpload } from 'primereact/fileupload';
import { ChangeEvent, useRef, useState } from 'react';

export const useFileUpload = () => {
  const ref = useRef<FileUpload>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file) {
      return;
    }

    ref.current?.setFiles([file]);
    setFileName(file.name);
  };

  const handleClearFile = () => {
    ref.current?.clear();
    setFileName('');
  };

  return {
    ref,
    handleSelect,
    handleClearFile,
    fileName,
  };
};
