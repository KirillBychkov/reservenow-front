type Props = {
  title: string;
  description: string;
};

export const EventTitle = ({ title, description }: Props) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};