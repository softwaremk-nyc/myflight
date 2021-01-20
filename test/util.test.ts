import round from '../src/util';

describe('rounding calculation', () => {
  test('no rounding needed', () => {
    const res = round(4, 1);
    expect(res).toEqual(4);
  });

  //  original val
  //  precision
  //  expected rounded result
  const tests = [
    [4.75, 1, 4.8],
    [4.75, 2, 4.75],
    [4.75, 3, 4.75],
    [4.75, 30, 4.75],
    [4.72, 1, 4.7],
    [4.98, 0, 5.0],
    [4.98, 1, 5.0],
    [4.98, 2, 4.98],
    [4.14, 2, 4.14],
    [4.14, 1, 4.1],
    [4.14, 0, 4.0],
  ];

  test('expected rounding is occurring', () => {
    tests.forEach((test) => {
      const res = round(test[0], test[1]);
      expect(res).toEqual(test[2]);
    });
  });
});
