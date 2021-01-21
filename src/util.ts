/**
 *  Rounding method
 *  @param {number} value to round
 *  @param {number} precision for rounding (number of places)
 *  @returns {number} rounded value
 */
export function round(value: number, precision: number): number {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}

/**
 *  locates index of upper entry in array that bounds x
 *  throws if vals are not sorted
 *  @param {number} x - value to search for in vals
 *  @param {number[]} vals - sorted value array (ascending or descending)
 *  @returns {[number, boolean]} - tuple of index and whether extrapolation is needed
 */
function locateUpperBoundIndex(
  x: number,
  vals: number[],
): [number, boolean] {
  let ascending = null;
  let i = 1;

  //  determine vals sort order while iterating
  for (; i < vals.length; i += 1) {
    if (ascending === null) {
      ascending = vals[i] > vals[i - 1];
    } else if (ascending && vals[i] < vals[i - 1]) {
      throw Error(`vals ${vals} is not sorted in ascending order`);
    } else if (!ascending && vals[i] > vals[i - 1]) {
      throw Error(`vals ${vals} is not sorted in descending order`);
    }

    if (ascending && (x >= vals[i - 1] && x <= vals[i])) {
      break;
    } else if (!ascending && (x <= vals[i - 1] && x >= vals[i])) {
      break;
    }
  }

  //  it's extrapolation if a bounded range was not found ...
  let extrapolation = false;
  if (i === vals.length) {
    extrapolation = true;
    if (ascending) {
      if (x < vals[0]) {
        i = 1;
      } else if (x > vals[vals.length - 1]) {
        i = vals.length - 1;
      }
    } else if (x > vals[0]) {
      i = 1;
    } else if (x < vals[vals.length - 1]) {
      i = vals.length - 1;
    }
  }
  return [i, extrapolation];
}

export interface LinterpolRes {
  val: number;
  extrapolation: boolean;
}

/**
 *  linear interpolation method
 *  throws if x_vals and y_vals are mismatched
 *  throws if there are less than 2 values provided for interpolation
 *  @param {number} x to interpolate a y
 *  @param {number[]} x_vals
 *  @param {number[]} y_vals
 */
export function linterpol(
  x: number,
  x_vals: number[],
  y_vals: number[],
): LinterpolRes {
  if (x_vals.length !== y_vals.length) {
    throw Error('Interpolation inputs are mismatched');
  }

  if (x_vals.length < 2 && y_vals.length < 2) {
    throw Error('Interpolation requires at least two lookup elements');
  }

  const [i, extrapolation] = locateUpperBoundIndex(x, x_vals);

  //  calc val
  const x0 = x_vals[i - 1];
  const x1 = x_vals[i];
  const y0 = y_vals[i - 1];
  const y1 = y_vals[i];
  const val = round(
    y0 + ((x - x0) * (y1 - y0)) / (x1 - x0),
    1,
  );

  return {
    val,
    extrapolation,
  };
}
