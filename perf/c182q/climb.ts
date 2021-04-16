import { NestedObject } from '../../src/util';

export const climbNotes = [
  'Table 5.6 - At 2950 lbs (Normal Climb - 90 KIAS)',
  'Flaps Up, 2400 RPM, Full Throttle, Standard Temp, Cowl Flaps Open',
  'Add 1.7 gals for start, taxi, takeoff allowance (*)',
  'Mixture leaned above 5000ft for max RPM',
  'Increase time, fuel, distance by 10% for each 10c above standard (*)',
  '(*) applied to this calculation',
];

export const climb: NestedObject = {
  pAlt: [0, 2000, 4000, 6000, 8000, 10000],
  time: [0, 3, 6, 9, 13, 17],
  fuel: [0, 0.8, 1.7, 2.6, 3.6, 4.8],
  dist: [0, 5, 9, 14, 20, 28],
};
