import {
  f2c,
  c2f,
  pressureAlt,
  windComponent,
} from '../../src/flightcalc';

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

describe('pressure altitude conversion', () => {
  test('pressure altitude calcs', () => {
    //  indicated alt,
    //  barometer,
    //  expected pressure
    const tests = [
      [100, 29.92, 100],
      [100, 28.92, 1100],
      [100, 30.43, -410],
      [100, 30.92, -900],
    ];

    tests.forEach((test) => {
      expect(pressureAlt(test[0], test[1])).toEqual(test[2]);
    });
  });
});

describe('headwind and crosswind component calculations', () => {
  test('wind calculation', () => {
    //  wind speed
    //  wind direction
    //  rwy heading
    const tests = [
      //  direct head & tail at rwy 22 and rwy 01
      [10, 220, 22, [10, 0]], // direct head
      [10, 40, 22, [-10, 0]], // direct tail (negative)
      [10, 10, 1, [10, 0]], // direct head
      [10, 190, 1, [-10, 0]], // direct tail (negative)
      //  direct x-wind at rwy 22 and rwy 01
      [10, 310, 22, [0, -10]], // 90 deg right x-wind (negative)
      [10, 130, 22, [0, 10]], // 90 deg left x-wind
      [10, 100, 1, [0, -10]], // 90 deg right x-wind (negative)
      [10, 280, 1, [0, 10]], // 90 deg left x-wind
      //  45 deg head x-wind at rwy 22 and rwy 01
      [10, 265, 22, [7.1, -7.1]], // 45 deg right x-wind (negative)
      [10, 175, 22, [7.1, 7.1]], // 45 deg left x-wind
      [10, 55, 1, [7.1, -7.1]], // 45 deg right x-wind (negative)
      [10, 325, 1, [7.1, 7.1]], // 45 deg left x-wind
      //  45 deg tail x-wind at rwy 22 and rwy 01
      [10, 355, 22, [-7.1, -7.1]], // 45 deg right x-wind (negative)
      [10, 85, 22, [-7.1, 7.1]], // 45 deg left x-wind
      [10, 145, 1, [-7.1, -7.1]], // 45 deg right x-wind (negative)
      [10, 235, 1, [-7.1, 7.1]], // 45 deg left x-wind
    ];

    tests.forEach((test) => {
      expect(windComponent(
        test[0] as number,
        test[1] as number,
        test[2] as number,
      )).toEqual(test[3]);
    });
  });

  test('throws if wind direction is wrong', () => {
    expect(() => { windComponent(1, 0, 1); }).toThrow('Invalid wind direction');
    expect(() => { windComponent(1, 361, 1); }).toThrow('Invalid wind direction');
  });

  test('throws if rwy is wrong', () => {
    expect(() => { windComponent(1, 10, 0); }).toThrow('Invalid runway provided');
    expect(() => { windComponent(1, 10, 37); }).toThrow('Invalid runway provided');
  });
});
