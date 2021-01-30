import reducer, {
  changeIcaoId,
  AirportInfoState,
} from '../../../client/redux/airportInfoSlice';

let state: AirportInfoState;

beforeEach(() => {
  state = {
    icaoId: '',
    label: '',
    info: null,
  };
});

it('sets the first icaoId correctly by id 0', () => {
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeIcaoId.type,
      payload: {
        id: 0,
        icaoId: 'meh',
      },
    },
  )).toEqual([
    {
      icaoId: 'meh',
      label: '',
      info: null,
    },
    {
      icaoId: '',
      label: '',
      info: null,
    },
  ]);
});

it('sets the second icaoId correctly by id 1', () => {
  expect(reducer(
    [
      { ...state },
      { ...state },
    ],
    {
      type: changeIcaoId.type,
      payload: {
        id: 1,
        icaoId: 'meh2',
      },
    },
  )).toEqual([
    {
      icaoId: '',
      label: '',
      info: null,
    },
    {
      icaoId: 'meh2',
      label: '',
      info: null,
    },
  ]);
});
