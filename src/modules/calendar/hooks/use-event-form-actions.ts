import { useState } from 'react';

import { useModal } from '@/store';

import { useEventFormService } from '../services';
import { useEventForm } from '../store';

export const UseEventFormActions = () => {
  const { events, eventsIds, addEventId, deleteEvent } = useEventForm();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { eventFormDeleteMutation } = useEventFormService();
  const { close } = useModal();

  const matchEventsId = events.find((event) => event.id === eventsIds);

  const [native, setNative] = useState<Date>(
    matchEventsId ? new Date(matchEventsId?.createdAt) : new Date(),
  );

  const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNative(new Date(e.target.value));
  };

  const handleDelete = async () => {
    // Example for REST delete request
    // await eventFormDeleteMutation.mutateAsync(eventsIds);
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
