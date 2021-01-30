import { combineReducers } from '@reduxjs/toolkit';
import airportInfo from './airportInfoSlice';
import plane from './planeSlice';

const rootReducer = combineReducers({
  airportInfo,
  plane,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
