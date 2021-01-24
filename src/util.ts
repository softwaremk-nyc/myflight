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
  [index: string]: number | number[] | NestedObject;
}

/**
 *  Throw if not at the last element in nPath as specified by dim
 *  @param {number|string} currKey - for reporting
 *  @param {number} dim - current dimension into nPath
 *  @param {(number|string)[]} nPath - keys to lookup for each nesting layer in obj
 *  @param {NestedObject} obj - n-nested object to traverse for interpolation
 */
function throwIfNotAtLast(
  currKey: (number | string),
  dim: number,
  nPath: (number | string)[],
  obj: NestedObject,
) {
  if (dim !== nPath.length - 1) {
    throw Error(`Interpolation is not available beyond '${currKey}' in '${nPath}' for ${JSON.stringify(obj)}`);
  }
}

//  forward declare for recursion call ...
let ndimLinterpolKeyNumber: any;
let ndimLinterpolKeyString: any;

/**
 *  Example obj = { 1: {3:6, 4:8}, 2: {5:10, 6:12}, 3: {a: [7,9], b:[11,13]} }
 *  Performs interpolation on n-nested object keyed by a number or string
 *  If key is string, schema is a|b|8 to get x_vals [7,9] and y_vals[11,13] and interpolate at 8
 *  If key is number, it locates bounds for interpolation, eg: 1.5 uses x_vals[1,2]
 *  Throws if dim exceeds nPath levels provided
 *  Throws if an unexpected key type is received
 *  @param {number} dim - 0 based level into nPath
 *  @param {(string|number)[]} nPath - the key to lookup for each nesting layer to search in obj
 *  @param {NestedObject} obj - n-nested object to traverse for interpolation
 */
export function ndimLinterpol(
  dim: number,
  nPath: (number | string)[],
  obj: NestedObject,
): LinterpolRes {
  if (dim >= nPath.length) {
    throw Error(`Interpolation in '${nPath}' exceeds available levels in ${JSON.stringify(obj)}`);
  }

  const currKey = nPath[dim];

  if (typeof currKey === 'number') {
    return ndimLinterpolKeyNumber(
      currKey,
      dim,
      nPath,
      obj,
    );
  }

  if (typeof currKey === 'string') {
    return ndimLinterpolKeyString(
      currKey,
      dim,
      nPath,
      obj,
    );
  }

  throw Error(`Unknown key type '${typeof currKey}' received in '${nPath}'`);
}

/**
 *  Interpolation when key is a number
 *  Throws if obj[key1] or obj[key2] yields an array
 *  Throws if path for interpolation ends on an object
 *  Throws if rhs is a value but path suggests further traversal
 *  @param {string} currKey - current key for the lookup (number)
 *  @param {number} dim - 0 based level into nPath
 *  @param {(string|number)[]} nPath - the key to lookup for each nesting layer to search in obj
 *  @param {NestedObject} obj - n-nested object to traverse for interpolation
 */
ndimLinterpolKeyNumber = (
  currKey: number,
  dim: number,
  nPath: (number | string)[],
  obj: NestedObject,
): LinterpolRes => {
  const keys: number[] = Object.keys(obj).map((x) => parseFloat(x));
  const [i, extrapolation] = locateUpperBoundIndex(currKey, keys);

  const x1 = keys[i];
  const x0 = keys[i - 1];
  const y1 = obj[x1];
  const y0 = obj[x0];

  const recursionHelper = (rhs: number | number[] | NestedObject): LinterpolRes => {
    let res: LinterpolRes;
    if (Array.isArray(rhs)) {
      throw Error(`Interpolation on an array is not possible '${currKey}' in '${nPath}' for ${JSON.stringify(obj)}`);
    }
    if (typeof rhs === 'object') {
      if (dim === nPath.length - 1) {
        throw Error(`Interpolation is not possible for '${currKey}' in '${nPath}' for ${JSON.stringify(obj)}`);
      }
      //  recurse object
      res = ndimLinterpol(dim + 1, nPath, rhs);
    } else {
      //  this terminates the recursion - by implication, we should also be at the end of the path
      throwIfNotAtLast(
        currKey,
        dim,
        nPath,
        obj,
      );

      res = {
        val: rhs,
        extrapolation,
      };
    }
    return res;
  };

  const resy1 = recursionHelper(y1);
  const resy0 = recursionHelper(y0);

  const res = linterpol(
    currKey,
    [x0, x1],
    [resy0.val, resy1.val],
  );

  //  set extrapolation result if any extrapolation occurred
  res.extrapolation = res.extrapolation
    || resy0.extrapolation
    || resy1.extrapolation
    || extrapolation;

  return res;
};

/**
 *  Interpolation when key is a string
 *  Throws if key is not in form a|b|8 (string|string|number)
 *  Throws if a and b are not present in obj
 *  Throws if obj[a] and obj[b] are not arrays
 *  Throws if this is not the end of the path
 *  @param {string} currKey - current key for the lookup (string)
 *  @param {number} dim - 0 based level into nPath
 *  @param {(string|number)[]} nPath - the key to lookup for each nesting layer to search in obj
 *  @param {NestedObject} obj - n-nested object to traverse for interpolation
 */
ndimLinterpolKeyString = (
  currKey: string,
  dim: number,
  nPath: (number | string)[],
  obj: NestedObject,
): LinterpolRes => {
  const keys = currKey.split('|');
  if (keys.length !== 3) {
    throw Error(`Invalid key received '${currKey}' in ${nPath}`);
  }
  const xVals = obj[keys[0]];
  const yVals = obj[keys[1]];

  if (!xVals || !yVals) {
    throw Error(`Unrecognized key '${currKey}' in ${nPath}`);
  }

  if (!Array.isArray(xVals) || !Array.isArray(yVals)) {
    throw Error(`Interpolation requires array values for key '${currKey}' in ${nPath}`);
  }

  //  for a string key, we should be at last element in nPath
  throwIfNotAtLast(
    currKey,
    dim,
    nPath,
    obj,
  );

  return linterpol(
    parseFloat(keys[2]),
    xVals,
    yVals,
  );
};
