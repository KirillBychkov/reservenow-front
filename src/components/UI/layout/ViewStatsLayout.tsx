import React from 'react';
import styles from './ViewStatsLayout.module.scss';

interface ViewStatsLayoutProps {
  LeftSideComponent: React.ReactNode;
  RightSideComponent: React.ReactNode;
}

const ViewStatsLayout: React.FC<ViewStatsLayoutProps> = ({
  LeftSideComponent,
  RightSideComponent,
}) => {
  return (
    <div className={styles.FlexContainer}>
      <div className={styles.LeftSide}>{LeftSideComponent}</div>
      <div className={styles.RightSide}>{RightSideComponent}</div>
    </div>
  );
};

export default ViewStatsLayout;
