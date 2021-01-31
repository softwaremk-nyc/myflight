import { createSlice } from '@reduxjs/toolkit';
import { AirportInfo2 } from '../../perf/perfCommon';

export interface AirportInfoState {
  icaoId: string,
  label: string,
  info: AirportInfo2 | null,
}

export const defaultAirportInfo = {
  pAlt: 0,
  temp: 15,
  stdTempCorrection: 0,
  headWind: 0,
  isPaved: true,
  elevation: 0,
  runways: [
    {
      ident1: '36',
      ident2: '18',
    },
  ],
  updated: '2021-01-30T03:53:00Z',
  wind: {
    direction: null,
    speed: null,
    gust: null,
  },
};

export function copyAirportInfoFromState(state: AirportInfoState) {
  return state.info
    ? {
      ...state.info,
      wind: { ...state.info.wind },
      runways: [...state.info.runways],
    }
    : defaultAirportInfo;
}

const initialFromState: AirportInfoState = {
  icaoId: '',
  label: 'From',
  info: defaultAirportInfo,
};

const initialToState: AirportInfoState = {
  icaoId: '',
  label: 'To',
  info: defaultAirportInfo,
};

const airportInfoSlice = createSlice({
  name: 'airportInfo',
  initialState: [
    initialFromState,
    initialToState,
  ],
  /* eslint-disable no-param-reassign */
  reducers: {
    changeIcaoId: (state, action) => {
      state[action.payload.id].icaoId = action.payload.icaoId;
    },
    changeInfo: (state, action) => {
      state[action.payload.id].info = action.payload.info;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { changeIcaoId, changeInfo } = airportInfoSlice.actions;
export default airportInfoSlice.reducer;
