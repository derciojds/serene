import { create } from 'zustand';

interface FilterStore {
  selectedContent: { [key: string]: string[] | number[] };
  setSelectedContent: (
    key: string,
    newSelectedContent: string[] | number[],
  ) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedContent: {},

  setSelectedContent: (key, newSelectedContent) =>
    set((state) => ({
      selectedContent: { ...state.selectedContent, [key]: newSelectedContent },
    })),
}));
