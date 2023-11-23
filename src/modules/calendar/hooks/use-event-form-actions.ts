import { useState } from 'react';

import { useModal } from '@/store';

import { useEventForm } from '../store';

export const UseEventFormActions = () => {
  const { events, eventsIds, addEventId, deleteEvent } = useEventForm();
  const { close } = useModal();

  const matchEventsId = events.find((event) => event.id === eventsIds);

  const [native, setNative] = useState<Date>(
    matchEventsId ? new Date(matchEventsId?.createdAt) : new Date(),
  );

  const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNative(new Date(e.target.value));
  };

  const handleDelete = () => {
    deleteEvent(eventsIds);
    addEventId('');
    close();
  };

  const transormToObjDate = matchEventsId
    ? new Date(matchEventsId.udaptedAt ?? matchEventsId.createdAt)
    : new Date();

  return {
    native,
    matchEventsId,
    onNativeChange,
    handleDelete,
    transormToObjDate,
  };
};
