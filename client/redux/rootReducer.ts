import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import airportInfo from './airportInfoSlice';
import plane from './planeSlice';

const rootReducer = combineReducers({
  airportInfo,
  plane,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
