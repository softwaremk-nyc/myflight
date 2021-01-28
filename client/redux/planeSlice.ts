import {
  createSlice,
} from '@reduxjs/toolkit';
import c172sp from '../../perf/c172sp/cg';
import pa30 from '../../perf/pa30/cg';
import { CgDataEntry } from '../../src/cg';

const planes: { [name: string]: { [name: string]: CgDataEntry[] } } = {
  C172SP: c172sp,
  PA30: pa30,
};

const getPlaneIds = (planeType: string) => Object.keys(planes[planeType]);

const planeTypes = Object.keys(planes);
const planeIds = getPlaneIds(planeTypes[0]);

export interface PlaneSelectionState {
  planeTypes: string[];
  planeType: string,
  planeIds: string[],
  planeId: string,
  getIdsForType: (type: string) => string[],
}

const initialState: PlaneSelectionState = {
  planeTypes,
  planeType: planeTypes[0],
  planeIds,
  planeId: planeIds[0],
  getIdsForType: getPlaneIds,
};

const planeSlice = createSlice({
  name: 'flight',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    changeType: (state, action) => {
      state.planeType = action.payload;
      state.planeIds = state.getIdsForType(state.planeType);
      [state.planeId] = state.planeIds;
    },
    changeId: (state, action) => {
      state.planeId = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { changeType, changeId } = planeSlice.actions;
export default planeSlice.reducer;
