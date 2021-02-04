import { createSelector } from '@reduxjs/toolkit';
import {
  CgDataEntry,
  CgDataEntriesList,
  flattenCgDataForDisplay,
  calcCGForWeights,
  CGDisplay,
} from '../../src/cg';
import { lbsPerGallonFuel } from '../../perf/perfCommon';
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
    const res: { id: number, cgDisplay: CGDisplay }[] = [];
    cgDisplay.forEach((x, index) => {
      if (x.name.indexOf('Fuel') !== -1) {
        res.push({ id: index, cgDisplay: x });
      }
    });
    return res;
  },
);

/**
 * Adjusted weight selector
 * Most weights are in state and user entered. However,
 * fuel weights are derived from gallon entries. Copy and calc ...
 * @param {CgDataEntriesList} planes - all type info
 */
const weightSelector = (planes: CgDataEntriesList) => createSelector(
  [
    fuelSelectorForDisplay(planes),
    (state: PlaneSelectionState) => state.weights,
    (state: PlaneSelectionState) => state.gals,
  ],
  (
    fuelDisplayEntries: { id: number, cgDisplay: CGDisplay }[],
    weights: number[],
    gals: number[],
  ) => {
    //  if there are derives weights needed, copy and calc
    let derivedWeightNeeded = false;
    for (let i = 0; i < fuelDisplayEntries.length; i += 1) {
      if (gals[fuelDisplayEntries[i].id]) {
        derivedWeightNeeded = true;
        break;
      }
    }

    const weightsC = derivedWeightNeeded
      ? [...weights]
      : weights;

    if (derivedWeightNeeded) {
      fuelDisplayEntries.forEach((f) => {
        weightsC[f.id] = gals[f.id] * lbsPerGallonFuel;
      });
    }

    return weightsC;
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
    weightSelector(planes),
  ],
  (
    cgDataEntries: CgDataEntry[],
    weights: number[],
  ) => calcCGForWeights(
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
  weightSelector,
};
