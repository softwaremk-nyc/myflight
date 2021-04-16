import {
  lbsPerGallonFuel,
} from '../perfCommon';
import {
  CgDataEntry,
  CgDataEntries,
} from '../../src/cg';

const base182q: CgDataEntry[] = [
  {
    name: 'Pilot',
    cgData: { weight: 0, arm: 37, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Co-Pilot',
    cgData: { weight: 0, arm: 37, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Rear PX 1',
    cgData: { weight: 0, arm: 74, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Rear PX 2',
    cgData: { weight: 0, arm: 74, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Baggage Total',
    cgData: null,
    maxW: 200,
    comps: [
      {
        name: 'Baggage A',
        cgData: { weight: 0, arm: 97, moment: 0 },
        maxW: 120,
        comps: null,
        notes: 'Maximum Baggage Weight: 120 lbs - subject to combined restriction',
      },
      {
        name: 'Baggage B',
        cgData: { weight: 0, arm: 115, moment: 0 },
        maxW: 80,
        comps: null,
        notes: 'Maximum Baggage Weight: 80 lbs - subject to combined restriction',
      },
      {
        name: 'Hat Shelf',
        cgData: { weight: 0, arm: 130, moment: 0 },
        maxW: 25,
        comps: null,
        notes: 'Maximum Hat Shelf Weight: 25 lbs - subject to combined restriction',
      },
    ],
    notes: 'Maximum Total Baggage Weight: 200 lbs',
  },
  {
    name: 'Fuel Main',
    cgData: { weight: 0, arm: 46.5, moment: 0 },
    maxW: lbsPerGallonFuel * 88,
    comps: null,
    notes: 'Maximum Useable Fuel: 88 gals (92)',
  },
];

const maxBase182q = 2950;

const n4468n: CgDataEntry[] = [
  {
    name: 'N4468N',
    cgData: { weight: 1896, arm: 36.71, moment: 0 },
    maxW: maxBase182q,
    comps: base182q,
    notes: null,
  },
];

const c182q: CgDataEntries = {
  [n4468n[0].name]: n4468n,
};

export default c182q;
