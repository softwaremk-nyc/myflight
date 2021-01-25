import {
  distAdjustmentForWind,
  anyAdjustmentForTemp,
  perf172,
} from '../../../perf/c172SP/perf';

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

test('sample c172sp calc from POH', () => {
  const res = perf172(
    64,
    2550,
    {
      pAlt: 2000,
      temp: 30,
      stdTempCorrection: 16,
      headWind: 12,
      isPaved: true,
    },
    {
      pAlt: 2000,
      temp: 30,
      stdTempCorrection: 16,
      headWind: 0,
      isPaved: true,
    },
    8000,
    3.2,
  );

  //  there is no extrapolation for the above
  Object.values(res).forEach((obj) => expect(obj.extrapolation).toBeFalsy());
  expect(res.climbTime.val).toEqual(12.8);
  expect(res.climbFuel.val).toEqual(4);
  expect(res.climbDist.val).toEqual(17.4);
  expect(res.cruiseRpm.val).toEqual(2588.6);
  expect(res.cruiseKtas.val).toEqual(116.6);
  expect(res.cruiseGph.val).toEqual(8.9);
  expect(res.toDist.val).toEqual(1113.7);
  expect(res.toDist50.val).toEqual(1898);
  expect(res.ldgDist.val).toEqual(650);
  expect(res.ldgDist50.val).toEqual(1455);
  expect(res.totalFuel.val).toEqual(39.2);
});
