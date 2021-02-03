import reducer, {
  changeType,
  changeId,
  changeFlightTime,
  changeWeight,
  PlaneSelectionState,
} from '../../../client/redux/planeSlice';

let state: PlaneSelectionState;

beforeEach(() => {
  state = {
    planeTypes: ['aa', 'bb'],
    planeType: 'aa',
    planeId: 'cc',
    weights: [],
  };
});

it('changing id', () => {
  expect(reducer(
    state,
    {
      type: changeId.type,
      payload: 'dd1',
    },
  ))
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'dd1',
      weights: [],
    });
});

it('changing type - resets id', () => {
  expect(reducer(
    state,
    {
      type: changeType.type,
      payload: 'bb1',
    },
  ))
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'bb1',
      planeId: '',
      weights: [],
    });
});

it('sets a flight time if one is not present', () => {
  expect(reducer(
    state,
    {
      type: changeFlightTime.type,
      payload: 1.5,
    },
  ))
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      flightTime: 1.5,
      weights: [],
    });
});

it('sets a weight and expands array', () => {
  let s1 = reducer(
    state,
    {
      type: changeWeight.type,
      payload: {
        id: 3,
        weight: 100,
      },
    },
  );

  expect(s1)
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      weights: [0, 0, 0, 100],
    });

  s1 = reducer(
    s1,
    {
      type: changeWeight.type,
      payload: {
        id: 1,
        weight: 50,
      },
    },
  );

  expect(s1)
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      weights: [0, 50, 0, 100],
    });
});
