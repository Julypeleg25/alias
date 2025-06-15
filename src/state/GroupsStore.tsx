import { create } from "zustand";
import type { GroupDetails } from "../components/pages/GroupArrange";

interface GroupStore {
  groups: GroupDetails[];
  addGroup: (group: GroupDetails) => void;
  currentGroupName?: string;
  setCurrentGroupName: (name: string) => void;
  advanceGroup: (name: string, steps: number) => void;
}

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  currentGroupName: undefined,
  setCurrentGroupName: (name: string) =>
    set(() => ({ currentGroupName: name })),
  addGroup: (group: GroupDetails) =>
    set((state) => ({ groups: [...state.groups, group] })),
  advanceGroup: (name: string, steps: number) =>
    set((state) => {
      const updatedGroups = state.groups.map((group) => {
        if (group.name === name) {
          return { ...group, position: group.position + steps };
        }
        return group;
      });
      return { groups: updatedGroups };
    }),
}));
