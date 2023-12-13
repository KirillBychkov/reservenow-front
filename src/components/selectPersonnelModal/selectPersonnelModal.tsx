import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import Flex from '../UI/layout/flex';
import Button from '../UI/buttons/button';
import { useNavigate } from 'react-router-dom';

interface Props {
  visible: boolean;
  setIsVisible: (value: boolean) => void;
}

const SelectPersonnelModal: React.FC<Props> = ({ visible, setIsVisible }) => {
  const naigate = useNavigate();

  const onClose = () => {
    setIsVisible(false);
  };

  const navigateToAddManager = () => {
    naigate('/personnel/manager/add');
    onClose();
  };

  const navigateToAddTrainer = () => {
    naigate('/personnel/trainer/add');
    onClose();
  };

  return (
    <Dialog
      header='Підтвердження'
      onHide={onClose}
      visible={visible}
      dismissableMask={true}
      draggable={false}
      style={{ maxWidth: '37.5rem', width: '100%' }}
    >
      <div style={{ maxWidth: '379px', width: '100%', margin: '0 auto' }}>
        <p className='text-center' style={{ marginBottom: '30px' }}>
          Виберіть персонал
        </p>
        <Flex options={{ gap: 1 }}>
          <Button fill onClick={navigateToAddManager}>
            Менеджер
          </Button>
          <Button fill onClick={navigateToAddTrainer}>
            Тренер
          </Button>
        </Flex>
      </div>
    </Dialog>
  );
};

export default SelectPersonnelModal;
