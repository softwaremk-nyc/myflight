import { NestedObject } from '../../src/util';

export const toNotes = [
  'Table 5.5',
  'Flaps 10, Full Throttle prior to brake release',
  'Paved, level, dry runway',
  'Liftoff 51, 48, 44 at (2550|2400|2200)',
  'Mixture leaned above 3000ft for max RPM',
  'Decrease distance 10% for each 9kts head wind. Increase distance 10% for each 2kts tail wind',
  'For dry grass runway, increase ground roll distance by 15%',
];

//  a/c weight
//  pressure altitude
//  temp|dist
export const todist: NestedObject = {
  2550: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [860, 925, 995, 1070, 1150],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [940, 1010, 1090, 1170, 1260],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1025, 1110, 1195, 1285, 1380],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1125, 1215, 1310, 1410, 1515],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1235, 1335, 1440, 1550, 1660],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1355, 1465, 1585, 1705, 1825],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1495, 1615, 1745, 1875, 2010],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1645, 1785, 1920, 2065, 2215],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1820, 1970, 2120, 2280, 2450],
    },
  },
  2400: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [745, 800, 860, 925, 995],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [810, 875, 940, 1010, 1085],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [885, 955, 1030, 1110, 1190],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [970, 1050, 1130, 1215, 1305],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1065, 1150, 1240, 1335, 1430],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1170, 1265, 1360, 1465, 1570],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1285, 1390, 1500, 1610, 1725],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1415, 1530, 1650, 1770, 1900],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1560, 1690, 1815, 1950, 2095],
    },
  },
  2200: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [610, 655, 705, 760, 815],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [665, 720, 770, 830, 890],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [725, 785, 845, 905, 975],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [795, 860, 925, 995, 1065],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [870, 940, 1010, 1090, 1165],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [955, 1030, 1110, 1195, 1275],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1050, 1130, 1220, 1310, 1400],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1150, 1245, 1340, 1435, 1540],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1270, 1370, 1475, 1580, 1695],
    },
  },
};

//  a/c weight
//  pressure altitude
//  temp|dist
export const todist50: NestedObject = {
  2550: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [1465, 1575, 1690, 1810, 1945],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1600, 1720, 1850, 1990, 2135],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1755, 1890, 2035, 2190, 2355],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1925, 2080, 2240, 2420, 2605],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2120, 2295, 2480, 2685, 2880],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2345, 2545, 2755, 2975, 3205],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2605, 2830, 3075, 3320, 3585],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2910, 3170, 3440, 3730, 4045],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [3265, 3575, 3880, 4225, 4615],
    },
  },
  2400: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [1275, 1370, 1470, 1570, 1685],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1390, 1495, 1605, 1720, 1845],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1520, 1635, 1760, 1890, 2030],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1665, 1795, 1930, 2080, 2230],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1830, 1975, 2130, 2295, 2455],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2015, 2180, 2355, 2530, 2715],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2230, 2410, 2610, 2805, 3015],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2470, 2685, 2900, 3125, 3370],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2755, 3000, 3240, 3500, 3790],
    },
  },
  2200: {
    0: {
      temp: [0, 10, 20, 30, 40],
      dist: [1055, 1130, 1205, 1290, 1380],
    },
    1000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1145, 1230, 1315, 1410, 1505],
    },
    2000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1250, 1340, 1435, 1540, 1650],
    },
    3000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1365, 1465, 1570, 1685, 1805],
    },
    4000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1490, 1605, 1725, 1855, 1975],
    },
    5000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1635, 1765, 1900, 2035, 2175],
    },
    6000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1800, 1940, 2090, 2240, 2395],
    },
    7000: {
      temp: [0, 10, 20, 30, 40],
      dist: [1985, 2145, 2305, 2475, 2650],
    },
    8000: {
      temp: [0, 10, 20, 30, 40],
      dist: [2195, 2375, 2555, 2745, 2950],
    },
  },
};
