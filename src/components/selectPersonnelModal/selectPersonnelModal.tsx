import { Dialog } from 'primereact/dialog';
import Flex from '../UI/layout/flex';
import Button from '../UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  visible: boolean;
  setIsVisible: (value: boolean) => void;
}

const SelectPersonnelModal: React.FC<Props> = ({ visible, setIsVisible }) => {
  const { t } = useTranslation();
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
      header={t('forms.confirmation')}
      onHide={onClose}
      visible={visible}
      dismissableMask={true}
      draggable={false}
      style={{ maxWidth: '37.5rem', width: '100%' }}
    >
      <div style={{ maxWidth: '379px', width: '100%', margin: '0 auto' }}>
        <p className='paragraph text-center' style={{ marginBottom: '30px' }}>
          {t('personnel.select')}
        </p>
        <Flex options={{ gap: 1 }}>
          <Button fill onClick={navigateToAddManager}>
            {t('personnel.manager')}
          </Button>
          <Button fill onClick={navigateToAddTrainer}>
            {t('personnel.trainer')}
          </Button>
        </Flex>
      </div>
    </Dialog>
  );
};

export default SelectPersonnelModal;
