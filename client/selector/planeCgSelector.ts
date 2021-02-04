import { createSelector } from '@reduxjs/toolkit';
import {
  CgDataEntry,
  CgDataEntriesList,
  flattenCgDataForDisplay,
  calcCGForWeights,
} from '../../src/cg';
import { PlaneSelectionState } from '../redux/planeSlice';
import { planeIdSelector } from './planeIdsSelector';

/**
 *
 * @param {CgDataEntriesList} planes - all type info
 * @returns {string, string} - (planeType and planeId) - or default if not selected
 */
const typeIdSelector = (planes: CgDataEntriesList) => [
  (state: PlaneSelectionState) => state.planeType,
  planeIdSelector(planes),
];

/**
 *
 * @param {CgDataEntriesList} planes - all type info
 * @returns {CgDisplay[]} - flattened cgdata for display
 */
const cgSelectorByName = (planes: CgDataEntriesList) => createSelector(
  typeIdSelector(planes),
  (planeType: string, planeId: string) => flattenCgDataForDisplay(
    planes[planeType][planeId],
  ),
);

/**
 *
 * @param {CgDataEntriesList} planes - all type info
 * @returns {CgDataEntry[]} for given id (N-registration)
 * First level (unflattened and used for cg calcs)
 */
const cgSelector = (planes: CgDataEntriesList) => createSelector(
  typeIdSelector(planes),
  (planeType: string, planeId: string) => planes[planeType][planeId],
);

/**
 * Runs cg calculation
 * @param {CgDataEntriesList} planes - all type info
 */
const cgCalcSelector = (planes: CgDataEntriesList) => createSelector(
  [
    cgSelector(planes),
    (state: PlaneSelectionState) => state.weights,
  ],
  (cgDataEntries: CgDataEntry[], weights: number[]) => calcCGForWeights(
    cgDataEntries[0].name,
    weights,
    cgDataEntries,
  ),
);

export {
  cgSelector,
  cgSelectorByName,
  cgCalcSelector,
};
