import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  editData: any;
  setEditData: (data: any) => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  editData: [],
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setEditData: (data: any) => set({ editData: data }),
}));
