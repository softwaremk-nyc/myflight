import { NestedObject } from '../../src/util';

export const toNotes = [
  'Table 5-15',
  'Flaps 27',
  'Approach at 90mph',
];

//  landing triple interpolation
//  pAlt
//  temp is F
export const ldgdistA: NestedObject = {
  0: {
    temp: [0, 100],
    refa: [620, 750],
  },
  2000: {
    temp: [0, 100],
    refa: [680, 805],
  },
  4000: {
    temp: [0, 100],
    refa: [720, 860],
  },
  6000: {
    temp: [0, 100],
    refa: [770, 930],
  },
  8000: {
    temp: [0, 100],
    refa: [830, 1010],
  },
};

export const ldgdistB: NestedObject = {
  680: {
    lbs: [3600, 2600],
    refb: [680, 490],
  },
  750: {
    lbs: [3600, 2600],
    refb: [750, 540],
  },
  805: {
    lbs: [3600, 2600],
    refb: [805, 580],
  },
  860: {
    lbs: [3600, 2600],
    refb: [860, 630],
  },
  930: {
    lbs: [3600, 2600],
    refb: [930, 680],
  },
  1010: {
    lbs: [3600, 2600],
    refb: [1010, 730],
  },
};

//  wind is MPH
export const ldgdist: NestedObject = {
  540: {
    wind: [0, 30],
    dist: [540, 200],
  },
  630: {
    wind: [0, 30],
    dist: [630, 250],
  },
  730: {
    wind: [0, 30],
    dist: [730, 290],
  },
  850: {
    wind: [0, 30],
    dist: [850, 370],
  },
  1000: {
    wind: [0, 30],
    dist: [1000, 450],
  },
};

//  landing 50ft obstacle triple interpolation
export const ldgdist50A: NestedObject = {
  0: {
    temp: [0, 100],
    refa: [1960, 2200],
  },
  2000: {
    temp: [0, 100],
    refa: [2040, 2320],
  },
  4000: {
    temp: [0, 100],
    refa: [2160, 2460],
  },
  6000: {
    temp: [0, 100],
    refa: [2280, 2600],
  },
  8000: {
    temp: [0, 100],
    refa: [2380, 2760],
  },
};

export const ldgdist50B: NestedObject = {
  1960: {
    lbs: [3600, 2600],
    refb: [1960, 1620],
  },
  2090: {
    lbs: [3600, 2600],
    refb: [2090, 1700],
  },
  2200: {
    lbs: [3600, 2600],
    refb: [2200, 1800],
  },
  2320: {
    lbs: [3600, 2600],
    refb: [2320, 1890],
  },
  2460: {
    lbs: [3600, 2600],
    refb: [2460, 2000],
  },
  2600: {
    lbs: [3600, 2600],
    refb: [2600, 2100],
  },
  2760: {
    lbs: [3600, 2600],
    refb: [2760, 2200],
  },
};

export const ldgdist50: NestedObject = {
  1700: {
    wind: [0, 30],
    dist: [1700, 740],
  },
  1890: {
    wind: [0, 30],
    dist: [1890, 880],
  },
  2100: {
    wind: [0, 30],
    dist: [2100, 1040],
  },
  2280: {
    wind: [0, 30],
    dist: [2280, 1240],
  },
  2480: {
    wind: [0, 30],
    dist: [2480, 1400],
  },
  2720: {
    wind: [0, 30],
    dist: [2720, 1600],
  },
};
