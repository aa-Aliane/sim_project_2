import React, { useState, useEffect } from "react";
import { Pagination, PaginationInfo } from "../components/Pagination";
import Result from "../components/Result";
import { useModel } from "../store/ModelState";
import { usePagination } from "../store/PaginationState";
import { useToggleMenu } from "../store/General";

const Results = () => {
  const results = useModel((state) => state.results);
  const current_page = usePagination((state) => state.current_page);
  const results_per_page = usePagination((state) => state.results_per_page);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(Math.min(results.length, 10));

  const menu_toggled = useToggleMenu((state) => state.toggle);

  useEffect(() => {
    setStart(current_page * results_per_page - results_per_page);
    setEnd(Math.min(current_page * results_per_page, results.length));
  }, [, current_page, results_per_page]);

  return (
    <div className="results__container" data-opened={menu_toggled}>
      <PaginationInfo nb_results={results.length} />
      <ul className="results">
        {results.slice(start, end).map((r) => (
          <li>
            <Result result={r} />
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
};

export default Results;
