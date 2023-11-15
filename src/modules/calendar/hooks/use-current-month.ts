import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { useState } from 'react';

export const useCurrentMonth = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Set the date to the first day of the current month
  const firstDayOfMonth = startOfMonth(currentDate);

  // Set the date to the last day of the current month
  const lastDayOfMonth = endOfMonth(currentDate);

  // Get all the days in the current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Format the current month
  const formattedMonth = format(currentDate, 'MMMM');

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = subMonths(prevDate, 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = addMonths(prevDate, 1);
      return nextMonth;
    });
  };

  return {
    daysInMonth,
    formattedMonth,
    handlePrevMonth,
    handleNextMonth,
  };
};
