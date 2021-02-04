import {
  cgSelector,
  cgSelectorForDisplay,
  fuelSelectorForDisplay,
  weightSelector,
} from '../../../client/selector/planeCgSelector';
import { CgDataEntriesList } from '../../../src/cg';

const p: CgDataEntriesList = {
  a: {
    b: [
      {
        name: 'c',
        cgData: { weight: 10, arm: 5, moment: 1 },
        maxW: null,
        comps: [
          {
            name: 'q',
            cgData: { weight: 25, arm: 55, moment: 15 },
            maxW: null,
            comps: null,
            notes: null,
          },
        ],
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
        name: 'R',
        cgData: { weight: 11, arm: 51, moment: 12 },
        maxW: null,
        comps: null,
        notes: null,
      },
      {
        name: 'Fuel',
        cgData: { weight: 120, arm: 15, moment: 12 },
        maxW: 32,
        comps: null,
        notes: null,
      },
    ],
  },
};

it('should select by type and id and return CGDisplay (flattened)', () => {
  const sel = cgSelectorForDisplay(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'b',
    weights: [],
    gals: [],
  })).toEqual([
    { name: 'c', cgData: { weight: 10, arm: 5, moment: 1 }, maxW: null },
    { name: 'q', cgData: { weight: 25, arm: 55, moment: 15 }, maxW: null },
    { name: 'd', cgData: { weight: 20, arm: 50, moment: 10 }, maxW: null },
  ]);
});

it('should select by type and id and return cg data only (top level only)', () => {
  const sel = cgSelector(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'b',
    weights: [],
    gals: [],
  })).toEqual([
    {
      name: 'c',
      cgData: { weight: 10, arm: 5, moment: 1 },
      maxW: null,
      comps: [
        {
          name: 'q',
          cgData: { weight: 25, arm: 55, moment: 15 },
          maxW: null,
          comps: null,
          notes: null,
        },
      ],
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

it('should return empty results if no fuel info is present', () => {
  const sel = fuelSelectorForDisplay(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'b',
    weights: [],
    gals: [],
  })).toEqual([]);
});

it('should return results for fuel info only', () => {
  const sel = fuelSelectorForDisplay(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'h',
    weights: [],
    gals: [],
  })).toEqual([
    {
      id: 1,
      cgDisplay: { name: 'Fuel', cgData: { weight: 120, arm: 15, moment: 12 }, maxW: 32 },
    },
  ]);
});

it('should return weights unadjusted if there are no gals info', () => {
  const sel = weightSelector(p);

  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'h',
    weights: [10, 20, 30],
    gals: [0, 0, 0],
  })).toEqual(
    [10, 20, 30],
  );
});

it('should return weights correctly adjusted if there is gals info', () => {
  const sel = weightSelector(p);

  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'h',
    weights: [10, 20, 30],
    gals: [0, 10, 0],
  })).toEqual(
    [10, 60, 30],
  );
});

it('should ignore gals info if it is not a fuel position', () => {
  const sel = weightSelector(p);

  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: 'h',
    weights: [10, 20, 30],
    gals: [100, 0, 0],
  })).toEqual(
    [10, 20, 30],
  );
});
