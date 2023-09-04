import React from 'react';
import styles from './clients.module.scss';
import { Heading2, Heading3 } from '@/components/UI/typography/typography';
import { InputText } from 'primereact/inputtext';
import { Search, Plus, Export } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';

const Clients: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.clients}>
      <Heading3>Клієнти</Heading3>
      <div className={styles.controls}>
        <div className={styles.search}>
          <span className='p-input-icon-left'>
            <i>
              <Search color='gray'></Search>
            </i>
            <InputText placeholder='Search' className={styles.input} />
          </span>
          <div className={styles.buttonGroup}>
            <Button>Пошук</Button>
            <Button severity='secondary'>Очистити</Button>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Button icon={<Export color='white' />} severity='secondary'>
            Експорт
          </Button>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            Додати клієнта
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <Heading2 textColor='primary'>Наразі немає жодного клієнта</Heading2>
        <Button icon={<Plus color='white' onClick={() => navigate('add')} />}>
          Додати клієнта
        </Button>
      </div>
    </div>
  );
};

export default Clients;
