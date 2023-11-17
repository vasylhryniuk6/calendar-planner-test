import type { PropsWithChildren } from 'react';

import { useEventForm } from '@/modules/calendar/store';
import { useModal } from '@/store';

export const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  const { close } = useModal();
  const { addEventId } = useEventForm();

  const handleClose = () => {
    close();
    addEventId('');
  };

  return (
    <div className="fixed inset-0 z-40 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-[30%] bg-white p-3">
        <div className="flex justify-end">
          <button type="button" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
