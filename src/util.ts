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

export interface LinterpolRes {
  val: number;
  extrapolation: boolean;
}

/**
 *  linear interpolation method
 *  throws if x_vals and y_vals are mismatched or unsorted
 *  throws if there is less than 2 values provided for interpolation
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

  let ascending = null;
  let i = 1;

  //  determine x_vals sort order while iterating
  for (; i < x_vals.length; i += 1) {
    if (ascending === null) {
      ascending = x_vals[i] > x_vals[i - 1];
    } else if (ascending && x_vals[i] < x_vals[i - 1]) {
      throw Error(`x_vals ${x_vals} is not sorted in ascending order`);
    } else if (!ascending && x_vals[i] > x_vals[i - 1]) {
      throw Error(`x_vals ${x_vals} is not sorted in descending order`);
    }

    if (ascending && (x >= x_vals[i - 1] && x <= x_vals[i])) {
      break;
    } else if (!ascending && (x <= x_vals[i - 1] && x >= x_vals[i])) {
      break;
    }
  }

  //  it's extrapolation if a bounded range was not found ...
  let extrapolation = false;
  if (i === x_vals.length) {
    extrapolation = true;
    if (ascending) {
      if (x < x_vals[0]) {
        i = 1;
      } else if (x > x_vals[x_vals.length - 1]) {
        i = x_vals.length - 1;
      }
    } else if (x > x_vals[0]) {
      i = 1;
    } else if (x < x_vals[x_vals.length - 1]) {
      i = x_vals.length - 1;
    }
  }

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
