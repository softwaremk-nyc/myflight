import {
  f2c,
  c2f,
} from '../src/flightcalc';

describe('temperature conversion calculations', () => {
  //  fahrenheit
  //  celcius
  const tests = [
    [-22, -30],
    [-13, -25],
    [-13, -25],
    [5, -15],
    [14, -10],
    [14, -10],
    [32, 0],
    [59, 15],
    [68, 20],
    [77, 25],
    [86, 30],
    [104, 40],
  ];

  test('f to c calcs', () => {
    tests.forEach((test) => {
      expect(f2c(test[0])).toEqual(test[1]);
    });
  });

  test('c to 2 calcs', () => {
    tests.forEach((test) => {
      expect(c2f(test[1])).toEqual(test[0]);
    });
  });
});
