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
 *  @param {number} mp - set to -1 unused - otherwise manifold for constant speed prop
 *  @param {number} rpm - set to -1 unused - otherwise rpm for constant speed prop
 *  @param {number} bhp - set to -1 unused - otherwise %bhp for fixed pitch prop
 *  @param {number} toWeight - takeoff weight
 *  @param {AirportInfo} start - departure airport info
 *  @param {AirportInfo} dest - destination airport info
 *  @param {number} pAltCruise - pressure altitude for cruise
 *  @param {number} cruiseHours - time at cruise
 *
 *  @param {NestedObject} climb - climb performance tables
 *  @param {NestedObject} cruise - cruise performance tables
 *  @param {NestedObject} toDist - takeoff dist performance tables
 *  @param {NestedObject} toDist50 - takeoff dist over 50 ft obstacle performance tables
 *  @param {NestedObject} ldgDist - landing dist performance tables
 *  @param {NestedObject} ldgDist50 - landing dist over 50 ft obstacle performance tables
 *  @param {number} startTaxiAllownace - gallons for engine start and taxi
 */
export function perfCessnaGeneral(
  mp: number,
  rpm: number,
  bhp: number,
  toWeight: number,
  start: AirportInfo,
  dest: AirportInfo,
  pAltCruise: number,
  cruiseHours: number,
  climb: NestedObject,
  cruise: NestedObject,
  todist: NestedObject,
  todist50: NestedObject,
  ldgdist: NestedObject,
  ldgdist50: NestedObject,
  startTaxiAllowance: number,
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
  ) + startTaxiAllowance; /* START/TAXI ALLOWANCE */

  const climbDist = subtractLinterpolRes(
    ndimLinterpol(0, [`pAlt|dist|${start.pAlt}`], climb),
    ndimLinterpol(0, [`pAlt|dist|${pAltCruise}`], climb),
  );
  climbDist.val = anyAdjustmentForTemp(
    start.stdTempCorrection,
    climbDist.val,
  );

  let cruiseRpm: LinterpolRes | null = null;
  let cruiseKtas: LinterpolRes | null = null;
  let cruiseGph: LinterpolRes = {
    val: 0,
    extrapolation: false,
  };
  let cruiseBhp: LinterpolRes | null = null;

  if (bhp !== -1) {
    cruiseRpm = ndimLinterpol(0, [pAltCruise, start.stdTempCorrection, `bhp|rpm|${bhp}`], cruise);
    cruiseKtas = ndimLinterpol(0, [pAltCruise, start.stdTempCorrection, `bhp|ktas|${bhp}`], cruise);
    cruiseGph = ndimLinterpol(0, [pAltCruise, start.stdTempCorrection, `bhp|gph|${bhp}`], cruise);
  } else if (
    mp !== -1 && rpm !== -1
  ) {
    cruiseBhp = ndimLinterpol(0, [pAltCruise, rpm, start.stdTempCorrection, `mp|bhp|${mp}`], cruise);
    cruiseKtas = ndimLinterpol(0, [pAltCruise, rpm, start.stdTempCorrection, `mp|ktas|${mp}`], cruise);
    cruiseGph = ndimLinterpol(0, [pAltCruise, rpm, start.stdTempCorrection, `mp|gph|${mp}`], cruise);
  }

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
      ldgDist.val *= 1.45;
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
    bhp: cruiseBhp,
    bhppct: null,
  };
}
