import reducer, {
  changeType,
  changeId,
  changeFlightTime,
  changeWeight,
  changeGals,
  changeBhp,
  changeMp,
  changeRpm,
  PlaneSelectionState,
} from '../../../client/redux/planeSlice';

let state: PlaneSelectionState;

beforeEach(() => {
  state = {
    planeTypes: ['aa', 'bb'],
    planeType: 'aa',
    planeId: 'cc',
    weights: [],
    gals: [],
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
      gals: [],
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
      gals: [],
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
      gals: [],
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
      gals: [0, 0, 0, 0],
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
      gals: [0, 0, 0, 0],
    });
});

it('sets gallons and expands array', () => {
  let s1 = reducer(
    state,
    {
      type: changeGals.type,
      payload: {
        id: 2,
        gal: 10,
      },
    },
  );

  expect(s1)
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      weights: [0, 0, 0],
      gals: [0, 0, 10],
    });

  s1 = reducer(
    s1,
    {
      type: changeGals.type,
      payload: {
        id: 1,
        gal: 5,
      },
    },
  );

  expect(s1)
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      weights: [0, 0, 0],
      gals: [0, 5, 10],
    });
});

it('sets brake horsepower', () => {
  expect(reducer(
    state,
    {
      type: changeBhp.type,
      payload: 250,
    },
  )).toEqual(
    {
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      weights: [],
      gals: [],
      bhp: 250,
    },
  );
});

it('sets manifold pressure', () => {
  expect(reducer(
    state,
    {
      type: changeMp.type,
      payload: 25,
    },
  )).toEqual(
    {
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      weights: [],
      gals: [],
      mp: 25,
    },
  );
});

it('sets rpm', () => {
  expect(reducer(
    state,
    {
      type: changeRpm.type,
      payload: 2500,
    },
  )).toEqual(
    {
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeId: 'cc',
      weights: [],
      gals: [],
      rpm: 2500,
    },
  );
});
