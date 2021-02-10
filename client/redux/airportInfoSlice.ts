import { createSlice } from '@reduxjs/toolkit';

export interface RwyInfo {
  ident1: string;
  ident2: string;
  isPaved: boolean;
}

export interface AirportApiData {
  elevation: number,
  temp: number,
  altimeter: number,
  runways: RwyInfo[],
  wind: {
    direction: number | null,
    speed: number | null,
    gust: number | null,
  },
  updated: string,
}

export interface AirportInfoState {
  icaoId: string,
  label: string,
  info: AirportApiData,
}

export const defaultAirportData: AirportApiData = {
  elevation: 0,
  temp: 15,
  altimeter: 29.92,
  runways: [
    {
      ident1: '36',
      ident2: '18',
      isPaved: true,
    },
  ],
  wind: {
    direction: null,
    speed: null,
    gust: null,
  },
  updated: new Date().toISOString(),
};

const initialFromState: AirportInfoState = {
  icaoId: '',
  label: 'From',
  info: defaultAirportData,
};

const initialToState: AirportInfoState = {
  icaoId: '',
  label: 'To',
  info: defaultAirportData,
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
    changeElevation: (state, action) => {
      state[action.payload.id].info.elevation = action.payload.elevation;
    },
    changeTemp: (state, action) => {
      state[action.payload.id].info.temp = action.payload.temp;
    },
    changeAltimeter: (state, action) => {
      state[action.payload.id].info.altimeter = action.payload.altimeter;
    },
    changeRunways: (state, action) => {
      state[action.payload.id].info.runways = action.payload.runways;
    },
    changeWindDirection: (state, action) => {
      state[action.payload.id].info.wind.direction = action.payload.windDirection;
    },
    changeWindSpeed: (state, action) => {
      state[action.payload.id].info.wind.speed = action.payload.windSpeed;
    },
    changeWindGust: (state, action) => {
      state[action.payload.id].info.wind.gust = action.payload.windGust;
    },
    changeUpdated: (state, action) => {
      state[action.payload.id].info.updated = action.payload.updated;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  changeIcaoId,
  changeElevation,
  changeTemp,
  changeAltimeter,
  changeRunways,
  changeWindDirection,
  changeWindSpeed,
  changeWindGust,
  changeUpdated,
} = airportInfoSlice.actions;
export default airportInfoSlice.reducer;
