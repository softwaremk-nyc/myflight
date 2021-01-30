import { createSelector } from '@reduxjs/toolkit';
import { CgDataEntriesList } from '../../src/cg';
import {
  PlaneSelectionState,
} from '../redux/planeSlice';

export default (planes: CgDataEntriesList) => createSelector(
  (state: PlaneSelectionState) => state.planeType,
  (planeType: string) => Object.keys(planes[planeType]),
);
