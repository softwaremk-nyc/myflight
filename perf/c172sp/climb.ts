import { NestedObject } from '../../src/util';

export const climbNotes = [
  'Table 5.7 - At 2550 lbs',
  'Flaps Up, Full Throttle, Standard Temp',
  'Add 1.4 gals for start, taxi, takeoff allowance (*)',
  'Mixture leaned above 3000ft for max RPM',
  'Increase time, fuel, distance by 10% for each 10c above standard (*)',
  '(*) applied to this calculation',
];

export const climb: NestedObject = {
  pAlt: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
  time: [0, 1, 3, 4, 6, 8, 10, 12, 14, 17, 20, 24, 28],
  fuel: [0, 0.4, 0.8, 1.2, 1.5, 1.9, 2.2, 2.6, 3, 3.4, 3.9, 4.4, 5],
  dist: [0, 2, 4, 6, 8, 10, 13, 16, 19, 22, 27, 32, 38],
};
