import {
  planeIdsSelector,
  planeIdSelector,
} from '../../../client/selector/planeIdsSelector';
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
    weights: [],
  })).toEqual(['b', 'e', 'h']);
});

it('return ids for k', () => {
  const sel = planeIdsSelector(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'k',
    planeId: '??',
    weights: [],
  })).toEqual(['l', 'o']);
});

it('return id if set in state', () => {
  const sel = planeIdSelector(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'k',
    planeId: '??',
    weights: [],
  })).toEqual('??');
});

it('return default id if not set in state', () => {
  const sel = planeIdSelector(p);
  expect(sel({
    planeTypes: ['?', '?'],
    planeType: 'k',
    planeId: '',
    weights: [],
  })).toEqual('l');
});
