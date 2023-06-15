import React, { useState } from "react";
import { useLanguage } from "../store/LanguageState";
import { useDropDowns, useSelectedFilters } from "../store/ClickState";
import Filter from "../components/Filter";
import { useToggleMenu } from "../store/General";

const Filters = () => {
  const domains = useLanguage((state) => state.text.filters.domains);
  const show_domains = useDropDowns((state) => state.domains);
  const switch_domains = useDropDowns((state) => state.switch_domains);
  const depots = useLanguage((state) => state.text.filters.depots);
  const show_depots = useDropDowns((state) => state.depots);
  const switch_depots = useDropDowns((state) => state.switch_depots);

  const all_domains = useSelectedFilters((state) => state.all_domains);
  const switch_all_domains = useSelectedFilters(
    (state) => state.switch_all_domains
  );
  const selected_domains = useSelectedFilters((state) => state.domains);
  const change_selected_domain = useSelectedFilters(
    (state) => state.switch_domain
  );

  const all_depots = useSelectedFilters((state) => state.all_depots);
  const switch_all_depots = useSelectedFilters(
    (state) => state.switch_all_depots
  );
  const selected_depots = useSelectedFilters((state) => state.depots);
  const change_selected_depot = useSelectedFilters(
    (state) => state.switch_depot
  );

  const toggle = useToggleMenu((state) => state.toggle);
  const switch_toggle = useToggleMenu((state) => state.switch_toggle);

  return (
    <ul className="filters" data-opened={toggle}>
      <span
        className="material-symbols-outlined filters__toggle"
        onClick={() => switch_toggle()}
      >
        menu
      </span>
      <li>
        <Filter
          filter={domains}
          display={show_domains}
          change={switch_domains}
          selected={selected_domains}
          change_selected={change_selected_domain}
          all={all_domains}
          switch_all={switch_all_domains}
        />
      </li>
      <li>
        <Filter
          filter={depots}
          display={show_depots}
          change={switch_depots}
          selected={selected_depots}
          change_selected={change_selected_depot}
          all={all_depots}
          switch_all={switch_all_depots}
        />
      </li>
    </ul>
  );
};

export default Filters;
