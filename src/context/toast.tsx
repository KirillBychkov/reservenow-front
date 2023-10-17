import { createContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

interface ToastContextData {
  toastRef: React.MutableRefObject<Toast | null>;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
  showWarn: (message: string) => void;
  showError: (message: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export default ToastContext;

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toastRef = useRef<Toast | null>(null);

  const showSuccess = (message: string) => {
    toastRef.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  };

  const showInfo = (message: string) => {
    toastRef.current?.show({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life: 3000,
    });
  };

  const showWarn = (message: string) => {
    toastRef.current?.show({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string) => {
    toastRef.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  };

  return (
    <ToastContext.Provider
      value={{ toastRef, showSuccess, showError, showInfo, showWarn }}
    >
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
