import { create } from "zustand";

export const useLayout = create((set) => ({
  current_layout: "interface",
  set_current_layout: (layout_name) =>
    set(() => ({ current_layout: layout_name })),
}));
