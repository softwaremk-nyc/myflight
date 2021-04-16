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
import c182q from '../c182q/cg';

/**
 *  Perf calculation for C182T
 *  @param {number} mp - manifold for constant speed prop
 *  @param {number} rpm - rpm for constant speed prop
 *  @param {number} toWeight - takeoff weight
 *  @param {AirportInfo} start - departure airport info
 *  @param {AirportInfo} dest - destination airport info
 *  @param {number} pAltCruise - pressure altitude for cruise
 *  @param {number} cruiseHours - time at cruise
 */
export default function perf182t(
  mp: number,
  rpm: number,
  toWeight: number,
  start: AirportInfo,
  dest: AirportInfo,
  pAltCruise: number,
  cruiseHours: number,
): PerfResult {
  return perfCessnaGeneral(
    mp,
    rpm,
    -1,
    toWeight,
    //  all N numbers have the same maxW
    //  here use C182Q max instead of T - since T has a lower landing W than original t/o max ...
    c182q.N4468N[0].maxW ?? -1,
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
    1.7,
  );
}
