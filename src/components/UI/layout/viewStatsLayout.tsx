import React from 'react';
import styles from './viewStatsLayout.module.scss';

interface ViewStatsLayoutProps {
  LeftSideComponent: React.ReactNode;
  RightSideComponent: React.ReactNode;
  Table: React.ReactNode;
}

const ViewStatsLayout: React.FC<ViewStatsLayoutProps> = ({
  LeftSideComponent,
  RightSideComponent,
  Table,
}) => {
  return (
    <div className={styles.FlexContainer}>
      <div className={styles.LeftSide}>{LeftSideComponent}</div>
      <div className={styles.RightSide}>
        {RightSideComponent}
        <div className={styles.BottomTable}>{Table}</div>
      </div>
    </div>
  );
};

export default ViewStatsLayout;
