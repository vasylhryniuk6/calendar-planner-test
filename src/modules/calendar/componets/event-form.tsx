'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Input, InputDatepicker } from '@/components/ui';
import { useModal } from '@/store';

import { useEventForm } from '../store';

interface EventFormProps {
  title: string;
  createdAt: Date;
  beginTime: string;
  description: string;
}

export const EventForm = () => {
  const { addEvent, events, eventsIds, editEvent, addEventId, deleteEvent } =
    useEventForm();
  const { close } = useModal();

  const matchEventsId = events.find((event) => event.id === eventsIds);
  const { handleSubmit, control, reset } = useForm<EventFormProps>({
    defaultValues: {
      title: matchEventsId?.title ?? '',
      createdAt: matchEventsId?.createdAt ?? new Date(),
      beginTime: matchEventsId?.beginTime ?? '',
      description: matchEventsId?.description ?? '',
    },
  });

  const onSubmit: SubmitHandler<EventFormProps> = async (data) => {
    if (matchEventsId) {
      editEvent(
        matchEventsId.id,
        data.title,
        data.createdAt,
        data.beginTime,
        data.description,
      );
      addEventId('');
      close();
    } else {
      addEvent(data.title, data.createdAt, data.beginTime, data.description);
      reset();
      close();
    }
  };

  const handleDelete = () => {
    deleteEvent(eventsIds);
    addEventId('');
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-3 text-xl">
        {eventsIds ? 'Edit idea item' : 'Add new idea item'}
      </h2>
      <div className="flex flex-col gap-4">
        <Input
          control={control}
          name="title"
          isRequired
          type="text"
          label="Title"
          placeholder="Add item"
        />
        <Input
          control={control}
          name="description"
          type="text"
          label="Description"
          placeholder="Description"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <InputDatepicker
          control={control}
          name="createdAt"
          label="Choose date"
          rules={{ required: true }}
        />
        <Input
          type="time"
          name="beginTime"
          label="Begin Time"
          control={control}
          placeholder="Begin Date"
        />
      </div>

      <div className="flex justify-end gap-3">
        {eventsIds && (
          <button
            type="submit"
            className="mt-2 rounded-xl bg-red-700 p-4 text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}

        <button
          type="submit"
          className="mt-2 rounded-xl bg-black p-4 text-white"
        >
          {eventsIds ? 'Edit' : 'Save'}
        </button>
      </div>
    </form>
  );
};
