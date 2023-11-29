import Button from '@/components/UI/buttons/button';
import styles from './rightSideComponent.module.scss';
import OrganizationStatsCard, { cardData } from './organizationStatsCard';
import { useNavigate } from 'react-router-dom';
import { Plus } from '@blueprintjs/icons';
import Searchbar from '@/components/searchbar/searchbar';

interface RightSideComponentProps {
  heading: string;
  buttonText?: string;
  setSearch?: (search: string) => void;
}

const RightSideComponent: React.FC<RightSideComponentProps> = ({
  heading,
  buttonText,
  setSearch,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.RightSide}>
      <div className={styles.TopCards}>
        {cardData.map((card, index) => (
          <OrganizationStatsCard
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

export default RightSideComponent;
