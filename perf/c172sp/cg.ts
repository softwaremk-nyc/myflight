import {
  lbsPerGallonFuel,
} from '../perfCommon';
import {
  CgDataEntry,
  CgDataEntries,
} from '../../src/cg';

const base172sp: CgDataEntry[] = [
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
    cgData: { weight: 0, arm: 73, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Rear PX 2',
    cgData: { weight: 0, arm: 73, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Baggage Total',
    cgData: null,
    maxW: 120,
    comps: [
      {
        name: 'Baggage 1',
        cgData: { weight: 0, arm: 95, moment: 0 },
        maxW: 120,
        comps: null,
        notes: 'Maximum Baggage Weight: 120 lbs - subject to combined restriction',
      },
      {
        name: 'Baggage 2',
        cgData: { weight: 0, arm: 123, moment: 0 },
        maxW: 50,
        comps: null,
        notes: 'Maximum Baggage Weight: 50 lbs - subject to combined restriction',
      },
    ],
    notes: 'Maximum Total Baggage Weight: 120 lbs',
  },
  {
    name: 'Fuel (gals)',
    cgData: { weight: 0, arm: 48, moment: 0 },
    maxW: lbsPerGallonFuel * 53,
    comps: null,
    notes: 'Maximum Useable Fuel: 53 gals (56)',
  },
];

const maxBase127spW = 2550;
const n5255r: CgDataEntry[] = [
  {
    name: 'N5255R',
    cgData: { weight: 1712.1, arm: 41.86049296, moment: 0 },
    maxW: maxBase127spW,
    comps: base172sp,
    notes: null,
  },
];

const n2461p: CgDataEntry[] = [
  {
    name: 'N2461P',
    cgData: { weight: 1761.3, arm: 41.68114461, moment: 0 },
    maxW: maxBase127spW,
    comps: base172sp,
    notes: null,
  },
];

const n316as: CgDataEntry[] = [
  {
    name: 'N316AS',
    cgData: { weight: 1726.97, arm: 41.5998425, moment: 0 },
    maxW: maxBase127spW,
    comps: base172sp,
    notes: null,
  },
];

const n5491j: CgDataEntry[] = [
  {
    name: 'N5491J',
    cgData: { weight: 1741.6, arm: 41.60784336, moment: 0 },
    maxW: maxBase127spW,
    comps: base172sp,
    notes: null,
  },
];

const c172sp: CgDataEntries = {
  [n5255r[0].name]: n5255r,
  [n2461p[0].name]: n2461p,
  [n316as[0].name]: n316as,
  [n5491j[0].name]: n5491j,
};

export default c172sp;
