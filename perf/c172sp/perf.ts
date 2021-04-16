import {
  AirportInfo,
  PerfResult,
} from '../perfCommon';
import {
  perfCessnaGeneral,
} from '../cessna/perfCessna';
import { climb } from './climb';
import cruise from './cruise';
import { todist, todist50 } from './todist';
import { ldgdist, ldgdist50 } from './ldgdist';

/**
 *  Perf calculation for C172sp
 *  @param {number} bhp - %bhp
 *  @param {number} toWeight - takeoff weight
 *  @param {AirportInfo} start - departure airport info
 *  @param {AirportInfo} dest - destination airport info
 *  @param {number} pAltCruise - pressure altitude for cruise
 *  @param {number} cruiseHours - time at cruise
 */
export default function perf172(
  bhp: number,
  toWeight: number,
  start: AirportInfo,
  dest: AirportInfo,
  pAltCruise: number,
  cruiseHours: number,
): PerfResult {
  return perfCessnaGeneral(
    -1,
    -1,
    bhp,
    toWeight,
    start,
    dest,
    pAltCruise,
    cruiseHours,
    climb,
    cruise,
    todist,
    todist50,
    ldgdist,
    ldgdist50,
    1.4,
  );
}
