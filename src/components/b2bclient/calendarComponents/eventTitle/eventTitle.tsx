type Props = {
  title: string;
  description: string;
};

export const EventTitle = ({ title }: Props) => {
  return (
    <div>
      <h4>{title}</h4>
    </div>
  );
};