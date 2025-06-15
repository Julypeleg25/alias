import { create } from "zustand";

interface BoardStore {
  usedWords: string[];
  addUsedWord: (name: string) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  usedWords: [],
  addUsedWord: (name: string) =>
    set((state) => ({ usedWords: [...state.usedWords, name] })),
}));
