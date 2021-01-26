import {
  round,
  ndimLinterpol,
  addLinterpolRes,
  subtractLinterpolRes,
  LinterpolRes,
  NestedObject,
} from '../../src/util';
import {
  AirportInfo,
  PerfResult,
  nightAndIfrReserve,
} from '../perfCommon';
import { climb } from './climb';
import cruise from './cruise';
import { todist, todist50 } from './todist';
import { ldgdist, ldgdist50 } from './ldgdist';

/**
 *  Adjust provided distance for headWind factor
 *  Throws if tailwind exceeds 10 knots (per POH)
 *  @param {number} headWind - headwind (negative for tailwind)
 *  @param {number} distance - provided distance
 */
export function distAdjustmentForWind(
  headWind: number,
  distance: number,
): number {
  if (headWind < -10) {
    throw Error(`Maximum tail wind ${headWind} has been exceeded`);
  }

  return round(
    headWind >= 0
      ? distance - (0.1 * (headWind / 9) * distance)
      : distance - (0.1 * (headWind / 2) * distance),
    1,
  );
}

/**
 *  Adjust provided value for positive variations from std temp (increase only)
 *  @param stdTempCorrection - +/- std temperature in C correction
 *  @param toAdjust - value to adjus
 */
export function anyAdjustmentForTemp(
  stdTempCorrection: number,
  toAdjust: number,
): number {
  return round(
    stdTempCorrection <= 0
      ? toAdjust
      : toAdjust + (0.1 * (stdTempCorrection / 10) * toAdjust),
    1,
  );
}

/**
 *  Perf calculation for C172sp
 *  @param {number} bhp - %bhp
 *  @param {number} toWeight - takeoff weight
 *  @param {AirportInfo} start - departure airport info
 *  @param {AirportInfo} dest - destination airport info
 *  @param {number} pAltCruise - pressure altitude for cruise
 *  @param {number} cruiseHours - time at cruise
 */
export function perf172(
  bhp: number,
  toWeight: number,
  start: AirportInfo,
  dest: AirportInfo,
  pAltCruise: number,
  cruiseHours: number,
): PerfResult {
  const climbTime = subtractLinterpolRes(
    ndimLinterpol(0, [`pAlt|time|${start.pAlt}`], climb),
    ndimLinterpol(0, [`pAlt|time|${pAltCruise}`], climb),
  );
  climbTime.val = anyAdjustmentForTemp(
    start.stdTempCorrection,
    climbTime.val,
  );

  const climbFuel = subtractLinterpolRes(
    ndimLinterpol(0, [`pAlt|fuel|${start.pAlt}`], climb),
    ndimLinterpol(0, [`pAlt|fuel|${pAltCruise}`], climb),
  );
  climbFuel.val = anyAdjustmentForTemp(
    start.stdTempCorrection,
    climbFuel.val,
  ) + 1.4; /* START/TAXI ALLOWANCE */

  const climbDist = subtractLinterpolRes(
    ndimLinterpol(0, [`pAlt|dist|${start.pAlt}`], climb),
    ndimLinterpol(0, [`pAlt|dist|${pAltCruise}`], climb),
  );
  climbDist.val = anyAdjustmentForTemp(
    start.stdTempCorrection,
    climbDist.val,
  );

  const cruiseRpm = ndimLinterpol(0, [pAltCruise, start.stdTempCorrection, `bhp|rpm|${bhp}`], cruise);
  const cruiseKtas = ndimLinterpol(0, [pAltCruise, start.stdTempCorrection, `bhp|ktas|${bhp}`], cruise);
  const cruiseGph = ndimLinterpol(0, [pAltCruise, start.stdTempCorrection, `bhp|gph|${bhp}`], cruise);

  const calcTakeOffDist = (obj: NestedObject): LinterpolRes => {
    const toDist = ndimLinterpol(0, [toWeight, start.pAlt, `temp|dist|${start.temp}`], obj);
    toDist.val = distAdjustmentForWind(
      start.headWind,
      toDist.val,
    );
    if (!start.isPaved) {
      toDist.val *= 1.15;
    }
    return toDist;
  };

  const calcLandingDist = (obj: NestedObject): LinterpolRes => {
    const ldgDist = ndimLinterpol(0, [dest.pAlt, `temp|dist|${dest.temp}`], obj);
    ldgDist.val = distAdjustmentForWind(
      dest.headWind,
      ldgDist.val,
    );
    if (!dest.isPaved) {
      ldgDist.val *= 1.35;
    }
    return ldgDist;
  };

  const totalFuel = addLinterpolRes(
    climbFuel,
    {
      val: round(
        (cruiseHours + nightAndIfrReserve) * cruiseGph.val,
        1,
      ),
      extrapolation: cruiseGph.extrapolation,
    },
  );

  return {
    climbTime,
    climbFuel,
    climbDist,
    cruiseRpm,
    cruiseKtas,
    cruiseGph,
    //  at actual takeoff weight
    toDist: calcTakeOffDist(todist),
    toDist50: calcTakeOffDist(todist50),
    //  at max weight only per POH
    ldgDist: calcLandingDist(ldgdist),
    ldgDist50: calcLandingDist(ldgdist50),
    totalFuel,
    accelStop: null,
    bhp: null,
    bhppct: null,
  };
}
