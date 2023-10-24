import Button from '@/components/UI/buttons/button';
import styles from './RightSideComponent.module.scss';
import OrganizationStatsCard, { cardData } from './organizationStatsCard';
import { useNavigate } from 'react-router-dom';
import { Plus } from '@blueprintjs/icons';

interface RightSideComponentProps {
  heading: string;
  buttonText: string;
}

const RightSideComponent: React.FC<RightSideComponentProps> = ({
  heading,
  buttonText,
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
          <Button onClick={() => navigate('add')} icon={<Plus color='white' />}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RightSideComponent;
