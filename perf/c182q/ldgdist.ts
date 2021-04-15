import { NestedObject } from '../../src/util';

export const ldgNotes = [
  'Table 5.10 - At 2950 lbs',
  'Flaps 40, Power off, Max braking',
  'Paved, level, dry runway',
  'Speed at 50 FT 60',
  'Decrease distance 10% for each 9kts head wind. Increase distance 10% for each 2kts tail wind (*)',
  'For dry grass runway, increase ground roll distance by 40% (*)',
  '(*) applied to this calculation',
];

//  pressure altitude
//  temp|dist
export const ldgdist: NestedObject = {
  0: {
    temp: [0, 10, 20, 30, 40],
    dist: [560, 580, 600, 620, 640],
  },
  1000: {
    temp: [0, 10, 20, 30, 40],
    dist: [580, 600, 620, 645, 665],
  },
  2000: {
    temp: [0, 10, 20, 30, 40],
    dist: [600, 625, 645, 670, 690],
  },
  3000: {
    temp: [0, 10, 20, 30, 40],
    dist: [625, 645, 670, 695, 715],
  },
  4000: {
    temp: [0, 10, 20, 30, 40],
    dist: [650, 670, 695, 720, 740],
  },
  5000: {
    temp: [0, 10, 20, 30, 40],
    dist: [670, 695, 720, 745, 770],
  },
  6000: {
    temp: [0, 10, 20, 30, 40],
    dist: [700, 725, 750, 775, 800],
  },
  7000: {
    temp: [0, 10, 20, 30, 40],
    dist: [725, 750, 780, 805, 830],
  },
  8000: {
    temp: [0, 10, 20, 30, 40],
    dist: [755, 780, 810, 835, 865],
  },
};

//  pressure altitude
//  temp|dist
export const ldgdist50: NestedObject = {
  0: {
    temp: [0, 10, 20, 30, 40],
    dist: [1300, 1335, 1365, 1400, 1435],
  },
  1000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1335, 1365, 1400, 1440, 1475],
  },
  2000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1370, 1405, 1440, 1480, 1515],
  },
  3000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1410, 1445, 1485, 1525, 1560],
  },
  4000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1450, 1485, 1525, 1565, 1600],
  },
  5000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1485, 1525, 1565, 1610, 1650],
  },
  6000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1530, 1575, 1615, 1660, 1700],
  },
  7000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1575, 1615, 1665, 1710, 1750],
  },
  8000: {
    temp: [0, 10, 20, 30, 40],
    dist: [1625, 1665, 1715, 1760, 1805],
  },
};
