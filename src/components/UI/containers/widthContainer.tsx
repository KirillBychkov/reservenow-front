import styles from './widthContainer.module.scss';

interface WidthContainerProps {
  children: React.ReactNode;
}

const WidthContainer: React.FC<WidthContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default WidthContainer;
