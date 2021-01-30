import planeIdsSelector from '../../../client/selector/planeIdsSelector';
import { CgDataEntriesList } from '../../../src/cg';

const p: CgDataEntriesList = {
  a: {
    b: [
      {
        name: 'c',
        cgData: null,
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
    e: [
      {
        name: 'F',
        cgData: null,
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
    h: [
      {
        name: 'I',
        cgData: null,
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
  },
  k: {
    l: [
      {
        name: 'M',
        cgData: null,
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
    o: [
      {
        name: 'P',
        cgData: null,
        maxW: null,
        comps: null,
        notes: null,
      },
    ],
  },
};

it('return ids for a', () => {
  const sel = planeIdsSelector(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'a',
    planeId: '??',
  })).toEqual(['b', 'e', 'h']);
});

it('return ids for k', () => {
  const sel = planeIdsSelector(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'k',
    planeId: '??',
  })).toEqual(['l', 'o']);
});
