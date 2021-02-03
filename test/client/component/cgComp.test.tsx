import React from 'react';
import { CgComp } from '../../../client/component/cgComp';
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';

afterEach(cleanup);

it('should display one row per cg entry', () => {
  const testProps: any = {
    cgData: [
      { name: 'entry1', cgData: { weight: 0, arm: 1, moment: 2 } },
      { name: 'entry2', cgData: { weight: 3, arm: 4, moment: 5 } },
    ],
    cgCalc: [
      { weight: 6, arm: 7, moment: 8 },
    ],
  };

  render(<CgComp {...testProps} />);

  expect(screen.getByText(/entry1/)).toBeTruthy();
  expect(screen.getByText(/entry2/)).toBeTruthy();
});

it('should fire a weight update on input change', async () => {
  const fn = jest.fn();
  const testProps: any = {
    cgData: [
      { name: 'entry1', cgData: { weight: 0, arm: 1, moment: 2 } },
      { name: 'entry2', cgData: { weight: 3, arm: 4, moment: 5 } },
    ],
    cgCalc: [
      { weight: 6, arm: 7, moment: 8 },
    ],
    changeWeight: fn,
  };

  render(<CgComp {...testProps} />);

  const w = screen.getByPlaceholderText(/Weight/);
  fireEvent.change(w, {
    target: { value: 12 }
  });

  //  debounced - initially no call
  expect(fn.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise(r => setTimeout(r, 550));
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual({ id: 1 /* index */, weight: 12 });
});
