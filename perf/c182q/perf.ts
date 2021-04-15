import {
  round,
  linterpol,
  ndimLinterpol,
  LinterpolRes,
  NestedObject,
} from '../../src/util';
import {
  AirportInfo,
  PerfResult,
  nightAndIfrReserve,
} from '../perfCommon';
import { bhpSeaLevel, bhpAtAlt, fuel } from './fuel';
import {
  todistA,
  todistB,
  todist,
  todist50A,
  todist50B,
  todist50,
} from './todist';
import {
  ldgdistA,
  ldgdistB,
  ldgdist,
  ldgdist50A,
  ldgdist50B,
  ldgdist50,
} from './ldgdist';
import {
  c2f,
  stdTemp,
  ktsToMph,
} from '../../src/flightcalc';
import cruise from './cruise';

/**
 *  Perf calculation for pa30 - twin comanche
 *  @param {number} mp - manifold pressure
 *  @param {number} rpm - engine rpm
 *  @param {number} toWeight - takeoff weight
 *  @param {AirportInfo} start - departure airport info
 *  @param {AirportInfo} dest - destination airport info
 *  @param {number} pAltCruise - pressure altitude for cruise
 *  @param {number} cruiseHours - time at cruise
 *  @param {boolean} bestEconomy - if T, otherwise bestPower
 */
export default function perfPa30(
  mp: number,
  rpm: number,
  toWeight: number,
  start: AirportInfo,
  dest: AirportInfo,
  pAltCruise: number,
  cruiseHours: number,
  bestEconomy: boolean,
): PerfResult {
  const calcDist = (
    objA: NestedObject,
    objB: NestedObject,
    obj: NestedObject,
    weight: number,
    airport: AirportInfo,
  ): LinterpolRes => {
    const distA = ndimLinterpol(0, [airport.pAlt, `temp|refa|${airport.temp}`], objA);
    const distB = ndimLinterpol(0, [distA.val, `lbs|refb|${weight}`], objB);
    const dist = ndimLinterpol(0, [distB.val, `wind|dist|${airport.headWind}`], obj);
    dist.extrapolation = dist.extrapolation
      || distA.extrapolation
      || distB.extrapolation;

    return dist;
  };

  /* eslint-disable no-param-reassign */
  start.temp = c2f(start.temp);
  start.headWind = ktsToMph(start.headWind);
  dest.temp = c2f(dest.temp);
  dest.headWind = ktsToMph(dest.headWind);
  /* eslint-enable no-param-reassign */

  const bhpSl = ndimLinterpol(0, [rpm, `mp|bhp|${mp}`], bhpSeaLevel);
  const bhpAnyAlt = ndimLinterpol(0, [rpm, `mp|bhp|${mp}`], bhpAtAlt);
  const bhpPalt = ndimLinterpol(0, [rpm, `mp|pAlt|${mp}`], bhpAtAlt);
  const bhp = linterpol(
    pAltCruise,
    [0, bhpPalt.val],
    [bhpSl.val, bhpAnyAlt.val],
  );
  bhp.extrapolation = bhp.extrapolation
    || bhpSl.extrapolation
    || bhpAnyAlt.extrapolation
    || bhpPalt.extrapolation;

  //  Altitude correction table 5-04
  const cruiseStdT = c2f(stdTemp(pAltCruise));
  const airportStdTCorrection = start.temp - c2f(stdTemp(start.pAlt));
  bhp.val = round(
    bhp.val
    * Math.sqrt(
      (460 + cruiseStdT) / (460 + airportStdTCorrection + cruiseStdT),
    ),
    1,
  );
  const cruiseGph = bestEconomy
    ? ndimLinterpol(0, [rpm, `bhp|gphEcon|${bhp.val}`], fuel)
    : ndimLinterpol(0, [rpm, `bhp|gphPower|${bhp.val}`], fuel);

  //  multi-engine
  cruiseGph.val *= 2;

  const totalFuel = {
    val: round(
      (cruiseHours + nightAndIfrReserve) * cruiseGph.val,
      1,
    ),
    extrapolation: cruiseGph.extrapolation,
  };

  const bhppct = {
    //  160hp per engine
    val: round(bhp.val / 160, 3) * 100,
    extrapolation: bhp.extrapolation,
  };

  const cruiseKtas = ndimLinterpol(
    0,
    [bhppct.val, `pAlt|ktas|${pAltCruise}`],
    cruise,
  );

  return {
    climbTime: null,
    climbFuel: null,
    climbDist: null,
    cruiseRpm: null,
    cruiseKtas,
    cruiseGph,
    //  at actual takeoff weight
    toDist: calcDist(todistA, todistB, todist, toWeight, start),
    toDist50: calcDist(todist50A, todist50B, todist50, toWeight, start),
    //  TODO: should offset takeoff weight with fuel burn?? Or leave in as factor of safety
    ldgDist: calcDist(ldgdistA, ldgdistB, ldgdist, toWeight, dest),
    ldgDist50: calcDist(ldgdist50A, ldgdist50B, ldgdist50, toWeight, dest),
    totalFuel,
    accelStop: null,
    bhp,
    bhppct,
  };
}
