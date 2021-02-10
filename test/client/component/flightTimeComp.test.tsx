import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { FlightTimeComp } from '../../../client/component/flightTimeComp';

afterEach(cleanup);

let fn: jest.Mock<any, any>;
let fn2: jest.Mock<any, any>;
let testProp: any;

beforeEach(() => {
  fn = jest.fn();
  fn2 = jest.fn();
  testProp = {
    flightTime: 1,
    flightAltitude: 500,
    changeFlightTime: fn,
    changeFlightAltitude: fn2,
    totalFuelWReq: 5,
    totalFuelWAvail: 10,
  };
});

it('invokes cb with number value if input text is changed - time', async () => {
  render(
    <FlightTimeComp {...testProp} />
  );
  fireEvent.change(screen.getByPlaceholderText(/Time/), {
    target: { value: '1.2' },
  })

  //  debounced - initially no call
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise(r => setTimeout(r, 700));
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn.mock.calls[0][0]).toEqual(1.2);
});

it('invokes cb with number value if input text is changed - altitude', async () => {
  render(
    <FlightTimeComp {...testProp} />
  );
  fireEvent.change(screen.getByPlaceholderText(/Altitude/), {
    target: { value: '1000' },
  })

  //  debounced - initially no call
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise(r => setTimeout(r, 700));
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls[0][0]).toEqual(1000);
});

it('invokes cb with 0 if empty string is in input - time', async () => {
  render(
    <FlightTimeComp {...testProp} />
  );

  fireEvent.change(screen.getByPlaceholderText(/Time/), {
    target: { value: '' },
  });

  //  debounced - initially no call
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise(r => setTimeout(r, 700));
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn.mock.calls[0][0]).toEqual(0);
});

it('invokes cb with 0 if empty string is in input - altitude', async () => {
  render(
    <FlightTimeComp {...testProp} />
  );

  fireEvent.change(screen.getByPlaceholderText(/Altitude/), {
    target: { value: '' },
  });

  //  debounced - initially no call
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise(r => setTimeout(r, 700));
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls[0][0]).toEqual(0);
});

it('should display no h5 warning by default', async () => {
  render(
    <FlightTimeComp {...testProp} />
  );
  expect(screen.queryAllByText(/Insufficient fuel/).length).toEqual(0);
});

it('should display no h5 warning by default', async () => {
  testProp.totalFuelWAvail = 4.99;
  render(
    <FlightTimeComp {...testProp} />
  );
  expect(screen.queryAllByText(/Insufficient fuel/).length).toEqual(1);
});
