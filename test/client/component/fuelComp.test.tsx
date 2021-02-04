import React from 'react';
import { FuelComp } from '../../../client/component/fuelComp';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';

afterEach(cleanup);

it('should not display any gallons input if no fuel prop is received', () => {
  const fn = jest.fn();
  const testProps: any = {
    gals: [],
    fuelComp: [],
    changeGals: fn,
  };

  render(<FuelComp {...testProps} />);
  expect(screen.queryAllByPlaceholderText(/Gals/).length).toEqual(0);
});

it('should display gallons input for each fuel prop received', () => {
  const fn = jest.fn();
  const testProps: any = {
    gals: [],
    fuelComp: [
      { id: 2, cgDisplay: { name: '', cgData: { weight: 0, arm: 0, moment: 0 }, maxW: null } },
      { id: 3, cgDisplay: { name: '', cgData: { weight: 0, arm: 0, moment: 0 }, maxW: null } },
    ],
    changeGals: fn,
  };

  render(<FuelComp {...testProps} />);
  expect(screen.getAllByPlaceholderText(/Gals/).length).toEqual(2);
});

it('should call gallons update on any input change', async () => {
  const fn = jest.fn();
  const testProps: any = {
    gals: [],
    fuelComp: [
      { id: 2, cgDisplay: { name: '', cgData: { weight: 0, arm: 0, moment: 0 }, maxW: null } },
      { id: 3, cgDisplay: { name: '', cgData: { weight: 0, arm: 0, moment: 0 }, maxW: null } },
    ],
    changeGals: fn,
  };

  render(<FuelComp {...testProps} />);
  fireEvent.change(screen.getAllByPlaceholderText(/Gals/)[0], {
    target: { value: 13 },
  });

  //  debounced
  expect(fn.mock.calls.length).toEqual(0);

  //  after call
  await new Promise((r) => setTimeout(r, 505));
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual({
    id: 2,
    gal: 13,
  });
});
