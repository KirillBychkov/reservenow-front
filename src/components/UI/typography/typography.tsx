import classNames from 'classnames';
import styles from './typography.module.scss';

export const Heading1: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h1 className={styles.heading1}>{children}</h1>;
};

export const Heading2: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h2 className={styles.heading2}>{children}</h2>;
};

export const Heading3: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h3 className={styles.heading3}>{children}</h3>;
};

type ParagraphSize = 'normal' | 'large' | 'small';

export const Paragraph: React.FC<{
  children: React.ReactNode;
  size?: ParagraphSize;
}> = ({ children, size = 'normal' }) => {
  return (
    <p
      className={classNames(styles.paragraph, {
        [styles[`paragraph--${size}`]]: size,
      })}
    >
      {children}
    </p>
  );
};
