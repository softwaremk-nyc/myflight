import { NestedObject } from '../../src/util';

export const climbNotes = [
  'Table 5.8 - At 3100 lbs (Normal Climb - 90 KIAS)',
  'Flaps Up, 2400 RPM, Full Throttle, Standard Temp, Cowl Flaps Open',
  'Add 1.7 gals for start, taxi, takeoff allowance (*)',
  'Increase time, fuel, distance by 10% for each 10c above standard (*)',
  '(*) applied to this calculation',
];

export const climb: NestedObject = {
  pAlt: [0, 2000, 4000, 6000, 8000, 10000],
  time: [0, 3, 6, 10, 14, 19],
  fuel: [0, 0.8, 1.6, 2.5, 3.5, 4.6],
  dist: [0, 5, 10, 16, 23, 31],
};
