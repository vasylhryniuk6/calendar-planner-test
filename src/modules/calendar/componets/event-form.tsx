/* eslint-disable unused-imports/no-unused-vars */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import { useModal } from '@/store';

import { UseEventFormActions } from '../hooks';
import type { EventFormSchemaType } from '../schemas/event-form.schema';
import { eventFormSchema } from '../schemas/event-form.schema';
import { useEventFormService } from '../services';
import { useEventForm } from '../store';

// Todo: check if empty field is date and correct validation

export const EventForm = () => {
  const { addEvent, eventsIds, editEvent, addEventId } = useEventForm();
  const { close } = useModal();
  const {
    native,
    handleDelete,
    transormToObjDate,
    matchEventsId,
    onNativeChange,
  } = UseEventFormActions();

  const { eventFormCreateMutation, eventFormEditMutation } =
    useEventFormService();

  const { handleSubmit, control, reset } = useForm<EventFormSchemaType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: matchEventsId?.title ?? '',
      createdAt: matchEventsId?.createdAt ?? native,
      beginTime: matchEventsId?.beginTime ?? '',
      description: matchEventsId?.description ?? '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<EventFormSchemaType> = async (data) => {
    if (matchEventsId) {
      // Example for REST patch request attentcion: interface not modified
      // await eventFormEditMutation.mutateAsync(
      //   matchEventsId.id,
      //   data.title,
      //   native,
      //   data.beginTime,
      //   data.description,
      //   new Date(),
      // );
      editEvent(
        matchEventsId.id,
        data.title,
        native,
        data.beginTime,
        data.description,
        new Date(),
      );
      addEventId('');
      close();
    } else {
      // Example for REST post request
      // await eventFormCreateMutation.mutateAsync({
      //   title: data.title,
      //   createdAt: native,
      //   beginTime: data.beginTime,
      //   description: data.description,
      // });
      addEvent(data.title, native, data.beginTime, data.description);
      reset();
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-1 text-xl">
        {eventsIds ? 'Edit idea item' : 'Add new idea item'}
      </h2>
      {matchEventsId && (
        <div className="mb-2 text-xs">
          {matchEventsId.udaptedAt ? (
            <span>Updated at</span>
          ) : (
            <span>Createt at</span>
          )}
          <span className="ml-2">
            {format(transormToObjDate, 'yyyy-MM-dd')}{' '}
            {transormToObjDate.getHours()}:{transormToObjDate.getMinutes()}:
            {transormToObjDate.getSeconds()}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Input
          control={control}
          name="title"
          type="text"
          label="Title"
          requiredmark="*"
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
        <Input
          control={control}
          type="date"
          value={format(native, 'yyyy-MM-dd')}
          min={format(new Date(), 'yyyy-MM-dd')}
          onChange={(e) => onNativeChange(e)}
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
