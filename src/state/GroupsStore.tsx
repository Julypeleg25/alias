import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GroupDetails {
  name: string;
  id: number;
  color: string;
  position: number;
}

interface GroupStore {
  groups: GroupDetails[];
  currentGroupId?: number;
  addGroup: (group: GroupDetails) => void;
  setCurrentGroupId: (id: number) => void;
  advanceGroup: (id: number, steps: number) => void;
  restartGame: (total?: boolean) => void;
  winingGroup?: GroupDetails;
  setWiningGroup: (group: GroupDetails) => void;
}

export const useGroupStore = create<GroupStore>()(
  persist(
    (set) => ({
      groups: [],
      currentGroupId: undefined,
      winingGroup: undefined,
      setWiningGroup: (group: GroupDetails) =>
        set(() => ({ winingGroup: group })),
      addGroup: (group: GroupDetails) =>
        set((state) => ({ groups: [...state.groups, group] })),
      setCurrentGroupId: (id: number) => set(() => ({ currentGroupId: id })),
      advanceGroup: (id: number, steps: number) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === id
              ? { ...group, position: group.position + steps }
              : group
          ),
        })),
      restartGame: (total?: boolean) =>
        set((state) => ({
          groups: total
            ? []
            : state.groups.map((group) => ({ ...group, position: 0 })),
          currentGroupId: total ? undefined : state.groups[0]?.id ?? 1,
        })),
    }),
    {
      name: "groups-storage",
    }
  )
);
