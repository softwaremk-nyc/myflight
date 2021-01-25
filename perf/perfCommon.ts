import { LinterpolRes } from '../src/util';

export const basicEmptyLabel = 'Basic Empty';
export const lbsPerGallonFuel = 6;
export const nightAndIfrReserve = 0.75;

export interface AirportInfo {
  pAlt: number,
  temp: number,
  stdTempCorrection: number,
  headWind: number,
  isPaved: boolean,
}

export interface PerfResult {
  climbTime: LinterpolRes,
  climbFuel: LinterpolRes,
  climbDist: LinterpolRes,
  cruiseRpm: LinterpolRes,
  cruiseKtas: LinterpolRes,
  cruiseGph: LinterpolRes,
  toDist: LinterpolRes,
  toDist50: LinterpolRes,
  ldgDist: LinterpolRes,
  ldgDist50: LinterpolRes,
  totalFuel: LinterpolRes,
}
