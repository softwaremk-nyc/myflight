import { createSlice } from '@reduxjs/toolkit';
import { AirportInfo2 } from '../../perf/perfCommon';

export interface AirportInfoState {
  icaoId: string,
  label: string,
  info: AirportInfo2 | null,
}

const info = {
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

const initialFromState: AirportInfoState = {
  icaoId: '',
  label: 'From',
  info,
};

const initialToState: AirportInfoState = {
  icaoId: '',
  label: 'To',
  info,
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
  },
  /* eslint-enable no-param-reassign */
});

export const { changeIcaoId } = airportInfoSlice.actions;
export default airportInfoSlice.reducer;
