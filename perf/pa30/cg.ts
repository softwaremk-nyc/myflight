import {
  lbsPerGallonFuel,
} from '../perfCommon';
import {
  CgDataEntry,
  CgDataEntries,
} from '../../src/cg';

const basePa30: CgDataEntry[] = [
  {
    name: 'Pilot',
    cgData: { weight: 0, arm: 84.8, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Co-Pilot',
    cgData: { weight: 0, arm: 84.8, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Rear Passenger 1',
    cgData: { weight: 0, arm: 120.5, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Rear Passenger 2',
    cgData: { weight: 0, arm: 120.5, moment: 0 },
    maxW: null,
    comps: null,
    notes: null,
  },
  {
    name: 'Baggage Compartment',
    cgData: { weight: 0, arm: 142, moment: 0 },
    maxW: 250,
    comps: null,
    notes: 'Maximum Total Baggage Weight: 250 lbs',
  },
  {
    name: 'Fuel',
    cgData: { weight: 0, arm: 90, moment: 0 },
    maxW: lbsPerGallonFuel * 54,
    comps: null,
    notes: 'Maximum Useable Fuel: 54 gals (60)',
  },
  {
    name: 'Fuel - Aux',
    cgData: { weight: 0, arm: 95, moment: 0 },
    maxW: lbsPerGallonFuel * 30,
    comps: null,
    notes: 'Maximum Useable Fuel: 30 gals (30)',
  },
];

const maxBasePa30W = 3600;

const n7943y: CgDataEntry[] = [
  {
    name: 'N7943Y',
    cgData: { weight: 2580, arm: 83.58193798, moment: 0 },
    maxW: maxBasePa30W,
    comps: basePa30,
    notes: null,
  },
];

const n8444y: CgDataEntry[] = [
  {
    name: 'N8444Y',
    cgData: { weight: 2333.14, arm: 82.89, moment: 0 },
    maxW: maxBasePa30W,
    comps: basePa30,
    notes: null,
  },
];

const pa30: CgDataEntries = {
  [n7943y[0].name]: n7943y,
  [n8444y[0].name]: n8444y,
};

export default pa30;
