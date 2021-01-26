import perfPa30 from '../../../perf/pa30/perf';

test('sample pa30 calc from POH', () => {
  const res = perfPa30(
    22,
    2300,
    3400,
    {
      pAlt: 2000,
      temp: 21,
      stdTempCorrection: 10,
      headWind: 10,
      isPaved: true,
    },
    {
      pAlt: 4000,
      temp: 15,
      stdTempCorrection: 0,
      headWind: 10,
      isPaved: true,
    },
    7000,
    2.75,
    true,
  );

  //  there is no extrapolation for the above
  Object.values(res).forEach((obj) => {
    if (obj) {
      expect(obj.extrapolation).toBeFalsy();
    }
  });
  expect(res.climbTime?.val).not.toBeDefined();
  expect(res.climbFuel?.val).not.toBeDefined();
  expect(res.climbDist?.val).not.toBeDefined();
  expect(res.cruiseRpm?.val).not.toBeDefined();
  expect(res.cruiseKtas?.val).toEqual(180.2);
  expect(res.cruiseGph?.val).toEqual(15.2);
  expect(res.toDist?.val).toEqual(1352.1);
  expect(res.toDist50?.val).toEqual(2174.4);
  expect(res.ldgDist?.val).toEqual(585.4);
  expect(res.ldgDist50?.val).toEqual(1850.1);
  expect(res.totalFuel?.val).toEqual(53.2);
  expect(res.accelStop?.val).toEqual(2642.1);
  expect(res.bhp?.val).toEqual(105.5);
  expect(res.bhppct?.val).toEqual(65.9);
});
