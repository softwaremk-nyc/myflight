import perf182t from '../../../perf/c182t/perf';

test('sample c182t calc from POH', () => {
  const res = perf182t(
    19,
    2400,
    3100,
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
    3.6,
  );

  //  there is no extrapolation for the above
  Object.values(res).forEach((obj) => {
    if (obj) {
      expect(obj.extrapolation).toBeFalsy();
    }
  });
  expect(res.climbTime?.val).toEqual(12.8);
  expect(res.climbFuel?.val).toEqual(4.8);
  expect(res.climbDist?.val).toEqual(20.9);
  expect(res.cruiseRpm?.val).not.toBeDefined();
  expect(res.cruiseKtas?.val).toEqual(130);
  expect(res.cruiseGph?.val).toEqual(10.8);
  expect(res.toDist?.val).toEqual(914.3);
  expect(res.toDist50?.val).toEqual(1763.7);
  expect(res.ldgDist?.val).toEqual(670);
  expect(res.ldgDist50?.val).toEqual(1480);
  expect(res.totalFuel?.val).toEqual(51.8);
  expect(res.accelStop?.val).not.toBeDefined();
  expect(res.bhp?.val).not.toBeDefined();
  expect(res.bhppct?.val).toEqual(60.4);
});
