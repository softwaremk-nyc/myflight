import {
  createSlice,
} from '@reduxjs/toolkit';
import c172sp from '../../perf/c172sp/cg';
import pa30 from '../../perf/pa30/cg';
import {
  CgDataEntriesList,
} from '../../src/cg';

export const planes: CgDataEntriesList = {
  C172SP: c172sp,
  PA30: pa30,
};

export interface PlaneSelectionState {
  planeTypes: string[];
  planeType: string,
  planeId: string,
  flightTime?: number,
}

const planeTypes = Object.keys(planes);
const defaultType = planeTypes[0];

const initialState: PlaneSelectionState = {
  planeTypes,
  planeType: defaultType,
  //  blank causes the default to be returned by selector
  planeId: '',
  flightTime: 1,
};

const planeSlice = createSlice({
  name: 'plane',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    changeType: (state, action) => {
      state.planeType = action.payload;
      //  new plane type so reset id as well
      state.planeId = '';
    },
    changeId: (state, action) => {
      state.planeId = action.payload;
    },
    changeFlightTime: (state, action) => {
      state.flightTime = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  changeType,
  changeId,
  changeFlightTime,
} = planeSlice.actions;
export default planeSlice.reducer;
