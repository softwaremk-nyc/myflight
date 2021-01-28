import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
  getByTestId,
} from '@testing-library/react';
import { PlaneSelector } from '../../../client/component/planeSelector';

afterEach(cleanup);

it('should return changed type', () => {
  const fn = jest.fn();
  const fn2 = jest.fn();
  render(
    <PlaneSelector
      types={['aa', 'bb']}
      ids={['cc', 'dd']}
      planeTypeCb={fn}
      planeIdCb={fn2}
    />
  );
  fireEvent.change(screen.getByTestId('planeType'), {target: {value: 'bb'}});
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn.mock.calls[0][0]).toEqual('bb');
});

it('should return changed id', () => {
  const fn = jest.fn();
  const fn2 = jest.fn();
  render(
    <PlaneSelector
      types={['aa', 'bb']}
      ids={['cc', 'dd']}
      planeTypeCb={fn}
      planeIdCb={fn2}
    />
  );
  fireEvent.change(screen.getByTestId('planeId'), {target: {value: 'dd'}});
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls[0][0]).toEqual('dd');
});

it('should return changed type and id ', () => {
  const fn = jest.fn();
  const fn2 = jest.fn();
  render(
    <PlaneSelector
      types={['aa', 'bb']}
      ids={['cc', 'dd']}
      planeTypeCb={fn}
      planeIdCb={fn2}
    />
  );
  fireEvent.change(screen.getByTestId('planeType'), {target: {value: 'bb'}});
  fireEvent.change(screen.getByTestId('planeId'), {target: {value: 'dd'}});
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual('bb');
  expect(fn2.mock.calls[0][0]).toEqual('dd');
});
