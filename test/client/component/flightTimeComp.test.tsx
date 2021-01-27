import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { FlightTimeComp } from '../../../client/component/flightTimeComp';

afterEach(cleanup);

it('invokes cb with number value if input text is changed', () => {
  const fn = jest.fn();
  render(
    <FlightTimeComp
      flightTimeCb={fn}
    />
  );
  fireEvent.change(screen.getByPlaceholderText(/Time/i), {
    target: { value: '1.2' },
  })
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual(1.2);
});

it('invokes cb with 0 if empty string is in input', () => {
  const fn = jest.fn();
  render(
    <FlightTimeComp
      flightTimeCb={fn}
    />
  );
  const input = screen.getByPlaceholderText(/Time/i);
  fireEvent.change(input, {
    target: { value: '1.2' },
  });
  // userEvent.type(input, '1.3');
  // userEvent.type(input, '{del}');

  fireEvent.change(input, {
    target: { value: '' },
  });

  expect(fn.mock.calls.length).toEqual(2);
  expect(fn.mock.calls[0][0]).toEqual(1.2);
  expect(fn.mock.calls[1][0]).toEqual(0);
});
