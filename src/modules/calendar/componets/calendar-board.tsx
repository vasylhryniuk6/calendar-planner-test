'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { format, isToday } from 'date-fns';
import DatePicker from 'react-datepicker';

import { useCurrentMonth } from '../hooks';
import { CalendarCell } from './calendar-cell';

export const CalendarBoard = () => {
  const {
    daysInMonth,
    currentDate,
    setCurrentDate,
    formattedMonth,
    handleNextMonth,
    handlePrevMonth,
  } = useCurrentMonth();

  return (
    <div className="flex flex-col gap-2 px-1">
      <div className="flex justify-end  py-6">
        <div className="flex gap-2">
          <button type="button" onClick={handlePrevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
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

          <div className="text-2xl font-bold">
            <span>{formattedMonth}</span>
            <span className="ml-2">{format(currentDate, 'yyyy')}</span>
          </div>

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
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <DatePicker
          showIcon
          selected={currentDate}
          onChange={(date: Date | null) => setCurrentDate(date || new Date())}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          }
        />
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
