import { create } from "zustand";
import { range } from "../utils";

export const usePagination = create((set) => ({
  results_per_page: 10,
  nb_pages: 0,
  all_pages: 0,
  pages: range(0, 5, 1),
  current_page: 1,
  set_results_per_page: (nb) => set(() => ({ results_per_page: nb })),
  set_pages: (start, end) => set(() => ({ pages: range(start, end, 1) })),
  set_nb_pages: (nb) => set(() => ({ nb_pages: nb, pages: range(1, nb, 1) })),
  set_all_pages: (nb) => set(() => ({ all_pages: nb })),
  set_current_page: (page) =>
    set((state) => ({
      current_page: page,
    })),
}));
