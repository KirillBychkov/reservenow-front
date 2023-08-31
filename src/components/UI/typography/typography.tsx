import classNames from 'classnames';
import styles from './typography.module.scss';

type textColor = 'primary' | 'error';
interface HeadingProps {
  children: React.ReactNode;
  textColor?: textColor;
}

export const Heading1: React.FC<HeadingProps> = ({ children, textColor }) => {
  return (
    <h1
      className={classNames(styles.heading, styles['heading-1'], {
        [styles[`heading-${textColor}`]]: textColor,
      })}
    >
      {children}
    </h1>
  );
};

export const Heading2: React.FC<HeadingProps> = ({ children, textColor }) => {
  return (
    <h2
      className={classNames(styles.heading, styles['heading-2'], {
        [styles[`heading-${textColor}`]]: textColor,
      })}
    >
      {children}
    </h2>
  );
};

export const Heading3: React.FC<HeadingProps> = ({ children, textColor }) => {
  return (
    <h3
      className={classNames(styles.heading, styles['heading-3'], {
        [styles[`heading-${textColor}`]]: textColor,
      })}
    >
      {children}
    </h3>
  );
};

type ParagraphSize = 'normal' | 'large' | 'small';
interface ParagraphProps {
  children: React.ReactNode;
  size?: ParagraphSize;
  textColor?: textColor;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  size = 'normal',
  textColor,
}) => {
  return (
    <p
      className={classNames(styles.paragraph, {
        [styles[`paragraph--${size}`]]: size,
        [styles[`paragraph-${textColor}`]]: textColor,
      })}
    >
      {children}
    </p>
  );
};
