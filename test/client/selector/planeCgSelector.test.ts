import {
  cgSelector,
  cgSelectorForDisplay,
  fuelSelectorForDisplay,
  weightSelector,
  weightFromGals,
  cgGraphSelector,
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
    j: [
      {
        name: 'Fuel 1',
        cgData: { weight: 11, arm: 51, moment: 12 },
        maxW: null,
        comps: null,
        notes: null,
      },
      {
        name: 'Fuel 2',
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

describe('testing fuel weight retrieval given configured gals and optional usage', () => {
  it('should return no weights if a/c fuels info is not present', () => {
    expect(weightFromGals(p)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'b',
      weights: [],
      //  should not matter if there is no fuel info in a/c config
      gals: [1, 2, 3, 4, 5],
    })).toEqual(
      [],
    );
  });

  it('should return 0 weight if no base gallons is present', () => {
    expect(weightFromGals(p)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'h',
      weights: [],
      gals: [],
    })).toEqual([
      {
        id: 1,
        weight: 0,
      },
    ]);
  });

  it('should return base fuel weights if no usage is provided', () => {
    expect(weightFromGals(p)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'h',
      weights: [],
      gals: [0, 5],
    })).toEqual([
      {
        id: 1,
        weight: 30,
      },
    ]);
  });

  it('should return fuel weights adjusted based on usage provided', () => {
    expect(weightFromGals(p, 4)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'h',
      weights: [],
      gals: [0, 5],
    })).toEqual([
      {
        id: 1,
        weight: 6,
      },
    ]);
  });

  it('should return fuel zero weight if all is used', () => {
    expect(weightFromGals(p, 8)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'h',
      weights: [],
      gals: [0, 5],
    })).toEqual([
      {
        id: 1,
        weight: 0,
      },
    ]);
  });

  it('should offset fuel used starting with first tank', () => {
    expect(weightFromGals(p, 3)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'j',
      weights: [],
      gals: [4, 5],
    })).toEqual([
      {
        id: 0,
        weight: 6,
      },
      {
        id: 1,
        weight: 30,
      },
    ]);
  });

  it('should use fuel in second tank once first is exhausted', () => {
    expect(weightFromGals(p, 8)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'j',
      weights: [],
      gals: [4, 5],
    })).toEqual([
      {
        id: 0,
        weight: 0,
      },
      {
        id: 1,
        weight: 6,
      },
    ]);
  });

  it('should return 0 fuel weight if all tanks are used', () => {
    expect(weightFromGals(p, 11)({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'j',
      weights: [],
      gals: [4, 5],
    })).toEqual([
      {
        id: 0,
        weight: 0,
      },
      {
        id: 1,
        weight: 0,
      },
    ]);
  });
});

describe('testing aircraft weight retrieval with fuel adjustment', () => {
  it('should zero fuel weights if there are no gals info', () => {
    const sel = weightSelector(p);

    expect(sel({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'h',
      weights: [10, 20, 30],
      gals: [],
    })).toEqual(
      [10, 0, 30],
    );
  });

  it('should zero fuel weights unadjusted if there are zeros for gals info', () => {
    const sel = weightSelector(p);

    expect(sel({
      planeTypes: ['?', '?'],
      planeType: 'a',
      planeId: 'h',
      weights: [10, 20, 30],
      gals: [0, 0, 0],
    })).toEqual(
      [10, 0, 30],
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
      [10, 0, 30],
    );
  });
});

it('returns graph coords based on plane type', () => {
  const sel = cgGraphSelector({
    a: [1, 2, 3],
    b: [4, 5, 6],
  });

  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'b',
    planeId: '?',
    weights: [],
    gals: [],
  })).toEqual(
    [4, 5, 6],
  );
});
