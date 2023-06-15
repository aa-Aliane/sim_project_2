import { create } from "zustand";

export const useModel = create((set) => ({
  suspicious: "",
  set_suspicious: (text) => set(() => ({ suspicious: text })),
  results: [],
  set_results: (results) => set(() => ({ results: results })),
}));
