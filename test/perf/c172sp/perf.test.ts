import perf172 from '../../../perf/c172sp/perf';

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
  Object.values(res).forEach((obj) => {
    if (obj) {
      expect(obj.extrapolation).toBeFalsy();
    }
  });
  expect(res.climbTime?.val).toEqual(12.8);
  expect(res.climbFuel?.val).toEqual(4);
  expect(res.climbDist?.val).toEqual(17.4);
  expect(res.cruiseRpm?.val).toEqual(2588.6);
  expect(res.cruiseKtas?.val).toEqual(116.6);
  expect(res.cruiseGph?.val).toEqual(8.9);
  expect(res.toDist?.val).toEqual(1113.7);
  expect(res.toDist50?.val).toEqual(1898);
  expect(res.ldgDist?.val).toEqual(650);
  expect(res.ldgDist50?.val).toEqual(1455);
  expect(res.totalFuel?.val).toEqual(39.2);
  expect(res.accelStop?.val).not.toBeDefined();
  expect(res.bhp?.val).not.toBeDefined();
  expect(res.bhppct?.val).not.toBeDefined();
});
