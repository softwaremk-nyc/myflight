import { round } from './util';

/**
 *  convert knots to mph
 *  @param k - knots val to convert
 */
export function ktsToMph(
  k: number,
): number {
  return (k * 6076) / 5280;
}

/**
 *  Fahrenheit to Celcius
 *  @param {number} f - fahrenheit to convert
 */
export function f2c(
  f: number,
): number {
  return round(((f - 32) * 5) / 9, 1);
}

/**
 *  Celcius to Fahrenheit
 *  @param {number} c - celcius to convert
 */
export function c2f(
  c: number,
): number {
  return round((c * 9) / 5 + 32, 1);
}

/**
 * Converts provided altitude to pressure altitude
 * @param {number} alt - altitude
 * @param {number} barometer - barometer setting (std: 29.92)
 */
export function pressureAlt(
  alt: number,
  barometer: number,
): number {
  return round((29.92 - barometer) * 1000 + alt, 1);
}

function degToRadians(
  deg: number,
): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calculates head wind and cross wind component
 * Throws if direction is not in 1-360
 * Throws if rwy is not specified 1-36
 * @param {number} speed - wind speed
 * @param {number} direction - wind direction (1 - 360)
 * @param {number} rwy - rwy heading (1 - 36)
 */
export function windComponent(
  speed: number,
  direction: number,
  rwy: number,
): [number, number] {
  if (direction < 0 || direction > 360) {
    throw Error(`Invalid wind direction provided ${direction}`);
  }
  if (rwy < 1 || rwy > 36) {
    throw Error(`Invalid runway provided ${rwy}`);
  }
  const degs = (rwy * 10) - direction;
  const headFactor = Math.cos(degToRadians(degs));
  const crossFactor = Math.sin(degToRadians(degs));
  return [round(speed * headFactor, 1), round(speed * crossFactor, 1)];
}

/**
 *  Returns std temp in c for a given pressure altitude
 *  @param {number} pAlt - pressure altitude
 */
export function stdTemp(
  pAlt: number,
): number {
  return round(
    15 - (2 * (pAlt / 1000)),
    1,
  );
}
