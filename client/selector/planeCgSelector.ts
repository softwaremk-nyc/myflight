import { createSelector } from '@reduxjs/toolkit';
import {
  CgDataEntriesList,
  flattenCgDataEntries,
  flattenCgDataEntriesByName,
} from '../../src/cg';
import { PlaneSelectionState } from '../redux/planeSlice';
import { planeIdSelector } from './planeIdsSelector';

const cgSelectorByName = (planes: CgDataEntriesList) => createSelector(
  [
    (state: PlaneSelectionState) => state.planeType,
    //  returns default id if one isn't set
    planeIdSelector(planes),
  ],
  (planeType: string, planeId: string) => flattenCgDataEntriesByName(
    planes[planeType][planeId],
  ),
);

const cgSelector = (planes: CgDataEntriesList) => createSelector(
  [
    (state: PlaneSelectionState) => state.planeType,
    //  returns default id if one isn't set
    planeIdSelector(planes),
  ],
  (planeType: string, planeId: string) => flattenCgDataEntries(
    planes[planeType][planeId],
  ),
);

export { cgSelector, cgSelectorByName };
