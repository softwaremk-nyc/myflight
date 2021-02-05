import React from 'react';
import {
  cleanup,
  screen,
  render,
  within,
} from '@testing-library/react';
import { RwyComp } from '../../../client/component/rwyComp';

afterEach(cleanup);

it('render no rows if no wind info is present', () => {
  const testProps = {
    label: '',
    rwyWindInfo: {},
  };

  render(<RwyComp {...testProps} />);
  expect(screen.queryAllByRole('cell').length).toEqual(0);
});

it('render rwy wind info in table rows', () => {
  const testProps = {
    label: '',
    rwyWindInfo: {
      12: 20,
      24: 36,
    },
  };

  render(<RwyComp {...testProps} />);

  const row1 = screen.getAllByRole('cell')[0].closest('tr');
  const row2 = screen.getAllByRole('cell')[3].closest('tr');
  if (row1) {
    const utils = within(row1);
    expect(utils.getByText(12)).toBeTruthy();
    expect(utils.getByText(12)).toBeTruthy();
    expect(utils.queryByText(24)).toBeNull();
    expect(utils.queryByText(36)).toBeNull();
  } else {
    throw Error('should not happen');
  }
  if (row2) {
    const utils = within(row2);
    expect(utils.queryByText(12)).toBeNull();
    expect(utils.queryByText(12)).toBeNull();
    expect(utils.getByText(24)).toBeTruthy();
    expect(utils.getByText(36)).toBeTruthy();
  } else {
    throw Error('should not happen');
  }
});
