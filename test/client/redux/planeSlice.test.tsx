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
    planeIds: ['cc', 'dd'],
    planeId: 'cc',
    getIdsForType: (type: string) => { return ['ee', 'ff'] },
  };
});

it('changing id affects only id', () => {
  expect(reducer(
    state,
    {
      type: changeId.type,
      payload: 'dd1',
    }))
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'aa',
      planeIds: ['cc', 'dd'],
      planeId: 'dd1',
      getIdsForType: state.getIdsForType,
    });
});

it('changing type resets ids and sets id to first entry', () => {
  expect(reducer(
    state,
    {
      type: changeType.type,
      payload: 'bb1',
    }))
    .toEqual({
      planeTypes: ['aa', 'bb'],
      planeType: 'bb1',
      planeIds: ['ee', 'ff'],
      planeId: 'ee',
      getIdsForType: state.getIdsForType,
    });
});
