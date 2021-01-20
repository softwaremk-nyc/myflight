import round from './util';

export interface CgData {
  weight: number,
  arm: number,
  moment: number,
}

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
