'use client';

import { format, isToday } from 'date-fns';

import { useCurrentMonth } from '../hooks';
import { CalendarCell } from './calendar-cell';

export const CalendarBoard = () => {
  const { daysInMonth, formattedMonth, handleNextMonth, handlePrevMonth } =
    useCurrentMonth();

  return (
    <div className="flex flex-col gap-2 px-1">
      <div className="flex gap-2 py-6">
        <button type="button" onClick={handlePrevMonth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="text-2xl font-bold">{formattedMonth}</div>
        <button type="button" onClick={handleNextMonth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
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
