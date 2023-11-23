'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { format, isToday } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';

import AddIco from '@/assets/images/icons/add-ico.svg';
import NextArrowIco from '@/assets/images/icons/next-arrow-ico.svg';
import PrevArrowIco from '@/assets/images/icons/prev-arrow-ico.svg';
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

  const currentDateStorageFormatted = new Date(currentDateStorage);

  return (
    <div className="flex flex-col gap-2 px-1">
      {isClient && (
        <>
          <div className="flex items-center justify-between  py-6">
            <button type="button" onClick={open}>
              <AddIco className="h-12 w-12 rounded-full bg-blue-600 p-1 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <button type="button" onClick={handlePrevMonth}>
                <PrevArrowIco className="h-6 w-6" />
              </button>

              <div className="text-2xl font-bold">
                <span>{formattedMonth}</span>
                <span className="ml-2">{format(currentDate, 'yyyy')}</span>
              </div>

              <button type="button" onClick={handleNextMonth}>
                <NextArrowIco className="h-6 w-6" />
              </button>

              <input
                type="month"
                value={format(currentDateStorageFormatted, 'yyyy-MM', {
                  locale: enUS,
                })}
                min={format(new Date(), 'yyyy-MM', { locale: enUS })}
                onChange={(e: React.ChangeEvent<HTMLInputElement> | null) =>
                  setCurrentDateStorage(
                    e && e.target.value ? new Date(e.target.value) : new Date(),
                  )
                }
                lang="en-US"
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
