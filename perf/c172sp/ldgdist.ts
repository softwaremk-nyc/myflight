import { NestedObject } from '../../src/util';

export const ldgNotes = [
  'Table 5.11 - At 2550 lbs',
  'Flaps 30, Power off, Max braking',
  'Paved, level, dry runway',
  'Speed at 50 FT 61',
  'Mixture leaned above 3000ft for max RPM',
  'Decrease distance 10% for each 9kts head wind. Increase distance 10% for each 2kts tail wind',
  'For dry grass runway, increase ground roll distance by 45%',
  'For flaps up, add 9kts to approach speed and increase ground roll distance by 35%',
];

//  pressure altitude
//  temp|dist
export const ldgdist: NestedObject = {
  0: {
    temp: [0, 10, 20, 30, 40],
    dist: [545, 565, 585, 605, 625],
  },
  1000: {
    temp: [0, 10, 20, 30, 40],
    dist: [565, 585, 605, 625, 650],
  },
  2000: {
    temp: [0, 10, 20, 30, 40],
    dist: [585, 610, 630, 650, 670],
  },
  3000: {
    temp: [0, 10, 20, 30, 40],
    dist: [610, 630, 655, 675, 695],
  },
  4000: {
    temp: [0, 10, 20, 30, 40],
    dist: [630, 655, 675, 700, 725],
  },
  5000: {
    temp: [0, 10, 20, 30, 40],
    dist: [655, 680, 705, 725, 750],
  },
  6000: {
    temp: [0, 10, 20, 30, 40],
    dist: [680, 705, 730, 755, 780],
  },
  7000: {
    temp: [0, 10, 20, 30, 40],
    dist: [705, 730, 760, 785, 810],
  },
  8000: {
    temp: [0, 10, 20, 30, 40],
    dist: [735, 760, 790, 815, 840],
  },
};

//  pressure altitude
//  temp|dist
export const ldgdist50: NestedObject = {
  0: {
    temp: [0, 10, 20, 30, 40],
    dist: [1290, 1320, 1350, 1380, 1415],
  },
  1000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1320, 1350, 1385, 1420, 1450],
  },
  2000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1355, 1385, 1420, 1455, 1490],
  },
  3000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1385, 1425, 1460, 1495, 1530],
  },
  4000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1425, 1460, 1495, 1535, 1570],
  },
  5000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1460, 1500, 1535, 1575, 1615],
  },
  6000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1500, 1540, 1580, 1620, 1660],
  },
  7000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1545, 1585, 1625, 1665, 1705],
  },
  8000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1585, 1630, 1670, 1715, 1755],
  },
};
