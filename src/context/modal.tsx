import { Button } from 'primereact/button';
import Flex from '@/components/UI/layout/flex';
import { Dialog } from 'primereact/dialog';
import { createContext, useState, useRef } from 'react';
import { Cross } from '@blueprintjs/icons';
import { useTranslation } from 'react-i18next';

interface ModalContextData {
  showModal: (content: string) => Promise<boolean>;
}

const ModalContext = createContext<ModalContextData>({
  showModal: () => Promise.resolve(false),
});

export default ModalContext;

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const responseResolverRef = useRef<((value: boolean) => void) | null>(null);

  const onDeny = () => {
    responseResolverRef.current?.(false);
    setVisible(false);
  };

  const onAccept = () => {
    responseResolverRef.current?.(true);
    setVisible(false);
  };

  const showModal = async (content: string) => {
    setContent(content);
    setVisible(true);
    return new Promise<boolean>((resolve) => {
      responseResolverRef.current = resolve;
    });
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      <Dialog
        header='Header'
        visible={visible}
        style={{ maxWidth: '38rem', width: '100%' }}
        onHide={onDeny}
        closeOnEscape={true}
        closeIcon={<Cross color={'#5F6B7C'} size={20} />}
        footer={
          <Flex options={{ justify: 'flex-end', gap: 1 }}>
            <Button
              label={t('actions.cancel')}
              severity='danger'
              onClick={onDeny}
            />
            <Button label={t('actions.submit')} onClick={onAccept} autoFocus />
          </Flex>
        }
        resizable={false}
        dismissableMask={true}
      >
        <p className='paragraph'>{content}</p>
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};
