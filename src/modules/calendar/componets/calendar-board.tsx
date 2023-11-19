'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { format, isToday } from 'date-fns';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

import AddIco from '@/assets/images/icons/add-ico.svg';
import CalendarIco from '@/assets/images/icons/calendar-ico.svg';
import LeftArrowIco from '@/assets/images/icons/left-arrow-ico.svg';
import RightArrowIco from '@/assets/images/icons/right-arrow-ico.svg';
import { Modal } from '@/components/ui';
import { useIsClient } from '@/hooks';
import { useModal } from '@/store';

import { useCurrentMonth } from '../hooks';
import { useDate } from '../store';
import { CalendarCell } from './calendar-cell';
import { EventForm } from './event-form';

export const CalendarBoard = () => {
  const { isClient } = useIsClient();
  const {
    daysInMonth,
    currentDate,
    formattedMonth,
    handleNextMonth,
    handlePrevMonth,
  } = useCurrentMonth();

  const { setCurrentDateStorage, currentDateStorage } = useDate();
  const { isOpen, open } = useModal();

  return (
    <div className="flex flex-col gap-2 px-1">
      {isClient && (
        <>
          <div className="flex items-center justify-between  py-6">
            <button type="button" onClick={open}>
              <AddIco />
            </button>
            <div className="flex items-center gap-2">
              <button type="button" onClick={handlePrevMonth}>
                <LeftArrowIco />
              </button>

              <div className="text-2xl font-bold">
                <span>{formattedMonth}</span>
                <span className="ml-2">{format(currentDate, 'yyyy')}</span>
              </div>

              <button type="button" onClick={handleNextMonth}>
                <RightArrowIco />
              </button>

              <DatePicker
                showIcon
                selected={new Date(currentDateStorage)}
                onChange={(date: Date | null) =>
                  setCurrentDateStorage(date || new Date())
                }
                dateFormat="MM/yyyy"
                showMonthYearPicker
                icon={<CalendarIco />}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            {daysInMonth.map((day) => {
              return (
                <CalendarCell
                  key={uuidv4()}
                  date={format(day, 'd')}
                  day={format(day, 'E')}
                  currentDate={format(day, 'yyyy-MM-dd')}
                  id={uuidv4()}
                  className={isToday(day) ? 'bg-green-200' : ''}
                />
              );
            })}
          </div>
        </>
      )}

      {isOpen && (
        <Modal>
          <EventForm />
        </Modal>
      )}
    </div>
  );
};
