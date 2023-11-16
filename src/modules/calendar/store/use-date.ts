import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DateState {
  currentDateStorage: Date | string;
  setCurrentDateStorage: (date: Date) => void;
}

export const useDate = create<DateState>()(
  persist(
    (set) => ({
      currentDateStorage: new Date(),
      setCurrentDateStorage: (date: Date) => set({ currentDateStorage: date }),
    }),
    {
      name: 'date',
    },
  ),
);
