import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BoardStore {
  usedWords: string[];
  addUsedWord: (name: string) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      usedWords: [],
      addUsedWord: (name: string) =>
        set((state) => ({ usedWords: [...state.usedWords, name] })),
    }),
    {
      name: "used-words-storage",
    }
  )
);
