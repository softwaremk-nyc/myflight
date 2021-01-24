import {
  linterpol,
  round,
  ndimLinterpol,
  NestedObject,
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
    [-0.9, 0, -1.0],
    [-0.123, 1, -0.1],
    [-0.01, 0, 0], // disallow negative 0
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
    expect(() => { linterpol(1, [], [1]); }).toThrow('input lengths are mismatched');
  });

  test('throws on insufficient values', () => {
    expect(() => { linterpol(1, [2], [2]); }).toThrow('requires at least two elements');
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

describe('nested numeric object interpolation', () => {
  const obj: NestedObject = {
    1: {
      5: {
        3: 10,
        6: 20,
        9: 30,
      },
      10: {
        3: 40,
        6: 50,
        9: 60,
      },
      15: {
        3: 70,
        6: 80,
        9: 90,
      },
    },
    2: {
      5: {
        3: 100,
        6: 110,
        9: 120,
      },
      10: {
        3: 130,
        6: 140,
        9: 150,
      },
      15: {
        3: 160,
        6: 170,
        9: 180,
      },
    },
  };

  //  path to check
  //  extrapolation result
  //  expected interpolation result
  const tests = [
    //  exact matches
    [[1, 5, 3], false, 10],
    [[1, 5, 9], false, 30],
    [[1, 15, 9], false, 90],
    [[2, 10, 6], false, 140],
    [[2, 15, 9], false, 180],

    //  interpolate at third dim
    [[1, 5, 4.5], false, 15],
    [[1, 10, 4.5], false, 45],
    [[1, 5, 7.5], false, 25],
    [[1, 10, 7.5], false, 55],
    [[2, 5, 4.5], false, 105],
    [[2, 5, 7.5], false, 115],
    [[2, 10, 7.5], false, 145],
    [[2, 15, 7.5], false, 175],

    //  extrapolate at third dim
    [[1, 5, 1.5], true, 5],
    [[1, 5, 10.5], true, 35],
    [[2, 15, 10.5], true, 185],

    //  interpolate at second dim
    [[1, 7.5, 4.5], false, 30],
    [[1, 7.5, 7.5], false, 40],
    [[2, 7.5, 7.5], false, 130],
    [[2, 12.5, 7.5], false, 160],

    //  extrapolate at second dim
    [[1, 2.5, 4.5], true, 0],
    [[1, 2.5, 7.5], true, 10],
    [[2, 17.5, 7.5], true, 190],

    //  interpolate at first dim
    [[1.5, 7.5, 7.5], false, 85],

    //  extrapolate at first dim
    [[2.5, 12.5, 7.5], true, 205],
  ];

  test('nested interpolation - path checks', () => {
    tests.forEach((test) => {
      const { val, extrapolation } = ndimLinterpol(
        0,
        test[0] as (number | string)[],
        obj,
      );
      expect(val).toEqual(test[2]);
      if (test[1]) {
        expect(extrapolation).toBeTruthy();
      } else {
        expect(extrapolation).toBeFalsy();
      }
    });
  });

  test('throws if requested levels ends at an object rather than value', () => {
    expect(() => { ndimLinterpol(0, [1, 5], obj); }).toThrow('Interpolation is not possible for');
  });

  test('throws if requested levels ends at an array rather than value', () => {
    const obj2 = {
      1: [1, 2, 3],
      2: [4, 5, 6],
    };
    expect(() => { ndimLinterpol(0, [1], obj2); }).toThrow('Interpolation on an array is not');
  });

  test('throws if requested levels exceeds object nesting levels (only 3 avail in obj)', () => {
    expect(() => { ndimLinterpol(0, [1, 5, 3, 10], obj); }).toThrow('Interpolation is not available beyond');
  });

  test('throws if requested levels (4) exceeds what is available in obj', () => {
    expect(() => { ndimLinterpol(4, [1, 4], obj); }).toThrow('exceeds available levels');
  });
});

describe('nested string object interpolation', () => {
  const obj: NestedObject = {
    '-1.1': {
      a: [5, 10, 15],
      b: [10, 20, 30],
    },
    0: {
      a: [5, 10, 15],
      b: [40, 50, 60],
    },
    1.1: {
      a: [5, 10, 15],
      b: [70, 80, 90],
    },
  };

  //  path to check
  //  extrapolation result
  //  expected interpolation result
  const tests = [
    //  exact matches
    [[-1.1, 'a|b|10'], false, 20],
    [[0, 'a|b|15'], false, 60],
    [[1.1, 'a|b|5'], false, 70],

    //  interpolate on second dimension
    [[-1.1, 'a|b|12.5'], false, 25],
    [[0, 'a|b|7.5'], false, 45],
    [[1.1, 'a|b|7.5'], false, 75],

    //  extrapolate on second dimension
    [[-1.1, 'a|b|2.5'], true, 5],
    [[0, 'a|b|20'], true, 70],
    [[1.1, 'a|b|17.5'], true, 95],

    //  extrapolate on first dimension
    [[-2.2, 'a|b|2.5'], true, -25],
    [[-0.55, 'a|b|17.5'], true, 50],
    [[0.55, 'a|b|17.5'], true, 80],
    [[2.2, 'a|b|2.5'], true, 95],
  ];

  test('nested interpolation - path checks', () => {
    tests.forEach((test) => {
      const { val, extrapolation } = ndimLinterpol(
        0,
        test[0] as (number | string)[],
        obj,
      );
      expect(val).toEqual(test[2]);
      if (test[1]) {
        expect(extrapolation).toBeTruthy();
      } else {
        expect(extrapolation).toBeFalsy();
      }
    });
  });

  test('throws if key is invalid and does not have 3 parts', () => {
    expect(() => { ndimLinterpol(0, [1.1, 'a|b'], obj); }).toThrow('Invalid key');
  });

  test('throws if key is unrecognized (c)', () => {
    expect(() => { ndimLinterpol(0, [1.1, 'a|c|8'], obj); }).toThrow('Unrecognized key');
  });

  test('throws if key does not resolve to an array of values', () => {
    const obj2 = {
      1: { a: 1, b: 2 },
      2: { a: 3, b: 4 },
    };
    expect(() => { ndimLinterpol(0, [1.1, 'a|b|8'], obj2); }).toThrow('requires array');
  });
});
