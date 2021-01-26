import { NestedObject } from '../../src/util';

export const accelStopNotes = [
  'Table 5-8',
  'Flaps Retracted',
  'Decision at 90mph',
];

//  landing triple interpolation
//  temp is F
export const accelstopdistA: NestedObject = {
  0: {
    temp: [0, 100],
    refa: [2500, 3300],
  },
  2000: {
    temp: [0, 100],
    refa: [2860, 3700],
  },
  4000: {
    temp: [0, 100],
    refa: [3250, 4150],
  },
  6000: {
    temp: [0, 100],
    refa: [3700, 4700],
  },
  8000: {
    temp: [0, 100],
    refa: [4200, 5260],
  },
};

export const accelstopdistB: NestedObject = {
  2600: {
    lbs: [3600, 2600],
    refb: [2600, 1900],
  },
  2900: {
    lbs: [3600, 2600],
    refb: [2900, 2200],
  },
  3300: {
    lbs: [3600, 2600],
    refb: [3300, 2350],
  },
  3700: {
    lbs: [3600, 2600],
    refb: [3700, 2600],
  },
  4150: {
    lbs: [3600, 2600],
    refb: [4150, 2900],
  },
  4700: {
    lbs: [3600, 2600],
    refb: [4700, 3300],
  },
  5260: {
    lbs: [3600, 2600],
    refb: [5260, 3700],
  },
};

//  wind is MPH
export const accelstopdist: NestedObject = {
  1900: {
    wind: [0, 30],
    dist: [1900, 900],
  },
  2200: {
    wind: [0, 30],
    dist: [2200, 1100],
  },
  2350: {
    wind: [0, 30],
    dist: [2350, 1200],
  },
  2600: {
    wind: [0, 30],
    dist: [2600, 1390],
  },
  2900: {
    wind: [0, 30],
    dist: [2900, 1500],
  },
  3300: {
    wind: [0, 30],
    dist: [3300, 1700],
  },
  3700: {
    wind: [0, 30],
    dist: [3700, 1900],
  },
  4200: {
    wind: [0, 30],
    dist: [4200, 2200],
  },
  4650: {
    wind: [0, 30],
    dist: [4650, 2600],
  },
  5200: {
    wind: [0, 30],
    dist: [5200, 2900],
  },
};
