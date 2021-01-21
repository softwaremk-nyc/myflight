import { round } from './util';

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
