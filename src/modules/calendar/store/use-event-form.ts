import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IEventFormModel } from '../types/event-form.model';

interface EventFormState {
  events: IEventFormModel[];
  eventsIds: string;
  addEvent: (title: string, createdAt: Date) => void;
  addEventId: (id: string) => void;
  editEvent: (id: string, title: string, createdAt: Date) => void;
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
      addEvent: (title, createdAt) => {
        set((state) => ({
          events: [
            ...state.events,
            {
              id: uuidv4(),
              title,
              createdAt,
            },
          ],
        }));
      },
      editEvent: (id, title, createdAt) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, title, createdAt } : event,
          ),
        }));
      },
    }),
    {
      name: 'events',
    },
  ),
);
