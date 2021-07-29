export const roundToPrecision = (decimal, precision = 1) => Math.round(
  +decimal * (10 ** precision)
) / 10 ** precision;
