import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';

export default function FormFileUpload() {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current?.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const emptyTemplate = () => {
    return (
      <div className='flex align-items-center flex-column'>
        <i
          className='pi pi-image mt-3 p-5'
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className='my-5'
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className:
      'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target='.custom-choose-btn' content='Choose' position='bottom' />
      <Tooltip target='.custom-upload-btn' content='Upload' position='bottom' />
      <Tooltip target='.custom-cancel-btn' content='Clear' position='bottom' />

      <FileUpload
        ref={fileUploadRef}
        name='demo[]'
        url='/api/upload'
        multiple
        accept='image/*'
        maxFileSize={200000}
        onUpload={onTemplateUpload}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
}
