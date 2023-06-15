export const range = (start, stop, step) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
};

export const boolean_range = (start, stop, step) => {
  let a = Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
  return a.map((e) => false);
};
