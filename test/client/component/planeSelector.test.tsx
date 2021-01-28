import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { PlaneSelector } from '../../../client/component/planeSelector';

afterEach(cleanup);

let testProp: any;
let fn: jest.Mock<any, any>, fn2: jest.Mock<any, any>;
beforeEach(() => {
  fn = jest.fn();
  fn2 = jest.fn();
  testProp = {
    planeTypes: ['aa', 'bb'],
    planeType: 'qq',
    planeIds: ['cc', 'dd'],
    planeId: 'rr',
    changeType: fn,
    changeId: fn2,
  };
});

it('should return changed type', () => {
  render(
    <PlaneSelector {...testProp} />
  );
  fireEvent.change(screen.getByTestId('planeType'), { target: { value: 'bb' } });
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls.length).toEqual(0);
  expect(fn.mock.calls[0][0]).toEqual('bb');
});

it('should return changed id', () => {
  render(
    <PlaneSelector {...testProp} />
  );
  fireEvent.change(screen.getByTestId('planeId'), { target: { value: 'dd' } });
  expect(fn.mock.calls.length).toEqual(0);
  expect(fn2.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls[0][0]).toEqual('dd');
});

it('should return changed type and id ', () => {
  render(
    <PlaneSelector {...testProp} />
  );
  fireEvent.change(screen.getByTestId('planeType'), { target: { value: 'bb' } });
  fireEvent.change(screen.getByTestId('planeId'), { target: { value: 'dd' } });
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn2.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual('bb');
  expect(fn2.mock.calls[0][0]).toEqual('dd');
});
