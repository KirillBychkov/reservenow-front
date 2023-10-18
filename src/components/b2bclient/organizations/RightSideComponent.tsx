import styles from './RightSideComponent.module.scss';
import OrganizationStatsCard, { cardData } from './organizationStatsCard';

interface RightSideComponentProps {}

const RightSideComponent: React.FC<RightSideComponentProps> = ({}) => {
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
      <div className={styles.BottomTable}>Table</div>
    </div>
  );
};

export default RightSideComponent;
