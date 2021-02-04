import { round } from './util';

/**
 * cg info for a single component (eg: passenger)
 */
export interface CgData {
  weight: number,
  arm: number,
  moment: number,
}

/**
 * cg info with metadata (eg: component name, max weight, nested components it contains, etc.)
 */
export interface CgDataEntry {
  name: string;
  cgData: CgData | null,
  maxW: number | null,
  comps: CgDataEntry[] | null,
  notes: string | null,
}

/**
 * cg info list per aircraft keyed by id (eg: N-registration)
 */
export interface CgDataEntries {
  [name: string]: CgDataEntry[];
}

/**
 * cg info list of all aircraft keyed by type (eg: C172)
 */
export interface CgDataEntriesList {
  [name: string]: CgDataEntries;
}

/**
 * Filtered CgDataEntry with just the name, cgData, and maxW
 */
export interface CGDisplay {
  name: string;
  cgData: CgData;
  maxW: number | null;
}

export function flattenCgDataForDisplay(
  entries: CgDataEntry[],
): CGDisplay[] {
  let result: CGDisplay[] = [];
  entries.forEach((entry) => {
    if (entry.cgData) {
      result.push({ name: entry.name, cgData: entry.cgData, maxW: entry.maxW });
    }
    if (entry.comps) {
      result = result.concat(flattenCgDataForDisplay(entry.comps));
    }
  });
  return result.filter((x) => x.cgData !== null);
}

export function flattenCgData(
  entries: CgDataEntry[],
): CgData[] {
  const result = flattenCgDataForDisplay(entries);
  return result.map((x) => x.cgData);
}

/**
 *  Calculate the CG given a list of weights & arms
 *  This method will fill in the moments for each item in the list
 *
 *  @param {CgData[]} cgInputs - list of weights & arms
 *  @returns {CgData} - calculated CG, along with total weight & moment
 */
export function calcCG(
  cgInputs: CgData[],
): CgData {
  const cgDataCalc: CgData = {
    weight: 0,
    arm: 0,
    moment: 0,
  };

  cgInputs.forEach((input) => {
    /* eslint-disable no-param-reassign */
    input.moment = round(input.weight * input.arm, 1);
    /* eslint-enable no-param-reassign */
    cgDataCalc.weight += input.weight;
    cgDataCalc.moment += input.moment;
  });

  if (cgDataCalc.weight) {
    cgDataCalc.arm = round(cgDataCalc.moment / cgDataCalc.weight, 1);
  }

  return cgDataCalc;
}

/**
 *  Calculates the CG using the provided weights
 *  Excess provided weights are ignored if not needed by a/c configuration
 *  For insufficient weights, remaining entries in a/c configuration are zeroed
 *  @param {string} acName - aircraft name
 *  @param {number[]} weights - weights for each cgData point (-1 to ignore data point)
 *  @param {CgDataEntry[]} cgData - current aircraft - first level (nested CgDataEntry.comps remain)
 *  @returns - calculated cg, input cgData flattend for calc, calc warnings, w - recursion counter
 */
export function calcCGForWeights(
  acName: string,
  weights: number[],
  cgDataEntries: CgDataEntry[],
): [CgData, CgData[], string[], number] {
  let warnings: string[] = [];
  let w: number = 0;
  let i: number = 0;

  const checkOverweight = (
    weightName: string,
    refMaxWeight: number | null,
    weightToCheck: number,
  ) => {
    if (refMaxWeight && refMaxWeight < weightToCheck) {
      warnings.push(`'${weightName}' weight at ${weightToCheck} exceeds maximum weight of ${refMaxWeight}`);
    }
  };

  for (; w < weights.length; w += 1) {
    const currCgData = cgDataEntries[i];
    if (currCgData.cgData) {
      if (weights[w] !== -1) {
        currCgData.cgData.weight = weights[w];
      }
      checkOverweight(
        currCgData.name,
        currCgData.maxW,
        currCgData.cgData.weight,
      );
    }
    //  recursive components
    if (currCgData.comps) {
      const [rCalcCg, , rWarnings, rw] = calcCGForWeights(
        acName,
        weights.slice(currCgData.cgData ? w + 1 : w),
        currCgData.comps,
      );
      w += rw;
      warnings = warnings.concat(rWarnings);
      checkOverweight(
        currCgData.name,
        currCgData.maxW,
        currCgData.cgData
          ? currCgData.cgData.weight + rCalcCg.weight
          : rCalcCg.weight,
      );
    }

    //  don't advance weight index if we are the end of cgDataEntries
    //  this covers the recursion case to pop back and return an accurate
    //  advance w index
    i += 1;
    if (i >= cgDataEntries.length) {
      break;
    }
  }

  //  zero out remaining entries (if inusufficient weights were provided)
  for (; i < cgDataEntries.length; i += 1) {
    const currCgData = cgDataEntries[i];
    if (currCgData.cgData) {
      currCgData.cgData.weight = 0;
    }
  }

  const flat = flattenCgData(cgDataEntries);

  return [
    calcCG(flat),
    flat,
    warnings,
    w,
  ];
}
