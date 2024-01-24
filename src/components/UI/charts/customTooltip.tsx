import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

type Props = {
  payload?: any[];
  label?: string;
  active?: boolean;
  data: any;
  dayDifference: number;
};

export const CustomTooltip = ({
  payload,
  label,
  active,
  data,
  dayDifference,
}: Props) => {
  const { t } = useTranslation();
  if (payload == null) return null;
  if (active) {
    const dateString = data[Number(label) - 1].period;
    const [startDate, endDate] = dateString.split('/');

    const formattedStartDate =
      dayDifference <= 1
        ? dayjs(startDate).format('DD.MM.YYYY, HH:mm')
        : dayjs(startDate).format('DD.MM.YYYY');

    const formattedEndDate =
      dayDifference <= 1
        ? dayjs(endDate).format('DD.MM.YYYY, HH:mm')
        : dayjs(endDate).format('DD.MM.YYYY');

    return (
      <div>
        <p>{`${t('dates.from')}: ${formattedStartDate}`}</p>
        <p>{`${t('dates.to')}: ${formattedEndDate}`}</p>
        <p>{`${t('orders.totalReservationsSum')}: ${payload[0].value}`}</p>
      </div>
    );
  }
};
