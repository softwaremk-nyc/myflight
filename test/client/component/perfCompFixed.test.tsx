import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { PerfCompFixed } from '../../../client/component/perfCompFixed';

afterEach(cleanup);

it('should fire a bhp change', async () => {
  const fn = jest.fn();
  const testProps: any = {
    bhp: 12,
    perf: {
      perfResult: {},
      startHeadWindInfo: {},
      destHeadWindInfo: {},
    },
    changeBhp: fn,
  };

  render(<PerfCompFixed {...testProps} />);
  const w = screen.getByPlaceholderText(/BHP/);
  fireEvent.change(w, {
    target: { value: 15 },
  })
  //  debounced
  expect(fn.mock.calls.length).toEqual(0);

  await new Promise((r) => setTimeout(r, 505));

  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual(15);
});
