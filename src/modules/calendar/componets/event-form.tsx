'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Input, InputDatepicker } from '@/components/ui';

import { useEventForm } from '../store';

interface EventFormProps {
  title: string;
  createdAt: Date;
}

export const EventForm = () => {
  const { addEvent, events, eventsIds, editEvent, addEventId } = useEventForm();

  const matchEventsId = events.find((event) => event.id === eventsIds);
  const { handleSubmit, control } = useForm<EventFormProps>({
    defaultValues: {
      title: matchEventsId?.title ?? '',
      createdAt: matchEventsId?.createdAt ?? new Date(),
    },
  });

  const onSubmit: SubmitHandler<EventFormProps> = async (data) => {
    if (matchEventsId) {
      editEvent(matchEventsId.id, data.title, data.createdAt);
      addEventId('');
    } else {
      addEvent(data.title, data.createdAt);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="title"
        control={control}
        placeholder="Add item"
      />
      <InputDatepicker
        control={control}
        name="createdAt"
        labelText="Choose date"
        rules={{ required: true }}
      />

      <button type="submit">Save</button>
    </form>
  );
};
