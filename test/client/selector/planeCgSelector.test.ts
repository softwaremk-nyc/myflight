import {
  cgSelector,
  cgSelectorForDisplay,
} from '../../../client/selector/planeCgSelector';
import { CgDataEntriesList } from '../../../src/cg';

const p: CgDataEntriesList = {
  a: {
    b: [
      {
        name: 'c',
        cgData: { weight: 10, arm: 5, moment: 1 },
        maxW: null,
        comps: null,
        notes: null,
      },
      {
        name: 'd',
        cgData: { weight: 20, arm: 50, moment: 10 },
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
    e: [
      {
        name: 'F',
        cgData: { weight: 11, arm: 51, moment: 12 },
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
    h: [
      {
        name: 'I',
        cgData: { weight: 120, arm: 15, moment: 12 },
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
  },
};

it('should select by type and id and return name', () => {
  const sel = cgSelectorForDisplay(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'b',
    weights: [],
  })).toEqual([
    { name: 'c', cgData: { weight: 10, arm: 5, moment: 1 } },
    { name: 'd', cgData: { weight: 20, arm: 50, moment: 10 } },
  ]);
});

it('should select by type and id and return cg data only', () => {
  const sel = cgSelector(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'b',
    weights: [],
  })).toEqual([
    {
      name: 'c',
      cgData: { weight: 10, arm: 5, moment: 1 },
      maxW: null,
      comps: null,
      notes: null,
    },
    {
      name: 'd',
      cgData: { weight: 20, arm: 50, moment: 10 },
      maxW: null,
      comps: null,
      notes: null,
    },
  ]);
});
