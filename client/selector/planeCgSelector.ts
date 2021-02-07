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
 * @returns {{id: number, cgDisplay: CGDisplay}[]} - index for fuel info, cg display info
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
 * Returns weights from gallons in state
 * Gallons can be reduced by up to 'galsUsed'
 * @param {CgDataEntriesList} planes - all type info
 * @param {number} galsUsed - gals to remove for a given flight
 */
const weightFromGals = (
  planes: CgDataEntriesList,
  galsUsed: number = 0,
) => createSelector(
  [
    fuelSelectorForDisplay(planes),
    (state: PlaneSelectionState) => state.gals,
  ],
  (
    fuelDisplayEntries: { id: number, cgDisplay: CGDisplay }[],
    gals: number[],
  ) => {
    const res: { id: number, weight: number }[] = [];

    fuelDisplayEntries.forEach((f) => {
      const galsAvail = gals[f.id]
        ? gals[f.id]
        : 0;
      const used = Math.min(galsAvail, galsUsed);
      res.push({
        id: f.id,
        weight: (galsAvail - used) * lbsPerGallonFuel,
      });
      /* eslint-disable no-param-reassign */
      galsUsed -= used;
      /* eslint-enable no-param-reassign */
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
const weightSelector = (
  planes: CgDataEntriesList,
  galsUsed: number = 0,
) => createSelector(
  [
    (state: PlaneSelectionState) => state.weights,
    weightFromGals(planes, galsUsed),
  ],
  (
    weights: number[],
    weightsFromFuel: { id: number, weight: number }[],
  ) => {
    const weightsC = weightsFromFuel.length > 0
      ? [...weights]
      : weights;

    weightsFromFuel.forEach((w) => {
      if (typeof weightsC[w.id] !== 'undefined') {
        weightsC[w.id] = w.weight;
      }
    });

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
const cgCalcSelector = (
  planes: CgDataEntriesList,
  galsUsed: number = 0,
) => createSelector(
  [
    cgSelector(planes),
    weightSelector(
      planes,
      galsUsed,
    ),
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

/**
 * Returns CG graph coordinates for current selected type
 * @param {graphCoord} - array indexed by type containing chart.js coords
 */
const cgGraphSelector = (graphCoord: any) => createSelector(
  (state: PlaneSelectionState) => state.planeType,
  (planeType: string) => graphCoord[planeType],
);

export {
  cgSelector,
  cgSelectorForDisplay,
  cgCalcSelector,
  fuelSelectorForDisplay,
  weightFromGals,
  weightSelector,
  cgGraphSelector,
};
