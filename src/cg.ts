import { round } from './util';

export interface CgData {
  weight: number,
  arm: number,
  moment: number,
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
    input.moment = input.weight * input.arm;
    /* eslint-enable no-param-reassign */
    cgDataCalc.weight += input.weight;
    cgDataCalc.moment += input.moment;
  });

  if (cgDataCalc.weight) {
    cgDataCalc.arm = round(cgDataCalc.moment / cgDataCalc.weight, 1);
  }

  return cgDataCalc;
}
