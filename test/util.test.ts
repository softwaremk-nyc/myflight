import {
  linterpol,
  round,
} from '../src/util';

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

describe('linear interpolation calculation', () => {
  test('throws on mismatched lookup value lengths', () => {
    expect(() => { linterpol(1, [], [1]); }).toThrow('inputs are mismatched');
  });

  test('throws on insufficient values', () => {
    expect(() => { linterpol(1, [2], [2]); }).toThrow('requires at least two lookup elements');
  });

  test('throws if ascending sort is broken', () => {
    expect(() => { linterpol(6, [1, 2, 3, 2], [1, 2, 3, 4]); }).toThrow('not sorted in ascending order');
  });

  test('throws if descending sort is broken', () => {
    expect(() => { linterpol(1, [4, 3, 2, 3], [1, 2, 3, 4]); }).toThrow('not sorted in descending order');
  });

  const xvals = [1, 2, 3, 4, 5];
  const xvalsRev = [5, 4, 3, 2, 1];
  const yvals = [5, 10, 15, 20, 25];

  //  ascending interpolation tests
  test('ascending interpolation - exact lower end match', () => {
    const { val, extrapolation } = linterpol(1, xvals, yvals);
    expect(val).toEqual(5);
    expect(extrapolation).toBeFalsy();
  });

  test('ascending interpolation - exact upper end match', () => {
    const { val, extrapolation } = linterpol(5, xvals, yvals);
    expect(val).toEqual(25);
    expect(extrapolation).toBeFalsy();
  });

  test('ascending interpolation - exact mid end match', () => {
    const { val, extrapolation } = linterpol(3, xvals, yvals);
    expect(val).toEqual(15);
    expect(extrapolation).toBeFalsy();
  });

  test('ascending interpolation - calculated', () => {
    const { val, extrapolation } = linterpol(1.2, xvals, yvals);
    expect(val).toEqual(6);
    expect(extrapolation).toBeFalsy();
  });

  test('ascending interpolation - calculated', () => {
    const { val, extrapolation } = linterpol(2.5, xvals, yvals);
    expect(val).toEqual(12.5);
    expect(extrapolation).toBeFalsy();
  });

  test('ascending interpolation - calculated', () => {
    const { val, extrapolation } = linterpol(4.8, xvals, yvals);
    expect(val).toEqual(24);
    expect(extrapolation).toBeFalsy();
  });

  //  ascending extrapolation tests
  test('ascending extrapolation - calculated', () => {
    const { val, extrapolation } = linterpol(0.8, xvals, yvals);
    expect(val).toEqual(4);
    expect(extrapolation).toBeTruthy();
  });

  test('ascending extrapolation - calculated', () => {
    const { val, extrapolation } = linterpol(5.2, xvals, yvals);
    expect(val).toEqual(26);
    expect(extrapolation).toBeTruthy();
  });

  //  descending interpolation tests
  test('descending interpolation - exact lower end match', () => {
    const { val, extrapolation } = linterpol(5, xvalsRev, yvals);
    expect(val).toEqual(5);
    expect(extrapolation).toBeFalsy();
  });

  test('descending interpolation - exact upper end match', () => {
    const { val, extrapolation } = linterpol(1, xvalsRev, yvals);
    expect(val).toEqual(25);
    expect(extrapolation).toBeFalsy();
  });

  test('descending interpolation - exact mid end match', () => {
    const { val, extrapolation } = linterpol(3, xvalsRev, yvals);
    expect(val).toEqual(15);
    expect(extrapolation).toBeFalsy();
  });

  test('descending interpolation - calculated', () => {
    const { val, extrapolation } = linterpol(4.8, xvalsRev, yvals);
    expect(val).toEqual(6);
    expect(extrapolation).toBeFalsy();
  });

  test('descending interpolation - calculated', () => {
    const { val, extrapolation } = linterpol(2.5, xvalsRev, yvals);
    expect(val).toEqual(17.5);
    expect(extrapolation).toBeFalsy();
  });

  test('descending interpolation - calculated', () => {
    const { val, extrapolation } = linterpol(1.2, xvalsRev, yvals);
    expect(val).toEqual(24);
    expect(extrapolation).toBeFalsy();
  });

  //  decending extrapolation tests
  test('descending extrapolation - calculated', () => {
    const { val, extrapolation } = linterpol(5.2, xvalsRev, yvals);
    expect(val).toEqual(4);
    expect(extrapolation).toBeTruthy();
  });

  test('descending extrapolation - calculated', () => {
    const { val, extrapolation } = linterpol(0.8, xvalsRev, yvals);
    expect(val).toEqual(26);
    expect(extrapolation).toBeTruthy();
  });
});
