import {
  createSlice,
} from '@reduxjs/toolkit';
import c172sp from '../../perf/c172sp/cg';
import c182q from '../../perf/c182q/cg';
import c182t from '../../perf/c182t/cg';
import pa30 from '../../perf/pa30/cg';
import {
  CgDataEntriesList,
} from '../../src/cg';

export const planes: CgDataEntriesList = {
  C172SP: c172sp,
  C182Q: c182q,
  C182T: c182t,
  PA30: pa30,
};

export const C172SP = 'C172SP';
export const C182Q = 'C182Q';
export const C182T = 'C182T';
export const PA30 = 'PA30';

export const powerSettings: string[] = [
  'Best Economy',
  'Best Power',
];

export interface PlaneSelectionState {
  planeTypes: string[];
  planeType: string,
  planeId: string,
  flightTime?: number,
  flightAltitude?: number,
  weights: number[],
  gals: number[],
  bhp?: number,
  mp?: number,
  rpm?: number,
  powerSetting?: string,
}

const planeTypes = Object.keys(planes);
const defaultType = planeTypes[0];

const initialState: PlaneSelectionState = {
  planeTypes,
  planeType: defaultType,
  //  blank causes the default to be returned by selector
  planeId: '',
  flightTime: 1.5,
  flightAltitude: 3500,
  //  first element is plane weight and should remain unmodified at -1
  weights: [-1],
  gals: [],
  bhp: 75,
  mp: 22,
  rpm: 2300,
  powerSetting: powerSettings[0],
};

const extendArr = (
  arr: number[],
  minLength: number,
) => {
  while (arr.length < minLength) {
    arr.push(0);
  }
};

const extendArrs = (
  arr1: number[],
  arr2: number[],
  minLength: number,
) => {
  extendArr(arr1, minLength);
  extendArr(arr2, minLength);
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
      //  reset gals
      for (let i = 0; i < state.gals.length; i += 1) {
        state.gals[i] = 0;
      }
    },
    changeId: (state, action) => {
      state.planeId = action.payload;
    },
    changeFlightTime: (state, action) => {
      state.flightTime = action.payload;
    },
    changeFlightAltitude: (state, action) => {
      state.flightAltitude = action.payload;
    },
    changeWeight: (state, action) => {
      extendArrs(
        state.weights,
        state.gals,
        action.payload.id + 1,
      );
      state.weights[action.payload.id] = action.payload.weight;
    },
    changeGals: (state, action) => {
      extendArrs(
        state.weights,
        state.gals,
        action.payload.id + 1,
      );
      state.gals[action.payload.id] = action.payload.gal;
    },
    changeBhp: (state, action) => {
      state.bhp = action.payload;
    },
    changeMp: (state, action) => {
      state.mp = action.payload;
    },
    changeRpm: (state, action) => {
      state.rpm = action.payload;
    },
    changePowerSetting: (state, action) => {
      state.powerSetting = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  changeType,
  changeId,
  changeFlightTime,
  changeFlightAltitude,
  changeWeight,
  changeGals,
  changeBhp,
  changeMp,
  changeRpm,
  changePowerSetting,
} = planeSlice.actions;
export default planeSlice.reducer;
