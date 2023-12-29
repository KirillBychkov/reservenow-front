import classNames from 'classnames';
import styles from './customTick.module.scss';
import Flex from '../layout/flex';
import { Tick } from '@blueprintjs/icons';

type Props = {
  checked: boolean;
};

const CustomTick = ({ checked }: Props) => {
  return (
    <Flex
      options={{ justify: 'center', align: 'center' }}
      className={classNames(styles.wrapper, {
        [styles.wrapperFilled]: checked,
      })}
    >
      {checked && <Tick color='#fff' size={18} />}
    </Flex>
  );
};

export default CustomTick;
