import {
  textDebounce,
  numberDebounce,
} from '../../../client/component/debounceInputProp';

it('should callback with text uppercased', () => {
  const cb = jest.fn();
  textDebounce(
    'id',
    'place',
    3,
    4,
    cb,
  ).onChange({ target: { value: 'aaa' } } as any);
  expect(cb.mock.calls.length).toEqual(1);
  expect(cb.mock.calls[0][0]).toEqual('AAA');
});

it('should focus text', () => {
  const fn = jest.fn();
  textDebounce(
    'id',
    'place',
    3,
    4,
    () => {},
  ).onFocus({ target: { select: fn } } as any);
  expect(fn.mock.calls.length).toEqual(1);
});

it('should callback with zero if NaN is provided', () => {
  const cb = jest.fn();
  numberDebounce(
    'id',
    15,
    'place',
    cb,
  ).onChange({ target: { valueAsNumber: NaN } } as any);
  expect(cb.mock.calls.length).toEqual(1);
  expect(cb.mock.calls[0][0]).toEqual(0);
});

it('should callback with number if not NaN', () => {
  const cb = jest.fn();
  numberDebounce(
    'id',
    15,
    'place',
    cb,
  ).onChange({ target: { valueAsNumber: 16 } } as any);
  expect(cb.mock.calls.length).toEqual(1);
  expect(cb.mock.calls[0][0]).toEqual(16);
});

it('should focus number', () => {
  const fn = jest.fn();
  numberDebounce(
    'id',
    15,
    'place',
    () => {},
  ).onFocus({ target: { select: fn } } as any);
  expect(fn.mock.calls.length).toEqual(1);
});
