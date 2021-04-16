import perf182q from '../../../perf/c182q/perf';

test('sample c182q calc from POH', () => {
  const res = perf182q(
    21,
    2200,
    2950,
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
    3.4,
  );

  //  there is no extrapolation for the above
  Object.values(res).forEach((obj) => {
    if (obj) {
      expect(obj.extrapolation).toBeFalsy();
    }
  });
  expect(res.climbTime?.val).toEqual(11.6);
  expect(res.climbFuel?.val).toEqual(4.9);
  expect(res.climbDist?.val).toEqual(17.4);
  expect(res.cruiseRpm?.val).not.toBeDefined();
  expect(res.cruiseKtas?.val).toEqual(137);
  expect(res.cruiseGph?.val).toEqual(11.1);
  expect(res.toDist?.val).toEqual(806);
  expect(res.toDist50?.val).toEqual(1560);
  expect(res.ldgDist?.val).toEqual(670);
  expect(res.ldgDist50?.val).toEqual(1480);
  expect(res.totalFuel?.val).toEqual(51);
  expect(res.accelStop?.val).not.toBeDefined();
  expect(res.bhp?.val).not.toBeDefined();
  expect(res.bhppct?.val).toEqual(65.4);
});
