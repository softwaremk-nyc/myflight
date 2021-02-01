import { LinterpolRes } from '../src/util';

export const basicEmptyLabel = 'Basic Empty';
export const lbsPerGallonFuel = 6;
export const nightAndIfrReserve = 0.75;

export interface AirportInfo {
  pAlt: number,
  temp: number
  stdTempCorrection: number;
  headWind: number;
  isPaved: boolean,
}

export interface PerfResult {
  climbTime: LinterpolRes | null,
  climbFuel: LinterpolRes | null,
  climbDist: LinterpolRes | null,
  cruiseRpm: LinterpolRes | null,
  cruiseKtas: LinterpolRes | null,
  cruiseGph: LinterpolRes | null,
  toDist: LinterpolRes | null,
  toDist50: LinterpolRes | null,
  ldgDist: LinterpolRes | null,
  ldgDist50: LinterpolRes | null,
  totalFuel: LinterpolRes | null,
  accelStop: LinterpolRes | null,
  bhp: LinterpolRes | null,
  bhppct: LinterpolRes | null,
}
