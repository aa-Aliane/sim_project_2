import { create } from "zustand";

export const useToggleMenu = create((set) => ({
  toggle: true,
  switch_toggle: () =>
    set((state) => ({ toggle: state.toggle === true ? false : true })),
}));
