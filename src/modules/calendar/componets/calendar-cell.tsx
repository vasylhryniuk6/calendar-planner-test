import { cn } from '@/utils';

type CalendarCellProps = React.ComponentProps<'article'> & {
  date: string;
  day: string;
};

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  day,
  className,
}) => {
  return (
    <article
      className={cn('h-[200px] w-1/6 border border-gray-200', className)}
    >
      <div className="flex items-center justify-between px-3 ">
        <h3>{date}</h3>
        <h4>{day}</h4>
      </div>
    </article>
  );
};
