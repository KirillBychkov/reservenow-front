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

    if (ref.current?.getFiles()) {
      handleClearFile();
    }

    ref.current?.setFiles([file]);
    setFileName(file.name);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    if (!e.dataTransfer || e.dataTransfer.files.length === 0) {
      return;
    }

    if (ref.current?.getFiles()) {
      handleClearFile();
    }

    const file = e.dataTransfer.files[0];

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
    handleDrop,
    handleClearFile,
    fileName,
  };
};
