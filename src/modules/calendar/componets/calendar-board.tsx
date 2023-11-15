'use client';

import { format, isToday } from 'date-fns';

import { useCurrentMonth } from '../hooks';
import { CalendarCell } from './calendar-cell';

export const CalendarBoard = () => {
  const { daysInMonth, formattedMonth, handleNextMonth, handlePrevMonth } =
    useCurrentMonth();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handlePrevMonth}
        >
          Prev
        </button>
        <div className="text-2xl font-bold">{formattedMonth}</div>
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>

      <div className="flex flex-wrap">
        {daysInMonth.map((day) => {
          return (
            <CalendarCell
              key={day.getTime()}
              date={format(day, 'd')}
              day={format(day, 'E')}
              className={isToday(day) ? 'bg-green-200' : ''}
            />
          );
        })}
      </div>
    </div>
  );
};
