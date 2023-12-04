import Button from '@/components/UI/buttons/button';
import styles from './rightSide.module.scss';
import StatsCard from '../statsCard';
import { useNavigate } from 'react-router-dom';
import { Plus } from '@blueprintjs/icons';
import Searchbar from '@/components/searchbar/searchbar';
import { BankAccount, Endorsed, ShoppingCart } from '@blueprintjs/icons';

export interface StatsCardsData {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
}

const mockCardData = [
  {
    icon: <BankAccount />,
    heading: `UAH 26 124,12`,
    subheading: 'organizations.totalSales',
  },
  {
    icon: <ShoppingCart />,
    heading: `135`,
    subheading: 'organizations.totalBookings',
  },
  {
    icon: <Endorsed />,
    heading: `235`,
    subheading: 'organizations.totalClients',
  },
];

interface Props {
  heading: string;
  buttonText?: string;
  setSearch?: (search: string) => void;
  statCardsData?: StatsCardsData[];
}

const RightSide: React.FC<Props> = ({
  heading,
  buttonText,
  setSearch,
  statCardsData,
}) => {
  const navigate = useNavigate();

  const cardsData = statCardsData || mockCardData;

  return (
    <div className={styles.RightSide}>
      <div className={styles.TopCards}>
        {cardsData.map((card, index) => (
          <StatsCard
            key={index}
            icon={card.icon}
            heading={card.heading}
            subheading={card.subheading}
          />
        ))}
      </div>
      <div className={styles.BottomTable}>
        <div className={styles.TableHeader}>
          <h4 className='heading heading-4'>{heading}</h4>
          {buttonText && (
            <Button
              onClick={() => navigate('objects/add')}
              icon={<Plus color='white' />}
            >
              {buttonText}
            </Button>
          )}
          {setSearch && <Searchbar setSearch={setSearch} />}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
