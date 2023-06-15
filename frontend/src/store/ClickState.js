import { create } from "zustand";
import { TextPerLang } from "../constants";

const filters_domains = Object.keys(TextPerLang.en.filters.domains.items);
const filters_depots = Object.keys(TextPerLang.en.filters.depots.items);

export const useDropDowns = create((set) => ({
  domains: true,
  switch_domains: () => set((state) => ({ domains: !state.domains })),
  depots: true,
  switch_depots: () => set((state) => ({ depots: !state.depots })),
}));

// for selected filters
export const useSelectedFilters = create((set) => ({
  all_domains: true,
  domains: filters_domains.map((f) => true),
  switch_all_domains: () =>
    set((state) => ({
      all_domains: !state.all_domains,
      domains: state.domains.map(() => !state.all_domains),
    })),
  switch_domain: (index) =>
    set((state) => ({
      domains: state.domains.map((value, i) => {
        if (i === index) return !value;
        return value;
      }),
    })),

  all_depots: true,
  depots: filters_depots.map((f) => true),
  switch_all_depots: () =>
    set((state) => ({
      all_depots: !state.all_depots,
      depots: state.depots.map(() => !state.all_depots),
    })),
  switch_depot: (index) =>
    set((state) => ({
      depots: state.depots.map((value, i) => {
        if (i === index) return !value;
        return value;
      }),
    })),
}));
