import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { AirportComp } from '../../../client/component/airportComp';

afterEach(cleanup);

it('displays label that info is not available', () => {
  const fn = jest.fn();
  render(
    <AirportComp
      id='1'
      float='testPrefix'
      noInfo={true}
      airportCb={fn}
    />
  );
  expect(fn.mock.calls.length).toEqual(0);
  expect(screen.queryByText(/information is not available/)).not.toBeNull();
});

it('hides label that info is not available', () => {
  const fn = jest.fn();
  render(
    <AirportComp
      id='1'
      float='testPrefix'
      noInfo={false}
      airportCb={fn}
    />
  );
  expect(fn.mock.calls.length).toEqual(0);
  expect(screen.queryByText(/information is not available/)).toBeNull();
});

it('invokes cb if input text is changed - returns uppercase', () => {
  const fn = jest.fn();
  render(
    <AirportComp
      id='1'
      float='testPrefix'
      noInfo={false}
      airportCb={fn}
    />
  );
  fireEvent.change(screen.getByPlaceholderText(/Airport/i), {
    target: { value: 'myAirport' },
  })
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual('MYAIRPORT');
});
