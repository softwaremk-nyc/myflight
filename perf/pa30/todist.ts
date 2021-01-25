import { NestedObject } from '../../src/util';

export const toNotes = [
  'Table 5-6',
  'Flaps 15, Full Throttle / Max RPM',
  'Takeoff at 80mph',
];

//  takeoff triple interpolation
//  temp is F
export const todistA: NestedObject = {
  0: {
    temp: [0, 100],
    refa: [1040, 1400],
  },
  2000: {
    temp: [0, 100],
    refa: [2000, 1620],
  },
  4000: {
    temp: [0, 100],
    refa: [1380, 1840],
  },
  6000: {
    temp: [0, 100],
    refa: [1620, 2160],
  },
  8000: {
    temp: [0, 100],
    refa: [1860, 2480],
  },
};

export const todistB: NestedObject = {
  1040: {
    lbs: [3600, 2600],
    refb: [1040, 720],
  },
  1220: {
    lbs: [3600, 2600],
    refb: [1220, 840],
  },
  1400: {
    lbs: [3600, 2600],
    refb: [1400, 960],
  },
  1620: {
    lbs: [3600, 2600],
    refb: [1620, 1120],
  },
  1840: {
    lbs: [3600, 2600],
    refb: [1840, 1280],
  },
  2160: {
    lbs: [3600, 2600],
    refb: [2160, 1480],
  },
  2480: {
    lbs: [3600, 2600],
    refb: [2480, 1700],
  },
};

//  wind is MPH
export const todist: NestedObject = {
  720: {
    wind: [0, 30],
    dist: [720, 360],
  },
  840: {
    wind: [0, 30],
    dist: [840, 460],
  },
  960: {
    wind: [0, 30],
    dist: [960, 540],
  },
  1120: {
    wind: [0, 30],
    dist: [1120, 640],
  },
  1280: {
    wind: [0, 30],
    dist: [1280, 700],
  },
  1480: {
    wind: [0, 30],
    dist: [1480, 800],
  },
  1700: {
    wind: [0, 30],
    dist: [1700, 960],
  },
  1840: {
    wind: [0, 30],
    dist: [1840, 1080],
  },
  2140: {
    wind: [0, 30],
    dist: [2140, 1200],
  },
  2480: {
    wind: [0, 30],
    dist: [2480, 1400],
  },
};

//  takeoff 50ft obstacle triple interpolation
export const todist50A: NestedObject = {
  0: {
    temp: [0, 100],
    refa: [1650, 2500],
  },
  2000: {
    temp: [0, 100],
    refa: [1950, 3000],
  },
  4000: {
    temp: [0, 100],
    refa: [2350, 3750],
  },
  6000: {
    temp: [0, 100],
    refa: [2850, 4700],
  },
  8000: {
    temp: [0, 100],
    refa: [3400, 6100],
  },
};

export const todist50B: NestedObject = {
  2000: {
    lbs: [3600, 2600],
    refb: [2000, 1400],
  },
  2500: {
    lbs: [3600, 2600],
    refb: [2500, 1700],
  },
  3000: {
    lbs: [3600, 2600],
    refb: [3000, 2000],
  },
  3750: {
    lbs: [3600, 2600],
    refb: [3750, 2600],
  },
  4700: {
    lbs: [3600, 2600],
    refb: [4700, 3300],
  },
  6100: {
    lbs: [3600, 2600],
    refb: [6100, 4200],
  },
};

export const todist50: NestedObject = {
  1600: {
    wind: [0, 30],
    dist: [1600, 1100],
  },
  2000: {
    wind: [0, 30],
    dist: [2000, 1250],
  },
  2250: {
    wind: [0, 30],
    dist: [2250, 1450],
  },
  2800: {
    wind: [0, 30],
    dist: [2800, 1850],
  },
  3300: {
    wind: [0, 30],
    dist: [3300, 2150],
  },
  3700: {
    wind: [0, 30],
    dist: [3700, 2450],
  },
  4200: {
    wind: [0, 30],
    dist: [4200, 2900],
  },
  4900: {
    wind: [0, 30],
    dist: [4900, 3250],
  },
  5500: {
    wind: [0, 30],
    dist: [5500, 3650],
  },
  6100: {
    wind: [0, 30],
    dist: [6100, 4100],
  },
};
