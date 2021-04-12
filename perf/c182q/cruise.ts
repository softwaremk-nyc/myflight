import { NestedObject } from '../../src/util';

export const cruiseNotes = [
  'Table 5-4',
  'At gross weight',
];

export const cruise: NestedObject = {
  45: {
    pAlt: [0, 16000],
    ktas: [137.8, 150],
  },
  55: {
    pAlt: [0, 16000],
    ktas: [155.6, 171.1],
  },
  65: {
    pAlt: [0, 12000],
    ktas: [170, 185.6],
  },
  75: {
    pAlt: [0, 8000],
    ktas: [178.3, 193],
  },
};
