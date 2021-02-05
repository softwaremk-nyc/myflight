import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { PerfCompVariable } from '../../../client/component/perfCompVariable';

afterEach(cleanup);

it('should fire a manifold pressure change', async () => {
  const fn = jest.fn();
  const fn2 = jest.fn();
  const fn3 = jest.fn();
  const testProps: any = {
    mp: 12,
    rpm: 2500,
    changeMp: fn,
    changeRpm: fn2,
    changePowerSetting: fn3,
  };

  render(<PerfCompVariable {...testProps} powerSettings={['a', 'b']} />);

  const w = screen.getByPlaceholderText(/Manifold Pressure/);
  fireEvent.change(w, {
    target: { value: 15 },
  });

  //  debounced
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn3.mock.calls.length).toEqual(0);

  await new Promise((r) => setTimeout(r, 505));

  expect(fn.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn3.mock.calls.length).toEqual(0);
  expect(fn.mock.calls[0][0]).toEqual(15);
});

it('should fire a rpm change', async () => {
  const fn = jest.fn();
  const fn2 = jest.fn();
  const fn3 = jest.fn();
  const testProps: any = {
    mp: 12,
    rpm: 2500,
    changeMp: fn,
    changeRpm: fn2,
    changePowerSetting: fn3,
  };

  render(<PerfCompVariable {...testProps} powerSettings={['a', 'b']} />);

  const w = screen.getByPlaceholderText(/RPM/);
  fireEvent.change(w, {
    target: { value: 2600 },
  });

  //  debounced
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn3.mock.calls.length).toEqual(0);

  await new Promise((r) => setTimeout(r, 505));

  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls[0][0]).toEqual(2600);
  expect(fn3.mock.calls.length).toEqual(0);
});

it('should return changed power setting', () => {
  const fn = jest.fn();
  const fn2 = jest.fn();
  const fn3 = jest.fn();
  const testProps: any = {
    mp: 12,
    rpm: 2500,
    changeMp: fn,
    changeRpm: fn2,
    changePowerSetting: fn3,
  };

  render(<PerfCompVariable {...testProps} powerSettings={['a', 'b']} />);

  fireEvent.change(screen.getByTestId('powerSetting'), { target: { value: 'b' } });
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn3.mock.calls.length).toEqual(1);
  expect(fn3.mock.calls[0][0]).toEqual('b');
});
