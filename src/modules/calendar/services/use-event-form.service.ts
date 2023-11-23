import { useMutation } from '@tanstack/react-query';

import { apiInstance } from '@/core/api';

import type { EventFormSchemaType } from '../schemas/event-form.schema';

const eventFormCreateApi = async (
  formData: EventFormSchemaType,
): Promise<EventFormSchemaType> => {
  const { data } = await apiInstance.post(`/posts`, formData);

  return data;
};

const eventFormEditApi = async (
  formData: EventFormSchemaType,
): Promise<EventFormSchemaType> => {
  const { data } = await apiInstance.patch(`/posts`, formData);

  return data;
};

const eventFormDeleteApi = async (id: string) => {
  const { data } = await apiInstance.delete(`/posts/${id}`);

  return data;
};

export const useEventFormService = () => {
  const eventFormCreateMutation = useMutation({
    mutationFn: (formData: EventFormSchemaType) => eventFormCreateApi(formData),
  });

  const eventFormEditMutation = useMutation({
    mutationFn: (formData: EventFormSchemaType) => eventFormEditApi(formData),
  });

  const eventFormDeleteMutation = useMutation({
    mutationFn: (id: string) => eventFormDeleteApi(id),
  });

  return {
    eventFormCreateMutation,
    eventFormEditMutation,
    eventFormDeleteMutation,
  };
};
