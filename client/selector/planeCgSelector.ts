import { createSelector } from '@reduxjs/toolkit';
import {
  CgDataEntry,
  CgDataEntriesList,
  flattenCgDataEntriesByName,
  calcCGForWeights,
} from '../../src/cg';
import { PlaneSelectionState } from '../redux/planeSlice';
import { planeIdSelector } from './planeIdsSelector';

//  returns type and id (or default id) from state
const typeIdSelector = (planes: CgDataEntriesList) => [
  (state: PlaneSelectionState) => state.planeType,
  //  returns default id if one isn't set
  planeIdSelector(planes),
];

const cgSelectorByName = (planes: CgDataEntriesList) => createSelector(
  typeIdSelector(planes),
  (planeType: string, planeId: string) => flattenCgDataEntriesByName(
    planes[planeType][planeId],
  ),
);

const cgSelector = (planes: CgDataEntriesList) => createSelector(
  typeIdSelector(planes),
  (planeType: string, planeId: string) => planes[planeType][planeId],
);

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
