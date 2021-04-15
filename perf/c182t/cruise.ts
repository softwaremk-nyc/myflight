import { NestedObject } from '../../src/util';

export const cruiseNotes = [
  'Table 5.9 - At 3100 lbs',
  'Mixture leaned at all altitudes',
  'Cowl Flaps Closed',
];

//  pressure altitude
//  -20, 0, +20 difference from std
//  rpm
//  mp|bhp|ktas|gph
const cruise: NestedObject = {
  0: {
    2400: {
      '-20': {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [84, 79, 74, 69, 65, 60],
        ktas: [134, 132, 129, 126, 122, 118],
        gph: [14.5, 13.6, 12.8, 12.1, 11.4, 10.7],
      },
      0: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [81, 76, 71, 67, 62, 58],
        ktas: [136, 133, 130, 127, 122, 118],
        gph: [14, 13.2, 12.4, 11.7, 11.1, 10.4],
      },
      20: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [82, 78, 74, 69, 65, 60, 56],
        ktas: [140, 138, 135, 131, 127, 123, 118],
        gph: [14.3, 13.5, 12.8, 12.1, 11.4, 10.8, 10.2],
      },
    },
    2300: {
      '-20': {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [80, 76, 71, 67, 62, 58],
        ktas: [133, 130, 127, 124, 120, 116],
        gph: [13.9, 13.2, 12.4, 11.7, 11.1, 10.4],
      },
      0: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [82, 78, 73, 69, 65, 60, 56],
        ktas: [137, 135, 132, 128, 124, 120, 116],
        gph: [14.2, 13.4, 12.7, 12, 11.4, 10.8, 10.2],
      },
      20: {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [84, 79, 75, 71, 67, 62, 58, 54],
        ktas: [141, 139, 136, 132, 129, 125, 121, 116],
        gph: [14.5, 13.7, 13, 12.3, 11.7, 11.1, 10.5, 9.9],
      },
    },
    2200: {
      '-20': {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [82, 77, 73, 69, 65, 60, 56],
        ktas: [133, 131, 129, 126, 122, 118, 114],
        gph: [14.2, 13.4, 12.7, 12, 11.4, 10.8, 10.2],
      },
      0: {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [83, 79, 75, 71, 66, 62, 58, 54],
        ktas: [137, 135, 133, 130, 126, 122, 119, 114],
        gph: [14.4, 13.6, 12.9, 12.3, 11.7, 11.1, 10.5, 9.9],
      },
      20: {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [80, 76, 72, 68, 64, 60, 56, 52],
        ktas: [139, 136, 134, 130, 126, 123, 118, 114],
        gph: [13.9, 13.2, 12.6, 11.9, 11.3, 10.8, 10.2, 9.7],
      },
    },
    2100: {
      '-20': {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [82, 78, 74, 70, 66, 61, 57, 53],
        ktas: [133, 131, 129, 126, 123, 119, 115, 111],
        gph: [14.2, 13.4, 12.8, 12.1, 11.5, 10.9, 10.4, 9.8],
      },
      0: {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [79, 75, 71, 67, 63, 59, 55, 51],
        ktas: [135, 133, 130, 127, 123, 120, 116, 111],
        gph: [13.7, 13, 12.4, 11.8, 11.2, 10.6, 10.1, 9.6],
      },
      20: {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [76, 73, 69, 65, 61, 57, 54, 50],
        ktas: [136, 134, 130, 127, 123, 120, 115, 111],
        gph: [13.2, 12.6, 12, 11.4, 10.9, 10.4, 9.9, 9.3],
      },
    },
    2000: {
      '-20': {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [78, 74, 70, 66, 62, 58, 54, 51],
        ktas: [131, 129, 126, 123, 120, 116, 113, 108],
        gph: [13.4, 12.8, 12.2, 11.6, 11, 10.5, 10, 9.4],
      },
      0: {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [75, 71, 67, 64, 60, 56, 53, 49],
        ktas: [133, 130, 127, 124, 120, 117, 112, 108],
        gph: [13, 12.4, 11.8, 11.3, 10.7, 10.2, 9.7, 9.2],
      },
      20: {
        mp: [27, 26, 25, 24, 23, 22, 21, 20],
        mcp: [72, 69, 65, 62, 58, 54, 51, 47],
        ktas: [134, 131, 127, 124, 121, 116, 112, 108],
        gph: [12.6, 12, 11.5, 11, 10.5, 10, 9.5, 9],
      },
    },
  }, 2000: {
    2400: {
      '-20': {
        mp: [24, 23, 22, 21, 20],
        mcp: [81, 77, 72, 67, 62],
        ktas: [136, 133, 130, 126, 122],
        gph: [14.1, 13.3, 12.5, 11.8, 11],
      },
      0: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [83, 79, 74, 69, 65, 60],
        ktas: [140, 138, 134, 131, 126, 122],
        gph: [14.4, 13.6, 12.8, 12.1, 11.4, 10.7],
      },
      20: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [80, 76, 71, 67, 63, 58],
        ktas: [142, 139, 135, 131, 127, 122],
        gph: [13.9, 13.2, 12.4, 11.7, 11.1, 10.5],
      },
    },
    2300: {
      '-20': {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [83, 78, 74, 69, 65, 60],
        ktas: [137, 134, 131, 128, 124, 120],
        gph: [14.4, 13.6, 12.8, 12.1, 11.4, 10.7],
      },
      0: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [80, 76, 71, 67, 62, 58],
        ktas: [139, 136, 133, 128, 124, 120],
        gph: [13.9, 13.1, 12.4, 11.7, 11.1, 10.5],
      },
      20: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [82, 77, 73, 69, 65, 60, 56],
        ktas: [143, 140, 137, 133, 129, 125, 120],
        gph: [14.2, 13.4, 12.7, 12, 11.4, 10.8, 10.2],
      },
    },
    2200: {
      '-20': {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [80, 75, 71, 67, 62, 58],
        ktas: [135, 132, 129, 126, 122, 118],
        gph: [13.8, 13.1, 12.4, 11.7, 11.1, 10.5],
      },
      0: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [81, 77, 73, 69, 64, 60, 56],
        ktas: [139, 137, 134, 130, 126, 122, 118],
        gph: [14.1, 13.3, 12.6, 12, 11.4, 10.8, 10.2],
      },
      20: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [78, 74, 70, 66, 62, 58, 54],
        ktas: [140, 138, 134, 130, 127, 122, 118],
        gph: [13.6, 12.9, 12.3, 11.6, 11, 10.5, 9.9],
      },
    },
    2100: {
      '-20': {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [80, 76, 72, 68, 64, 59, 55],
        ktas: [135, 133, 130, 127, 123, 119, 115],
        gph: [13.9, 13.1, 12.5, 11.8, 11.2, 10.6, 10.1],
      },
      0: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [77, 73, 69, 65, 61, 57, 53],
        ktas: [137, 134, 131, 127, 123, 119, 115],
        gph: [13.4, 12.7, 12.1, 11.5, 10.9, 10.4, 9.8],
      },
      20: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [75, 71, 67, 63, 59, 55, 52],
        ktas: [138, 134, 131, 127, 124, 119, 115],
        gph: [12.9, 12.3, 11.7, 11.2, 10.6, 10.1, 9.6],
      },
    },
    2000: {
      '-20': {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [76, 72, 68, 64, 60, 56, 52],
        ktas: [133, 130, 127, 124, 120, 116, 112],
        gph: [13.1, 12.5, 11.9, 11.3, 10.8, 10.2, 9.7],
      },
      0: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [73, 69, 66, 62, 58, 54, 51],
        ktas: [134, 131, 127, 124, 120, 116, 112],
        gph: [12.7, 12.1, 11.5, 11, 10.5, 10, 9.4],
      },
      20: {
        mp: [26, 25, 24, 23, 22, 21, 20],
        mcp: [71, 67, 64, 60, 56, 53, 49],
        ktas: [134, 131, 128, 124, 120, 116, 111],
        gph: [12.3, 11.8, 11.2, 10.7, 10.2, 9.7, 9.2],
      },
    },
  },
  4000: {
    2400: {
      '-20': {
        mp: [24, 23, 22, 21, 20],
        mcp: [84, 79, 74, 70, 65],
        ktas: [140, 138, 134, 130, 126],
        gph: [14.6, 13.7, 12.9, 12.1, 11.4],
      },
      0: {
        mp: [24, 23, 22, 21, 20],
        mcp: [81, 76, 72, 67, 62],
        ktas: [142, 139, 135, 131, 126],
        gph: [14, 13.2, 12.5, 11.7, 11.1],
      },
      20: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [83, 78, 74, 69, 65, 60],
        ktas: [146, 143, 139, 135, 131, 126],
        gph: [14.4, 13.6, 12.8, 12.1, 11.4, 10.8],
      },
    },
    2300: {
      '-20': {
        mp: [24, 23, 22, 21, 20],
        mcp: [81, 76, 72, 67, 62],
        ktas: [138, 135, 132, 128, 124],
        gph: [14, 13.2, 12.5, 11.7, 11.1],
      },
      0: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [83, 78, 74, 69, 65, 60],
        ktas: [143, 140, 137, 133, 128, 124],
        gph: [14.3, 13.5, 12.8, 12.1, 11.4, 10.7],
      },
      20: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [80, 75, 71, 67, 62, 58],
        ktas: [144, 141, 137, 133, 129, 124],
        gph: [13.8, 13.1, 12.4, 11.7, 11.1, 10.5],
      },
    },
    2200: {
      '-20': {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [82, 78, 73, 69, 65, 60],
        ktas: [139, 136, 133, 130, 126, 122],
        gph: [14.2, 13.4, 12.7, 12, 11.4, 10.7],
      },
      0: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [79, 75, 71, 66, 62, 58],
        ktas: [141, 138, 134, 130, 126, 122],
        gph: [13.7, 13, 12.3, 11.7, 11, 10.4],
      },
      20: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [77, 72, 68, 64, 60, 56],
        ktas: [142, 138, 134, 130, 126, 121],
        gph: [13.2, 12.6, 11.9, 11.3, 10.7, 10.2],
      },
    },
    2100: {
      '-20': {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [78, 74, 70, 66, 61, 57],
        ktas: [137, 134, 131, 127, 123, 119],
        gph: [13.5, 12.8, 12.2, 11.5, 10.9, 10.3],
      },
      0: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [75, 71, 67, 63, 59, 55],
        ktas: [138, 135, 131, 127, 123, 119],
        gph: [13, 12.4, 11.8, 11.2, 10.6, 10.1],
      },
      20: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [73, 69, 65, 61, 57, 53],
        ktas: [138, 135, 131, 127, 123, 118],
        gph: [12.6, 12, 11.4, 10.9, 10.3, 9.8],
      },
    },
    2000: {
      '-20': {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [74, 70, 66, 62, 58, 54],
        ktas: [134, 131, 127, 124, 120, 116],
        gph: [12.8, 12.2, 11.6, 11, 10.5, 9.9],
      },
      0: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [71, 68, 64, 60, 56, 52],
        ktas: [135, 131, 128, 124, 120, 115],
        gph: [12.4, 11.8, 11.3, 10.7, 10.2, 9.7],
      },
      20: {
        mp: [25, 24, 23, 22, 21, 20],
        mcp: [69, 65, 62, 58, 54, 51],
        ktas: [135, 132, 128, 124, 120, 115],
        gph: [12.1, 11.5, 11, 10.4, 9.9, 9.4],
      },
    },
  },
  6000: {
    2400: {
      '-20': {
        mp: [23, 22, 21, 20, 19],
        mcp: [82, 77, 72, 67, 62],
        ktas: [142, 138, 135, 130, 126],
        gph: [14.2, 13.3, 12.5, 11.7, 11],
      },
      0: {
        mp: [23, 22, 21, 20, 19],
        mcp: [79, 74, 69, 65, 60],
        ktas: [143, 139, 135, 130, 126],
        gph: [13.6, 12.8, 12.1, 11.4, 10.7],
      },
      20: {
        mp: [23, 22, 21, 20, 19],
        mcp: [76, 72, 67, 62, 58],
        ktas: [144, 139, 135, 131, 125],
        gph: [13.2, 12.4, 11.7, 11.1, 10.4],
      },
    },
    2300: {
      '-20': {
        mp: [23, 22, 21, 20, 19],
        mcp: [79, 74, 69, 65, 60],
        ktas: [140, 136, 132, 128, 124],
        gph: [13.6, 12.8, 12.1, 11.4, 10.7],
      },
      0: {
        mp: [23, 22, 21, 20, 19],
        mcp: [76, 71, 67, 62, 58],
        ktas: [141, 137, 133, 128, 123],
        gph: [13.1, 12.4, 11.7, 11, 10.4],
      },
      20: {
        mp: [23, 22, 21, 20, 19],
        mcp: [73, 69, 64, 60, 56],
        ktas: [141, 137, 133, 128, 123],
        gph: [12.7, 12, 11.4, 10.7, 10.1],
      },
    },
    2200: {
      '-20': {
        mp: [23, 22, 21, 20, 19],
        mcp: [76, 71, 67, 62, 58],
        ktas: [137, 134, 130, 126, 121],
        gph: [13.1, 12.4, 11.7, 11, 10.4],
      },
      0: {
        mp: [23, 22, 21, 20, 19],
        mcp: [73, 69, 64, 60, 56],
        ktas: [138, 134, 130, 126, 121],
        gph: [12.6, 12, 11.3, 10.7, 10.1],
      },
      20: {
        mp: [23, 22, 21, 20, 19],
        mcp: [70, 66, 62, 58, 54],
        ktas: [138, 135, 130, 125, 120],
        gph: [12.3, 11.6, 11, 10.4, 9.9],
      },
    },
    2100: {
      '-20': {
        mp: [23, 22, 21, 20, 19],
        mcp: [72, 68, 63, 59, 55],
        ktas: [135, 131, 127, 123, 118],
        gph: [12.5, 11.8, 11.2, 10.6, 10],
      },
      0: {
        mp: [23, 22, 21, 20, 19],
        mcp: [69, 65, 61, 57, 53],
        ktas: [135, 131, 127, 122, 118],
        gph: [12.1, 11.5, 10.9, 10.3, 9.8],
      },
      20: {
        mp: [23, 22, 21, 20, 19],
        mcp: [67, 63, 59, 55, 51],
        ktas: [135, 131, 127, 122, 117],
        gph: [11.7, 11.1, 10.6, 10, 9.5],
      },
    },
    2000: {
      '-20': {
        mp: [23, 22, 21, 20, 19],
        mcp: [68, 64, 60, 56, 52],
        ktas: [131, 127, 124, 119, 115],
        gph: [11.9, 11.3, 10.7, 10.2, 9.6],
      },
      0: {
        mp: [23, 22, 21, 20, 19],
        mcp: [66, 62, 58, 54, 50],
        ktas: [132, 128, 123, 119, 114],
        gph: [11.5, 11, 10.4, 9.9, 9.4],
      },
      20: {
        mp: [23, 22, 21, 20, 19],
        mcp: [63, 60, 56, 52, 48],
        ktas: [132, 128, 123, 118, 113],
        gph: [11.2, 10.7, 10.2, 9.7, 9.1],
      },
    },
  },
  8000: {
    2400: {
      '-20': {
        mp: [21, 20, 19, 18],
        mcp: [74, 69, 64, 59],
        ktas: [139, 134, 130, 125],
        gph: [12.9, 12.1, 11.4, 10.6],
      },
      0: {
        mp: [21, 20, 19, 18],
        mcp: [72, 67, 62, 57],
        ktas: [139, 135, 130, 124],
        gph: [12.5, 11.7, 11, 10.3],
      },
      20: {
        mp: [21, 20, 19, 18],
        mcp: [69, 65, 60, 55],
        ktas: [140, 135, 130, 124],
        gph: [12.1, 11.4, 10.7, 10.1],
      },
    },
    2300: {
      '-20': {
        mp: [21, 20, 19, 18],
        mcp: [72, 67, 62, 57],
        ktas: [136, 132, 128, 122],
        gph: [12.5, 11.7, 11, 10.3],
      },
      0: {
        mp: [21, 20, 19, 18],
        mcp: [69, 64, 60, 55],
        ktas: [137, 132, 127, 122],
        gph: [12, 11.3, 10.7, 10.1],
      },
      20: {
        mp: [21, 20, 19, 18],
        mcp: [67, 62, 58, 53],
        ktas: [137, 132, 127, 121],
        gph: [11.7, 11, 10.4, 9.8],
      },
    },
    2200: {
      '-20': {
        mp: [21, 20, 19, 18],
        mcp: [69, 64, 60, 55],
        ktas: [134, 130, 125, 120],
        gph: [12, 11.3, 10.7, 10.1],
      },
      0: {
        mp: [21, 20, 19, 18],
        mcp: [66, 62, 57, 53],
        ktas: [134, 130, 125, 119],
        gph: [11.6, 11, 10.4, 9.8],
      },
      20: {
        mp: [21, 20, 19, 18],
        mcp: [64, 60, 55, 51],
        ktas: [134, 129, 124, 119],
        gph: [11.3, 10.7, 10.1, 9.5],
      },
    },
    2100: {
      '-20': {
        mp: [21, 20, 19, 18],
        mcp: [65, 61, 57, 52],
        ktas: [131, 127, 122, 117],
        gph: [11.5, 10.9, 10.3, 9.7],
      },
      0: {
        mp: [21, 20, 19, 18],
        mcp: [63, 59, 55, 50],
        ktas: [131, 126, 121, 116],
        gph: [11.2, 10.6, 10, 9.4],
      },
      20: {
        mp: [21, 20, 19, 18],
        mcp: [61, 57, 53, 49],
        ktas: [131, 126, 121, 115],
        gph: [10.8, 10.3, 9.7, 9.2],
      },
    },
    2000: {
      '-20': {
        mp: [21, 20, 19],
        mcp: [62, 58, 54],
        ktas: [128, 123, 118],
        gph: [11, 10.4, 9.9],
      },
      0: {
        mp: [21, 20, 19],
        mcp: [60, 56, 52],
        ktas: [127, 123, 118],
        gph: [10.7, 10.1, 9.6],
      },
      20: {
        mp: [21, 20, 19],
        mcp: [58, 54, 50],
        ktas: [127, 122, 117],
        gph: [10.4, 9.9, 9.4],
      },
    },
  },
  10000: {
    2400: {
      '-20': {
        mp: [20, 19, 18],
        mcp: [72, 67, 62],
        ktas: [139, 134, 129],
        gph: [12.5, 11.7, 11],
      },
      0: {
        mp: [20, 19, 18],
        mcp: [69, 64, 59],
        ktas: [139, 134, 129],
        gph: [12.1, 11.3, 10.6],
      },
      20: {
        mp: [20, 19, 18],
        mcp: [67, 62, 57],
        ktas: [139, 134, 128],
        gph: [11.7, 11, 10.3],
      },
    },
    2300: {
      '-20': {
        mp: [21, 20, 19, 18],
        mcp: [74, 69, 64, 59],
        ktas: [141, 136, 132, 126],
        gph: [12.8, 12.1, 11.3, 10.6],
      },
      0: {
        mp: [21, 20, 19, 18],
        mcp: [71, 66, 62, 57],
        ktas: [141, 137, 132, 126],
        gph: [12.4, 11.7, 11, 10.3],
      },
      20: {
        mp: [21, 20, 19, 18],
        mcp: [69, 64, 60, 55],
        ktas: [142, 136, 131, 125],
        gph: [12, 11.3, 10.7, 10.1],
      },
    },
    2200: {
      '-20': {
        mp: [20, 19, 18],
        mcp: [66, 62, 57],
        ktas: [134, 129, 124],
        gph: [11.6, 11, 10.3],
      },
      0: {
        mp: [20, 19, 18],
        mcp: [64, 59, 55],
        ktas: [134, 129, 123],
        gph: [11.3, 10.6, 10],
      },
      20: {
        mp: [20, 19, 18],
        mcp: [62, 57, 53],
        ktas: [133, 128, 123],
        gph: [10.9, 10.4, 9.8],
      },
    },
    2100: {
      '-20': {
        mp: [20, 19, 18],
        mcp: [63, 59, 54],
        ktas: [131, 126, 121],
        gph: [11.2, 10.5, 9.9],
      },
      0: {
        mp: [20, 19, 18],
        mcp: [61, 56, 52],
        ktas: [130, 125, 120],
        gph: [10.8, 10.2, 9.7],
      },
      20: {
        mp: [20, 19, 18],
        mcp: [59, 54, 50],
        ktas: [130, 125, 119],
        gph: [10.5, 10, 9.4],
      },
    },
    2000: {
      '-20': {
        mp: [20, 19, 18],
        mcp: [60, 56, 51],
        ktas: [127, 122, 117],
        gph: [10.7, 10.1, 9.6],
      },
      0: {
        mp: [20, 19, 18],
        mcp: [58, 54, 50],
        ktas: [127, 122, 116],
        gph: [10.4, 9.8, 9.3],
      },
      20: {
        mp: [20, 19, 18],
        mcp: [55, 52, 48],
        ktas: [126, 121, 115],
        gph: [10.1, 9.6, 9],
      },
    },
  },
  12000: {
    2400: {
      '-20': {
        mp: [18, 17, 16],
        mcp: [64, 59, 53],
        ktas: [133, 127, 121],
        gph: [11.3, 10.5, 9.8],
      },
      0: {
        mp: [18, 17, 16],
        mcp: [61, 56, 51],
        ktas: [133, 127, 120],
        gph: [10.9, 10.2, 9.6],
      },
      20: {
        mp: [18, 17, 16],
        mcp: [59, 54, 50],
        ktas: [133, 126, 119],
        gph: [10.6, 10, 9.3],
      },
    },
    2300: {
      '-20': {
        mp: [18, 17, 16],
        mcp: [61, 56, 52],
        ktas: [131, 125, 118],
        gph: [10.9, 10.2, 9.6],
      },
      0: {
        mp: [18, 17, 16],
        mcp: [59, 54, 50],
        ktas: [130, 124, 118],
        gph: [10.6, 10, 9.3],
      },
      20: {
        mp: [18, 17, 16],
        mcp: [57, 52, 48],
        ktas: [130, 123, 117],
        gph: [10.3, 9.7, 9],
      },
    },
    2200: {
      '-20': {
        mp: [18, 17],
        mcp: [59, 54],
        ktas: [128, 122],
        gph: [10.6, 9.9],
      },
      0: {
        mp: [18, 17],
        mcp: [57, 52],
        ktas: [128, 121],
        gph: [10.3, 9.7],
      },
      20: {
        mp: [18, 17],
        mcp: [55, 50],
        ktas: [127, 121],
        gph: [10, 9.4],
      },
    },
    2100: {
      '-20': {
        mp: [18, 17],
        mcp: [56, 52],
        ktas: [125, 119],
        gph: [10.2, 9.6],
      },
      0: {
        mp: [18, 17],
        mcp: [54, 50],
        ktas: [124, 118],
        gph: [9.9, 9.3],
      },
      20: {
        mp: [18, 17],
        mcp: [52, 48],
        ktas: [123, 117],
        gph: [9.6, 9.1],
      },
    },
    2000: {
      '-20': {
        mp: [19, 18],
        mcp: [57, 53],
        ktas: [126, 121],
        gph: [10.4, 9.8],
      },
      0: {
        mp: [19, 18],
        mcp: [55, 51],
        ktas: [125, 120],
        gph: [10.1, 9.5],
      },
      20: {
        mp: [19, 18],
        mcp: [53, 49],
        ktas: [125, 119],
        gph: [9.8, 9.3],
      },
    },
  },
  14000: {
    2400: {
      '-20': {
        mp: [16, 15],
        mcp: [56, 50],
        ktas: [126, 118],
        gph: [10.1, 9.4],
      },
      0: {
        mp: [16, 15],
        mcp: [53, 48],
        ktas: [125, 117],
        gph: [9.8, 9.1],
      },
      20: {
        mp: [16, 15],
        mcp: [51, 47],
        ktas: [124, 116],
        gph: [9.6, 8.9],
      },
    },
    2300: {
      '-20': {
        mp: [16],
        mcp: [53],
        ktas: [123],
        gph: [9.8],
      },
      0: {
        mp: [16],
        mcp: [51],
        ktas: [122],
        gph: [9.6],
      },
      20: {
        mp: [16],
        mcp: [50],
        ktas: [121],
        gph: [9.3],
      },
    },
    2200: {
      '-20': {
        mp: [16],
        mcp: [51],
        ktas: [120],
        gph: [9.6],
      },
      0: {
        mp: [16],
        mcp: [49],
        ktas: [119],
        gph: [9.3],
      },
      20: {
        mp: [16],
        mcp: [48],
        ktas: [118],
        gph: [9],
      },
    },
    2100: {
      '-20': {
        mp: [16],
        mcp: [49],
        ktas: [116],
        gph: [9.2],
      },
      0: {
        mp: [16],
        mcp: [47],
        ktas: [115],
        gph: [8.9],
      },
      20: {
        mp: [16],
        mcp: [45],
        ktas: [114],
        gph: [8.7],
      },
    },
  },
};

export default cruise;
