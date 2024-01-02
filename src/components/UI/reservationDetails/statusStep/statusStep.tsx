import Flex from "../../layout/flex";
import CustomTick from "../../tick/customTick";
import styles from './statusStep.module.scss'

type Props = {
  title: string;
  time?: string;
  checked: boolean;
};

export const StatusStep = ({ title, time, checked }: Props) => {
  return (
    <Flex options={{ gap: 0.5 }}>
      <div className={styles.tickWrapper}>
        <CustomTick checked={checked} />
      </div>
      <Flex options={{ direction: 'column', justify: 'center', gap: 0.5 }}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.time}>{time && time}</p>
      </Flex>
    </Flex>
  );
};