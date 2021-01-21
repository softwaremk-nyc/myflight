import { calcCG } from '../src/cg';

describe('center of gravity calculation', () => {
  test('empty CgData provided', () => {
    const cgData = calcCG([]);
    expect(cgData).toEqual({ weight: 0, arm: 0, moment: 0 });
  });

  test('moment is filled in on calc call', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 2, arm: 2, moment: 4 });
  });

  //  2.333... rounded to 2.3
  test('cg arm is calculated and rounded down to 1 decimal place', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
      { weight: 3, arm: 3, moment: 0 },
      { weight: 1, arm: 1, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 6, arm: 2.3, moment: 14 });
  });

  //  2.75 rounded to 2.8
  test('cg arm is calculated and rounded up to 1 decimal place', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
      { weight: 3, arm: 3, moment: 0 },
      { weight: 3, arm: 3, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 8, arm: 2.8, moment: 22 });
  });

  test('cg ignores zero weights', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
      { weight: 0, arm: 3, moment: 0 },
      { weight: 1, arm: 2, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 3, arm: 2, moment: 6 });
  });
});
