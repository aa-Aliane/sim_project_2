import React, { useEffect } from "react";
import { usePagination } from "../store/PaginationState";
import { useLanguage } from "../store/LanguageState";

export const PaginationInfo = ({ nb_results }) => {
  const results_per_page = usePagination((state) => state.results_per_page);
  const set_results_per_page = usePagination(
    (state) => state.set_results_per_page
  );
  const set_nb_pages = usePagination((state) => state.set_nb_pages);
  const set_all_pages = usePagination((state) => state.set_all_pages);
  const current_page = usePagination((state) => state.current_page);
  const all_pages = usePagination((state) => state.all_pages);
  const set_current_page = usePagination((state) => state.set_current_page);
  const lang = useLanguage((state) => state.current_language);

  useEffect(() => {
    let i = 0;
    if (nb_results % results_per_page) i = 1;

    const nb_pages = Math.floor(nb_results / results_per_page) + i;
    set_nb_pages(Math.min(nb_pages, 10));
    set_all_pages(nb_pages);
  }, [, nb_results, results_per_page]);

  return (
    <div className="pagination__info">
      <p>
        {current_page}/{all_pages}
      </p>
      <ul data-lang={lang}>
        <li
          onClick={() => {
            set_results_per_page(10);
            set_current_page(1);
          }}
        >
          10
        </li>
        <li
          onClick={() => {
            set_results_per_page(20);
            set_current_page(1);
          }}
        >
          20
        </li>
        <li
          onClick={() => {
            set_results_per_page(50);
            set_current_page(1);
          }}
        >
          50
        </li>
      </ul>
    </div>
  );
};

export const Pagination = () => {
  const pages = usePagination((state) => state.pages);
  const pages_selected = usePagination((state) => state.pages_selected);
  const current_page = usePagination((state) => state.current_page);
  const set_current_page = usePagination((state) => state.set_current_page);
  const set_pages = usePagination((state) => state.set_pages);
  const all_pages = usePagination((state) => state.all_pages);
  return (
    <div className="pagination__pages">
      {pages &&
        pages.map((page, i) => (
          <button
            data-selected={page === current_page}
            className="btn btn--pagination"
            onClick={() => {
              set_current_page(page);
              if (page > 6 && all_pages > 10) {
                set_current_page(page);
                set_pages(page - 5, Math.min(page + 4, all_pages));
              } else {
                console.log("pageeeeeeeee", page);
                set_pages(1, Math.min(10, all_pages));
              }
            }}
          >
            {page}
          </button>
        ))}
    </div>
  );
};
