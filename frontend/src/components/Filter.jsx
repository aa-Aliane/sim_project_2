import React from "react";

const Filter = ({
  filter,
  display,
  change,
  selected,
  change_selected,
  all,
  switch_all,
}) => {
  let title = filter.title;
  let items = filter.items;
  let items_keys = Object.keys(filter.items);

  return (
    <ul className="filter">
      <h4 className="filter__title">
        {display === true && (
          <span className="material-symbols-outlined" onClick={() => change()}>
            arrow_drop_up
          </span>
        )}
        {display === false && (
          <span className="material-symbols-outlined" onClick={() => change()}>
            arrow_drop_down
          </span>
        )}
        {title}
        <span
          className="checkbox ml-0"
          data-selected={all}
          onClick={() => switch_all()}
        ></span>
      </h4>
      {items_keys.map((item, i) => (
        <li className="filter__item" data-display={display}>
          <p>{items[item]}</p>
          <span
            className="checkbox"
            data-selected={selected[i]}
            onClick={() => change_selected(i)}
          ></span>
        </li>
      ))}
    </ul>
  );
};

export default Filter;
