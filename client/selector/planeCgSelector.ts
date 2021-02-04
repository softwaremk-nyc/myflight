import { createSelector } from '@reduxjs/toolkit';
import {
  CgDataEntry,
  CgDataEntriesList,
  flattenCgDataForDisplay,
  calcCGForWeights,
  CGDisplay,
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
const cgSelectorForDisplay = (planes: CgDataEntriesList) => createSelector(
  typeIdSelector(planes),
  (planeType: string, planeId: string) => flattenCgDataForDisplay(
    planes[planeType][planeId],
  ),
);

/**
 * Return fuel entries for a given a/c
 * @returns {[number, CgDisplay][]} - tuples of display info and
 * index into aircraft CgDataEntry[]
 */
const fuelSelectorForDisplay = (planes: CgDataEntriesList) => createSelector(
  cgSelectorForDisplay(planes),
  (cgDisplay: CGDisplay[]) => {
    const res: [number, CGDisplay][] = [];
    cgDisplay.forEach((x, index) => {
      if (x.name.indexOf('Fuel') !== -1) {
        res.push([index, x]);
      }
    });
    return res;
  },
);

/**
 *
 * @param {CgDataEntriesList} planes - all type info
 * @returns {CgDataEntry[]} for given id (N-registration)
 * FIRST LEVEL (unflattened and typically used for cg calcs)
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
  cgSelectorForDisplay,
  cgCalcSelector,
  fuelSelectorForDisplay,
};
