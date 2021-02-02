import reducer, {
  changeType,
  changeId,
  PlaneSelectionState,
} from '../../../client/redux/planeSlice';

let state: PlaneSelectionState;

beforeEach(() => {
  state = {
    planeTypes: ['aa', 'bb'],
    planeType: 'aa',
    planeId: 'cc',
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
    });
});
