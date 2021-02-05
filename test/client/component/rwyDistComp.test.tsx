import React from 'react';
import {
  render,
  screen,
  cleanup,
  within,
} from '@testing-library/react';
import { RwyDistComp } from '../../../client/component/rwyDistComp';

afterEach(cleanup);

it('should render a table of runway info', () => {
  const testProp: any = {
    title: 'bleh',
    normal: {
      label: 'n1',
      value: 30,
    },
    fiftyFoot: {
      label: 'n2',
      value: 150,
    },
    headWind: 60,
  };

  render(<RwyDistComp {...testProp} />);

  //  header uses title
  const hdr = screen.getAllByRole('columnheader')[0].closest('tr');
  if (hdr) {
    const utils = within(hdr);
    expect(utils.getByText(/bleh/)).toBeTruthy();
  } else {
    throw Error('should not happen');
  }

  const row1 = screen.getAllByRole('cell')[0].closest('tr');
  const row2 = screen.getAllByRole('cell')[2].closest('tr');
  const row3 = screen.getAllByRole('cell')[4].closest('tr');

  if (row1) {
    const utils = within(row1);
    expect(utils.getByText(/n1/)).toBeTruthy();
    expect(utils.getByText(/30/)).toBeTruthy();
  } else {
    throw Error('should not happen');
  }

  if (row2) {
    const utils = within(row2);
    expect(utils.getByText(/n2/)).toBeTruthy();
    expect(utils.getByText(/150/)).toBeTruthy();
  } else {
    throw Error('should not happen');
  }

  if (row3) {
    const utils = within(row3);
    expect(utils.getByText(/60/)).toBeTruthy();
  } else {
    throw Error('should not happen');
  }
});
