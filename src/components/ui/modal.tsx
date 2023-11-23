import type { PropsWithChildren } from 'react';

import CloseIco from '@/assets/images/icons/close-ico.svg';
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
    <div className="fixed inset-0 z-40 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-[30%] bg-white p-3 max-lg:w-[60%]">
        <div className="flex justify-end">
          <button type="button" onClick={handleClose}>
            <CloseIco />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
