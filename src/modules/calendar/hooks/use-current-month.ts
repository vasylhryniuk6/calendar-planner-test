'use client';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from 'date-fns';

import { useDate } from '../store';

export const useCurrentMonth = () => {
  const { setCurrentDateStorage, currentDateStorage } = useDate();
  const currentDate = new Date(currentDateStorage);

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
    const prevMonth = subMonths(currentDate, 1);

    setCurrentDateStorage(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);

    setCurrentDateStorage(nextMonth);
  };

  return {
    daysInMonth,
    currentDate,
    formattedMonth,
    handlePrevMonth,
    handleNextMonth,
  };
};
