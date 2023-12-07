import { ReactNode } from 'react';
import Flex from './flex';
import styles from './clientPageLayout.module.scss';

type Props = {
  leftSideComponent: ReactNode;
  rightSideComponent: ReactNode;
  table: ReactNode;
};

const ClientPageLayout = ({
  leftSideComponent,
  rightSideComponent,
  table,
}: Props) => {
  return (
    <Flex options={{ gap: 1.5 }}>
      {leftSideComponent}

      <Flex
        className={styles.cardContainer}
        options={{ direction: 'column', gap: 1.5 }}
      >
        {rightSideComponent}
        {table}
      </Flex>
    </Flex>
  );
};

export default ClientPageLayout;
