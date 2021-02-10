import reducer, {
  changeIcaoId,
  changeElevation,
  changeTemp,
  changeAltimeter,
  changeRunways,
  changeWindDirection,
  changeWindSpeed,
  changeWindGust,
  changeUpdated,
  AirportInfoState,
  defaultAirportData,
} from '../../../client/redux/airportInfoSlice';

let state: AirportInfoState;

beforeEach(() => {
  state = {
    icaoId: '',
    label: '',
    info: defaultAirportData,
  };
});

it('sets the first icaoId correctly by id 0', () => {
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeIcaoId.type,
      payload: {
        id: 0,
        icaoId: 'meh',
      },
    },
  )).toEqual([
    {
      icaoId: 'meh',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
  ]);
});

it('sets the second icaoId correctly by id 1', () => {
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeIcaoId.type,
      payload: {
        id: 1,
        icaoId: 'meh2',
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: 'meh2',
      label: '',
      info: defaultAirportData,
    },
  ]);
});

it('sets the second elevation correctly by id 1', () => {
  const expected = { ...defaultAirportData };
  expected.elevation = 100;
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeElevation.type,
      payload: {
        id: 1,
        elevation: 100,
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: expected,
    },
  ]);
});

it('sets the first temperature correctly by id 0', () => {
  const expected = { ...defaultAirportData };
  expected.temp = 50;
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeTemp.type,
      payload: {
        id: 0,
        temp: 50,
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: expected,
    },
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
  ]);
});

it('sets the second altimeter correctly by id 1', () => {
  const expected = { ...defaultAirportData };
  expected.altimeter = 29.93;
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeAltimeter.type,
      payload: {
        id: 1,
        altimeter: 29.93,
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: expected,
    },
  ]);
});

it('sets the first runway info correctly by id 0', () => {
  const expected = { ...defaultAirportData };
  expected.runways = [
    {
      ident1: 'cc',
      ident2: 'dd',
      isPaved: false,
    },
  ];
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeRunways.type,
      payload: {
        id: 0,
        runways: [
          {
            ident1: 'cc',
            ident2: 'dd',
            isPaved: false,
          },
        ],
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: expected,
    },
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
  ]);
});

it('sets the third wind direction info correctly by id 2', () => {
  const expected = { ...defaultAirportData, wind: { ...defaultAirportData.wind } };
  expected.wind.direction = 2000;

  expect(reducer(
    [
      { ...state },
      { ...state },
      { ...state },
    ],
    {
      type: changeWindDirection.type,
      payload: {
        id: 2,
        windDirection: 2000,
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: expected,
    },
  ]);
});

it('sets the third wind speed info correctly by id 2', () => {
  const expected = { ...defaultAirportData, wind: { ...defaultAirportData.wind } };
  expected.wind.speed = 500;

  expect(reducer(
    [
      { ...state },
      { ...state },
      { ...state },
    ],
    {
      type: changeWindSpeed.type,
      payload: {
        id: 2,
        windSpeed: 500,
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: expected,
    },
  ]);
});

it('sets the third wind gust info correctly by id 2', () => {
  const expected = { ...defaultAirportData, wind: { ...defaultAirportData.wind } };
  expected.wind.gust = 200_000;

  expect(reducer(
    [
      { ...state },
      { ...state },
      { ...state },
    ],
    {
      type: changeWindGust.type,
      payload: {
        id: 2,
        windGust: 200_000,
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
    {
      icaoId: '',
      label: '',
      info: expected,
    },
  ]);
});

it('sets the updated info correctly by id 1', () => {
  const expected = { ...defaultAirportData };
  expected.updated = 'cccc';
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeUpdated.type,
      payload: {
        id: 0,
        updated: 'cccc',
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: expected,
    },
    {
      icaoId: '',
      label: '',
      info: defaultAirportData,
    },
  ]);
});
