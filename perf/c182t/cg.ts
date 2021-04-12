import {
  lbsPerGallonFuel,
} from '../perfCommon';
import {
  CgDataEntry,
  CgDataEntries,
} from '../../src/cg';

const base182t: CgDataEntry[] = [
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
        cgData: { weight: 0, arm: 116, moment: 0 },
        maxW: 80,
        comps: null,
        notes: 'Maximum Baggage Weight: 80 lbs - subject to combined restriction',
      },
      {
        name: 'Baggage C',
        cgData: { weight: 0, arm: 129, moment: 0 },
        maxW: 80,
        comps: null,
        notes: 'Maximum Baggage Weight: 80 lbs - subject to combined restriction',
      },
    ],
    notes: 'Maximum Total Baggage Weight: 200 lbs',
  },
  {
    name: 'Fuel Main',
    cgData: { weight: 0, arm: 46.5, moment: 0 },
    maxW: lbsPerGallonFuel * 87,
    comps: null,
    notes: 'Maximum Useable Fuel: 87 gals (92)',
  },
];

const maxBase182t = 3100;

const n8050j: CgDataEntry[] = [
  {
    name: 'N8050J',
    cgData: { weight: 2016.4, arm: 38.34, moment: 0 },
    maxW: maxBase182t,
    comps: base182t,
    notes: null,
  },
];

const c182t: CgDataEntries = {
  [n8050j[0].name]: n8050j,
};

export default c182t;
