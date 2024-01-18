import classNames from 'classnames';
import Flex from '@/components/UI/layout/flex';
import styles from './statusStep.module.scss';
import CustomTick from '@/components/UI/tick/customTick';

type Props = {
  title: string;
  time?: string;
  checked: boolean;
  withTrack?: boolean;
};

export const StatusStep = ({
  title,
  time,
  checked,
  withTrack = true,
}: Props) => {
  return (
    <Flex options={{ gap: 0.5 }}>
      <div
        className={classNames(styles.tickWrapper, {
          [styles.track]: withTrack,
        })}
      >
        <CustomTick checked={checked} />
      </div>
      <Flex options={{ direction: 'column', justify: 'center', gap: 0.5 }}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.time}>{time && time}</p>
      </Flex>
    </Flex>
  );
};
