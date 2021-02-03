import { createSelector } from '@reduxjs/toolkit';
import { CgDataEntriesList } from '../../src/cg';
import {
  PlaneSelectionState,
} from '../redux/planeSlice';

const planeIdsSelector = (planes: CgDataEntriesList) => createSelector(
  (state: PlaneSelectionState) => state.planeType,
  (planeType: string) => Object.keys(planes[planeType]),
);

const planeIdSelector = (planes: CgDataEntriesList) => createSelector(
  [
    (state: PlaneSelectionState) => state.planeType,
    (state: PlaneSelectionState) => state.planeId,
  ],
  //  return id or default if one isn't present
  (planeType: string, planeId: string) => (planeId.length === 0
    ? Object.keys(planes[planeType])[0]
    : planeId),
);

export { planeIdsSelector, planeIdSelector };
