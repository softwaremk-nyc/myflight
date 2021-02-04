import { createSelector } from '@reduxjs/toolkit';
import { CgDataEntriesList } from '../../src/cg';
import {
  PlaneSelectionState,
} from '../redux/planeSlice';

/**
 * With planes closure, returns all plane ids for current selected type
 * @param {CgDataEntriesList} planes - all type info
 * @returns {string[]} - plane ids
 */
const planeIdsSelector = (planes: CgDataEntriesList) => createSelector(
  (state: PlaneSelectionState) => state.planeType,
  (planeType: string) => Object.keys(planes[planeType]),
);

/**
 * With planes closure, returns selected plane id or default one for type
 * if none is selected
 * @param {CgDataEntriesList} planes - all type info
 * @returns {string} - current planen id
 */
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
