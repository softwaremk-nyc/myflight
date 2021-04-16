import {
  distAdjustmentForWind,
  anyAdjustmentForTemp,
} from '../../../perf/cessna/perfCessna';

describe('distance adjustment for wind', () => {
  it('offsets distance for head or tail wind', () => {
    const tests = [
      [0, 100],
      [3, 96.7],
      [4.5, 95],
      [9, 90],
      [18, 80],
      [-2, 110],
      [-2.5, 112.5],
      [-3, 115],
      [-4, 120],
    ];

    tests.forEach((test) => {
      expect(distAdjustmentForWind(
        test[0],
        100,
      )).toEqual(test[1]);
    });
  });

  it('throws if tail wind exceeds POH max of 10 knots', () => {
    expect(() => { distAdjustmentForWind(-10.01, 100); }).toThrow('Maximum tail wind');
  });
});

describe('value adjustment for variations from std temp', () => {
  it('offsets provided value for positive variations to std temp', () => {
    const tests = [
      [0, 100],
      [-1, 100],
      [-10, 100],
      [5, 105],
      [10, 110],
    ];

    tests.forEach((test) => {
      expect(anyAdjustmentForTemp(test[0], 100)).toEqual(test[1]);
    });
  });
});
