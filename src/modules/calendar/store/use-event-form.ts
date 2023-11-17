import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IEventFormModel } from '../types/event-form.model';

interface EventFormState {
  events: IEventFormModel[];
  eventsIds: string;
  addEvent: (
    title: string,
    createdAt: Date,
    beginTime: string,
    description: string,
  ) => void;
  addEventId: (id: string) => void;
  editEvent: (
    id: string,
    title: string,
    createdAt: Date,
    beginTime: string,
    description: string,
  ) => void;
  deleteEvent: (id: string) => void;
}

export const useEventForm = create<EventFormState>()(
  persist(
    (set) => ({
      events: [],
      eventsIds: '',
      addEventId: (id) => {
        set(() => ({
          eventsIds: id,
        }));
      },
      addEvent: (title, createdAt, beginTime, description) => {
        set((state) => ({
          events: [
            ...state.events,
            {
              id: uuidv4(),
              title,
              createdAt,
              beginTime,
              description,
            },
          ],
        }));
      },
      editEvent: (id, title, createdAt, beginTime, description) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, title, createdAt, beginTime, description }
              : event,
          ),
        }));
      },
      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));
      },
    }),
    {
      name: 'events',
    },
  ),
);
