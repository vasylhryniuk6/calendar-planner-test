import { format } from 'date-fns';

import { useModal } from '@/store';
import { cn } from '@/utils';

import { useEventForm } from '../store';

type CalendarCellProps = React.ComponentProps<'article'> & {
  date: string;
  id: string;
  day: string;
  title?: string;
  currentDate: string;
};

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  day,
  currentDate,
  className,
}) => {
  const { open } = useModal();
  const { events, addEventId } = useEventForm();

  const handleOpen = (idEdit: string) => {
    addEventId(idEdit);

    open();
  };

  const isEvent = events.filter((event) => {
    const dateTransform = new Date(event.createdAt);
    return format(dateTransform, 'yyyy-MM-dd') === currentDate;
  });

  return (
    <article
      className={cn('h-[200px] w-1/6 border border-gray-200', className)}
    >
      <div className="flex h-full flex-col p-3">
        <div className="flex items-center justify-between">
          <h3>{date}</h3>
          <h4>{day}</h4>
        </div>

        <div className="flex flex-col">
          {isEvent?.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                className=" mt-2 whitespace-nowrap rounded-2xl bg-blue-600 font-semibold text-white"
                onClick={() => handleOpen(item.id)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
};
