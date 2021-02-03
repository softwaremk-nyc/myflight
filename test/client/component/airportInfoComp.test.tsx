import React from 'react';
import {
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import {
  STATION_INFO,
  AirportInfoComp,
} from '../../../client/component/airportInfoComp';
import {
  defaultAirportData,
} from '../../../client/redux/airportInfoSlice';

afterEach(cleanup);

//  responds with all data
const mocks = [
  {
    request: {
      query: STATION_INFO,
      variables: {
        icaoId: 'my_airport',
      },
    },
    result: {
      data: {
        station: {
          icaoId: 'my_aiport',
          name: 'My Great Airport',
          elevation: 200,
          runways: [
            {
              'length_ft': 4553,
              'width_ft': 80,
              'ident1': '04',
              'ident2': '22'
            },
          ]
        },
        metar: {
          icaoId: 'my_aiport',
          updated: '2021-02-01T16:20:00Z',
          tempDecimal: -2.2,
          temp: -2,
          altimeter: 29.88,
          wind: {
            direction: 50,
            speed: 13,
            gust: 22
          }
        }
      }
    }
  }
];

//  responds with decimal temp missing
const mocks2 = [
  {
    request: {
      query: STATION_INFO,
      variables: {
        icaoId: 'my_airport',
      },
    },
    result: {
      data: {
        station: {
          icaoId: 'my_aiport',
          name: 'My Great Airport',
          elevation: 200,
          runways: [
            {
              'length_ft': 4553,
              'width_ft': 80,
              'ident1': '04',
              'ident2': '22'
            },
          ]
        },
        metar: {
          icaoId: 'my_aiport',
          updated: '2021-02-01T16:20:00Z',
          tempDecimal: null,
          temp: -2,
          altimeter: 29.88,
          wind: {
            direction: 50,
            speed: 13,
            gust: 22
          }
        }
      }
    }
  }
];

//  responds with error
const mocks3 = [
  {
    request: {
      query: STATION_INFO,
      variables: {
        icaoId: 'my_airport',
      },
    },
    errors: new Error('barf'),
  }
];

let testProp: any;
let
  fn2: jest.Mock<any, any>,
  fn3: jest.Mock<any, any>,
  fn4: jest.Mock<any, any>,
  fn5: jest.Mock<any, any>,
  fn6: jest.Mock<any, any>,
  fn7: jest.Mock<any, any>,
  fn8: jest.Mock<any, any>;

beforeEach(() => {
  fn2 = jest.fn();
  fn3 = jest.fn();
  fn4 = jest.fn();
  fn5 = jest.fn();
  fn6 = jest.fn();
  fn7 = jest.fn();
  fn8 = jest.fn();

  testProp = {
    airportInfo: {
      icaoId: 'my_airport',
      label: '',
      info: defaultAirportData,
    },
    changeElevation: fn2,
    changeTemp: fn3,
    changeAltimeter: fn4,
    changeRunways: fn5,
    changeWindDirection: fn6,
    changeWindSpeed: fn7,
    changeWindGust: fn8,
  };
});

it('should display loading status with requested airport name', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AirportInfoComp {...testProp} />
    </MockedProvider>
  );
  expect(screen.getByText(/Loading my_airport .../)).toBeTruthy();
});

it('should display load complete status with requested airport name and update state', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AirportInfoComp {...testProp} id={5} />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Loaded my_airport/)).toBeTruthy();

    expect(fn2.mock.calls.length).toEqual(1);
    expect(fn2.mock.calls[0][0]).toEqual({ id: 5, elevation: 200 });

    //  displays decimal temperature if received from server
    expect(fn3.mock.calls.length).toEqual(1);
    expect(fn3.mock.calls[0][0]).toEqual({ id: 5, temp: -2.2 });

    expect(fn4.mock.calls.length).toEqual(1);
    expect(fn4.mock.calls[0][0]).toEqual({ id: 5, altimeter: 29.88 });

    expect(fn5.mock.calls.length).toEqual(1);
    expect(fn5.mock.calls[0][0]).toEqual({
      id: 5, runways: [
        {
          'length_ft': 4553,
          'width_ft': 80,
          'ident1': '04',
          'ident2': '22'
        },
      ]
    });

    expect(fn6.mock.calls.length).toEqual(1);
    expect(fn6.mock.calls[0][0]).toEqual({ id: 5, windDirection: 50 });

    expect(fn7.mock.calls.length).toEqual(1);
    expect(fn7.mock.calls[0][0]).toEqual({ id: 5, windSpeed: 13 });

    expect(fn8.mock.calls.length).toEqual(1);
    expect(fn8.mock.calls[0][0]).toEqual({ id: 5, windGust: 22 });
  });
});

it('should fall back to whole number temperature if decimal is not available', async () => {
  render(
    <MockedProvider mocks={mocks2} addTypename={false}>
      <AirportInfoComp {...testProp} id={5} />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Loaded my_airport/)).toBeTruthy();
    //  displays decimal temperature if received from server
    expect(fn3.mock.calls.length).toEqual(1);
    expect(fn3.mock.calls[0][0]).toEqual({ id: 5, temp: -2 });
  });
});

it('should display load failed on error with airport name', async () => {
  render(
    <MockedProvider mocks={mocks3} addTypename={false}>
      <AirportInfoComp {...testProp} id={5} />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/No info for my_airport/)).toBeTruthy();
  });
});
