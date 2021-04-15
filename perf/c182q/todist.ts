import { NestedObject } from '../../src/util';

export const toNotes = [
  'Table 5.4',
  'Flaps 20, Full Throttle prior to brake release',
  'Paved, level, dry runway',
  'Liftoff 49, 47, 44 at (2950|2700|2400)',
  'Mixture leaned above 5000ft for max RPM',
  'Decrease distance 10% for each 9kts head wind. Increase distance 10% for each 2kts tail wind (*)',
  'For dry grass runway, increase ground roll distance by 15% (*)',
  '(*) applied to this calculation',
];

//  a/c weight
//  pressure altitude
//  temp|dist
export const todist: NestedObject = {
  2950: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [635, 680, 730, 780, 835],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [690, 1745, 795, 850, 910],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [755, 810, 870, 930, 995],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [825, 890, 950, 1020, 1090],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [905, 970, 1045, 1120, 1195],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [995, 1065, 1145, 1230, 1315],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1090, 1175, 1260, 1350, 1450],
    },
    7000: {
      temp: [0, 10, 20, 30],
      dist: [1200, 1290, 1390, 1490],
    },
    8000: {
      temp: [0, 10, 20],
      dist: [1325, 1425, 1530],
    },
  },
  2700: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [520, 555, 595, 635, 680],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [565, 605, 650, 695, 740],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [615, 660, 710, 760, 810],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [675, 725, 775, 830, 885],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [735, 790, 850, 910, 970],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [805, 865, 930, 995, 1065],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [885, 950, 1020, 1095, 1170],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [970, 1045, 1120, 1205, 1290],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1070, 1150, 1235, 1325, 1420],
    },
  },
  2400: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [395, 425, 455, 485, 520],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [430, 465, 495, 530, 565],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [470, 505, 540, 575, 615],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [515, 550, 590, 630, 675],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [560, 600, 645, 690, 735],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [615, 655, 705, 755, 805],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [670, 720, 770, 825, 885],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [735, 790, 845, 905, 970],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [810, 870, 930, 1000, 1070],
    },
  },
};

//  a/c weight
//  pressure altitude
//  temp|dist
export const todist50: NestedObject = {
  2950: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [1220, 1305, 1395, 1490, 1590],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1335, 1430, 1530, 1635, 1745],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1465, 1565, 1680, 1800, 1925],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1605, 1725, 1850, 1985, 2130],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1770, 1905, 2050, 2205, 2370],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1965, 2115, 2280, 2460, 2655],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2185, 2360, 2555, 2765, 3005],
    },
    7000: {
      temp: [0, 10, 20, 30],
      dist: [2450, 2655, 2885, 3145],
    },
    8000: {
      temp: [0, 10, 20],
      dist: [2765, 3015, 3300],
    },
  },
  2700: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [1000, 1065, 1135, 1210, 1285],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1085, 1160, 1235, 1320, 1405],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1185, 1265, 1355, 1445, 1540],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1295, 1385, 1485, 1585, 1695],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1425, 1525, 1630, 1745, 1870],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1565, 1680, 1800, 1930, 2075],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1730, 1860, 1995, 2150, 2310],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1920, 2065, 2225, 2400, 2595],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2140, 2310, 2500, 2705, 2935],
    },
  },
  2400: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [775, 825, 875, 930, 990],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [840, 895, 950, 1010, 1075],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [915, 975, 1035, 1105, 1175],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [995, 1060, 1130, 1205, 1285],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1085, 1160, 1235, 1320, 1405],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1185, 1270, 1355, 1445, 1545],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1300, 1295, 1490, 1595, 1705],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1435, 1535, 1645, 1765, 1890],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1585, 1700, 1825, 1960, 2105],
    },
  },
};
