import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { FlightTimeComp } from '../../../client/component/flightTimeComp';

afterEach(cleanup);

it('invokes cb with number value if input text is changed', async () => {
  const fn = jest.fn();
  const testProp: any = {
    flightTime: 1,
    changeFlightTime: fn,
  };

  render(
    <FlightTimeComp {...testProp} />
  );
  fireEvent.change(screen.getByPlaceholderText(/Time/), {
    target: { value: '1.2' },
  })

  //  debounced - initially no call
  expect(fn.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise(r => setTimeout(r, 700));
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual(1.2);
});

it('invokes cb with 0 if empty string is in input', async () => {
  const fn = jest.fn();
  const testProp: any = {
    flightTime: 1.5,
    changeFlightTime: fn,
  };

  render(
    <FlightTimeComp {...testProp} />
  );
  const input = screen.getByPlaceholderText(/Time/);

  fireEvent.change(input, {
    target: { value: '' },
  });

  //  debounced - initially no call
  expect(fn.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise(r => setTimeout(r, 700));
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual(0);
});
