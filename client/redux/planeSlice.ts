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
}

const planeTypes = Object.keys(planes);

const initialState: PlaneSelectionState = {
  planeTypes,
  planeType: planeTypes[0],
  planeId: '',
};

const planeSlice = createSlice({
  name: 'plane',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    changeType: (state, action) => {
      state.planeType = action.payload;
    },
    changeId: (state, action) => {
      state.planeId = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { changeType, changeId } = planeSlice.actions;
export default planeSlice.reducer;
