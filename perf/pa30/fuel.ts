import { NestedObject } from '../../src/util';

export const cruiseNotes = [
  'Table 5-3 - Part Throttle Fuel Consumption',
  'Table 5-4 - Altitude Performance',
  'Best Power - 100F ROP Peak EGT',
  'Best Economy - Peak EGT',
];

//  rpm
//  manifold pressure
//  bhp at sea-level
export const bhpSeaLevel: NestedObject = {
  1800: {
    mp: [22, 25],
    bhp: [75, 90],
  },
  1900: {
    mp: [21.5, 25.25],
    bhp: [75, 95],
  },
  2000: {
    mp: [21, 26],
    bhp: [75, 105],
  },
  2100: {
    mp: [20.25, 26.75],
    bhp: [75, 115],
  },
  2200: {
    mp: [19.75, 27.5],
    bhp: [75, 125],
  },
  2300: {
    mp: [19.25, 28.25],
    bhp: [75, 138],
  },
  2400: {
    mp: [18.5, 29],
    bhp: [75, 150],
  },
  2500: {
    mp: [18, 29],
    bhp: [75, 155],
  },
  2600: {
    mp: [17.5, 29],
    bhp: [75, 158],
  },
  2700: {
    mp: [17.25, 29],
    bhp: [75, 163],
  },
};

export const bhpAtAlt: NestedObject = {
  1800: {
    mp: [23.4, 19.4],
    bhp: [90, 75],
    pAlt: [6000, 11000],
  },
  1900: {
    mp: [24, 18.3],
    bhp: [97, 75],
    pAlt: [5500, 12500],
  },
  2000: {
    mp: [25, 17],
    bhp: [106, 75],
    pAlt: [4500, 14000],
  },
  2100: {
    mp: [26, 16.3],
    bhp: [116, 75],
    pAlt: [3500, 15250],
  },
  2200: {
    mp: [27, 15.4],
    bhp: [127, 75],
    pAlt: [2200, 16750],
  },
  2300: {
    mp: [28, 14.6],
    bhp: [139, 75],
    pAlt: [1100, 17750],
  },
  2400: {
    mp: [29, 14],
    bhp: [150, 75],
    pAlt: [0, 18750],
  },
  2500: {
    mp: [29, 13.7],
    bhp: [155, 75],
    pAlt: [0, 19250],
  },
  2600: {
    mp: [29, 13.4],
    bhp: [159, 75],
    pAlt: [0, 20000],
  },
  2700: {
    mp: [29, 13],
    bhp: [164, 75],
    pAlt: [0, 20500],
  },
};

//  bhp for engine
//  gallons per hour - best economy
//  gallons per hour - best power
export const fuel: NestedObject = {
  2200: {
    bhp: [72, 120],
    gphEcon: [5.5, 8.3],
    gphPower: [6.5, 9.8],
  },
  2400: {
    bhp: [72, 120],
    gphEcon: [5.8, 8.5],
    gphPower: [6.9, 10],
  },
  2600: {
    bhp: [72, 120],
    gphEcon: [6, 8.8],
    gphPower: [7.3, 10.3],
  },
  2700: {
    bhp: [72, 120],
    gphEcon: [6.3, 9],
    gphPower: [7.5, 10.5],
  },
};
