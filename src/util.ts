/**
 *  Rounding method
 *  @param {number} value to round
 *  @param {number} precision for rounding (number of places)
 *  @returns {number} rounded value
 */
export function round(value: number, precision: number): number {
  const multiplier = 10 ** precision;
  const res = Math.round(value * multiplier) / multiplier;
  return Object.is(res, -0) ? 0 : res;
}

/**
 *  locates index of upper entry in array that bounds x
 *  throws if vals are not sorted
 *  throws if there are less than 2 values provided in search array
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

  if (vals.length < 2) {
    throw Error('Interpolation requires at least two elements');
  }

  //  determine vals sort order while iterating
  for (; i < vals.length; i += 1) {
    if (ascending === null) {
      ascending = vals[i] > vals[i - 1];
    } else if (ascending && vals[i] < vals[i - 1]) {
      throw Error(`Interpolation values ${vals} are not sorted in ascending order`);
    } else if (!ascending && vals[i] > vals[i - 1]) {
      throw Error(`Interpolation values ${vals} are not sorted in descending order`);
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
    throw Error('Interpolation input lengths are mismatched');
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

export interface NestedObject {
  [index: number]: number | NestedObject;
}

/**
 *  Performs interpolation on n-nested object keyed by a number.
 *  Since Object.keys is used, implication is numerically ascending keys only
 *  Throws if dim exceeds nPath levels provided
 *  Throws if dim exceeds nesting levels available in obj
 *  @param {number} dim - 0 based level into nPath
 *  @param {string[]} nPath - the number lookup for each nesting layer to search in obj
 *  @param {NestedObject} obj - n-nested object to traverse for interpolation
 */
export function ndimLinterpol(
  dim: number,
  nPath: number[],
  obj: NestedObject,
): LinterpolRes {
  if (dim >= nPath.length) {
    throw Error(`Interpolation in '${nPath}' exceeds available dimensions in ${JSON.stringify(obj)}`);
  }

  const keys: number[] = Object.keys(obj).map((x) => parseInt(x, 10));
  const [i, extrapolation] = locateUpperBoundIndex(nPath[dim], keys);

  const x1 = keys[i];
  const x0 = keys[i - 1];
  const y1 = obj[x1];
  const y0 = obj[x0];

  const recursionHelper = (currObj: number | NestedObject): LinterpolRes => {
    let res: LinterpolRes;
    if (typeof currObj === 'object') {
      //  extrapolation is not possible on objects
      if (extrapolation) {
        throw Error(`Extrapolation is not possible for '${nPath[dim]}' in '${nPath}' for ${JSON.stringify(obj)}`);
      }
      //  error if we end on an object
      if (dim === nPath.length - 1) {
        throw Error(`Interpolation is not possible for '${nPath[dim]}' in '${nPath}' for ${JSON.stringify(obj)}`);
      }
      //  recurse object
      res = ndimLinterpol(dim + 1, nPath, currObj);
    } else {
      //  this terminates the recursion - by implication, we should also be at the end of the path
      if (dim !== nPath.length - 1) {
        throw Error(`Interpolation is not available beyond '${nPath[dim]}' in '${nPath}' for ${JSON.stringify(obj)}`);
      }
      res = {
        val: currObj,
        extrapolation,
      };
    }
    return res;
  };

  const resy1 = recursionHelper(y1);
  const resy0 = recursionHelper(y0);

  const res = linterpol(
    nPath[dim],
    [x0, x1],
    [resy0.val, resy1.val],
  );

  //  set extrapolation result if any extrapolation occurred
  res.extrapolation = res.extrapolation
    || resy0.extrapolation
    || resy1.extrapolation
    || extrapolation;

  return res;
}
