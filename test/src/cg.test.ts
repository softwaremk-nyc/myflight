import {
  calcCG,
  calcCGForWeights,
  CgDataEntry,
  flattenCgDataEntries,
  flattenCgDataEntriesByName,
} from '../../src/cg';
import c172sp from '../../perf/c172sp/cg';
import pa30 from '../../perf/pa30/cg';

describe('center of gravity calculation', () => {
  test('empty CgData provided', () => {
    const cgData = calcCG([]);
    expect(cgData).toEqual({ weight: 0, arm: 0, moment: 0 });
  });

  test('moment is filled in on calc call', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 2, arm: 2, moment: 4 });
  });

  //  2.333... rounded to 2.3
  test('cg arm is calculated and rounded down to 1 decimal place', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
      { weight: 3, arm: 3, moment: 0 },
      { weight: 1, arm: 1, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 6, arm: 2.3, moment: 14 });
  });

  //  2.75 rounded to 2.8
  test('cg arm is calculated and rounded up to 1 decimal place', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
      { weight: 3, arm: 3, moment: 0 },
      { weight: 3, arm: 3, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 8, arm: 2.8, moment: 22 });
  });

  test('cg ignores zero weights', () => {
    const cgData = calcCG([
      { weight: 2, arm: 2, moment: 0 },
      { weight: 0, arm: 3, moment: 0 },
      { weight: 1, arm: 2, moment: 0 },
    ]);
    expect(cgData).toEqual({ weight: 3, arm: 2, moment: 6 });
  });
});

describe('calculate overall a/c cg and check overweight warnings', () => {
  let base: CgDataEntry[];
  let noMaxWComp: CgDataEntry[];
  let maxWComp: CgDataEntry[];
  beforeEach(() => {
    base = [
      {
        name: 'Top',
        cgData: { weight: 0, arm: 1, moment: 0 },
        maxW: null,
        comps: null,
        notes: null,
      },
    ];

    noMaxWComp = [
      {
        name: 'CompNoMaxW',
        cgData: { weight: 0, arm: 10, moment: 0 },
        maxW: null,
        comps: [
          {
            name: 'Sub1',
            cgData: { weight: 0, arm: 2, moment: 0 },
            maxW: 1,
            comps: null,
            notes: null,
          },
          {
            name: 'Sub3',
            cgData: { weight: 0, arm: 3, moment: 0 },
            maxW: 3,
            comps: null,
            notes: null,
          },
        ],
        notes: null,
      },
    ];

    maxWComp = [
      {
        name: 'CompMaxW',
        cgData: null,
        maxW: 5,
        comps: [
          {
            name: 'Sub4',
            cgData: { weight: 0, arm: 4, moment: 0 },
            maxW: 4,
            comps: null,
            notes: null,
          },
          {
            name: 'Sub5',
            cgData: { weight: 0, arm: 5, moment: 0 },
            maxW: 5,
            comps: null,
            notes: null,
          },
        ],
        notes: null,
      },
    ];
  });

  test('fills in the max single weight', () => {
    expect(base[0].cgData?.weight).toEqual(0);
    const [, , warnings] = calcCGForWeights(
      'ac',
      [1],
      base,
    );
    expect(base[0].cgData?.weight).toEqual(1);
    expect(warnings.length).toEqual(0);
  });

  test('recursive fill in weights and register sub-component overweight warning', () => {
    base[0].comps = noMaxWComp;
    const [, , warnings] = calcCGForWeights(
      'ac',
      [1, 2, 3, 4],
      base,
    );

    expect(warnings[0].indexOf('\'Sub1\' weight at 3 exceeds maximum') !== -1).toBeTruthy();
    expect(warnings[1].indexOf('\'Sub3\' weight at 4 exceeds maximum') !== -1).toBeTruthy();
    expect(warnings.length).toEqual(2);
  });

  test('recursive fill in weights and register parent/sub-component overweight warning', () => {
    base[0].comps = maxWComp;
    const [, , warnings] = calcCGForWeights(
      'ac',
      [1, 5, 6],
      base,
    );

    expect(warnings[0].indexOf('\'Sub4\' weight at 5 exceeds maximum') !== -1).toBeTruthy();
    expect(warnings[1].indexOf('\'Sub5\' weight at 6 exceeds maximum') !== -1).toBeTruthy();
    expect(warnings[2].indexOf('\'CompMaxW\' weight at 11 exceeds maximum') !== -1).toBeTruthy(); // 5+6
    expect(warnings.length).toEqual(3);
  });

  test('nested recursive fill in weights and register parent/sub-component overweight warning', () => {
    //  silence linter
    if (maxWComp[0].comps) {
      maxWComp[0].comps[1].comps = noMaxWComp;
    }
    base[0].comps = maxWComp;
    const [, , warnings] = calcCGForWeights(
      'ac',
      [1, 3, 2, 4, 5],
      base,
    );

    expect(warnings.length).toEqual(3);
    expect(warnings[0].indexOf('\'Sub1\' weight at 5 exceeds maximum') !== -1).toBeTruthy();
    expect(warnings[1].indexOf('\'Sub5\' weight at 11 exceeds maximum') !== -1).toBeTruthy(); // 2+5+4
    expect(warnings[2].indexOf('\'CompMaxW\' weight at 14 exceeds maximum') !== -1).toBeTruthy(); // 3+[11]
  });

  test('flatten test', () => {
    base[0].comps = noMaxWComp;
    const resultByName = flattenCgDataEntriesByName(base);
    const result = flattenCgDataEntries(base);

    expect(resultByName.length).toEqual(result.length);

    expect(resultByName).toEqual(
      [
        { name: 'Top', cgData: { weight: 0, arm: 1, moment: 0 } },
        { name: 'CompNoMaxW', cgData: { weight: 0, arm: 10, moment: 0 } },
        { name: 'Sub1', cgData: { weight: 0, arm: 2, moment: 0 } },
        { name: 'Sub3', cgData: { weight: 0, arm: 3, moment: 0 } },
      ],
    );
    expect(result).toEqual(
      [
        { weight: 0, arm: 1, moment: 0 },
        { weight: 0, arm: 10, moment: 0 },
        { weight: 0, arm: 2, moment: 0 },
        { weight: 0, arm: 3, moment: 0 },
      ],
    );
  });
});

test('sample c172sp cg calculation', () => {
  const testPlane = c172sp.N5255R;
  //  weights
  //  total weight
  //  expected error message
  const tests = [
    [
      //  normal cg calc
      [-1, 150, 110, 110, 15, 30, 20, 318],
      { weight: 2465.1, arm: 45, moment: 110988.3 },
      [],
    ],
    [
      //  fuel overweight
      [-1, 150, 110, 110, 15, 30, 20, 319],
      { weight: 2466.1, arm: 45, moment: 111036.3 },
      ['\'Fuel\' weight at 319 exceeds maximum weight'],
    ],
    [
      //  baggage 1 overweight
      [-1, 150, 110, 110, 15, 121, 0, 318],
      { weight: 2536.1, arm: 46.2, moment: 117173.3 },
      [
        '\'Baggage Compartment 1\' weight at 121',
        '\'Baggage Compartment Total\' weight at 121',
      ],
    ],
    [
      //  baggage 2 overweight
      [-1, 150, 110, 110, 15, 0, 80, 318],
      { weight: 2495.1, arm: 46.3, moment: 115518.3 },
      [
        '\'Baggage Compartment 2\' weight at 80',
      ],
    ],
    [
      //  overall aircraft
      [-1, 150, 210, 110, 15, 70, 50, 318],
      { weight: 2635.1, arm: 46.4, moment: 122178.3 },
      [
        '\'N5255R\' weight at 2635.1 exceeds maximum weight',
      ],
    ],
  ];

  tests.forEach((test) => {
    //  [cgCalc, flat, warnings]
    const [cgCalc, , warnings] = calcCGForWeights(
      testPlane[0].name,
      test[0] as number[],
      testPlane,
    );

    expect(cgCalc).toEqual(test[1] as object);
    expect(warnings.length).toEqual((test[2] as string[]).length);

    let w = 0;
    (test[2] as string[]).forEach((err) => {
      expect(warnings[w].indexOf(err) !== -1).toBeTruthy();
      w += 1;
    });

    // console.log(flattenCgDataEntries(testPlane));
    // console.log(cgCalc);
    // console.log(flat);
    // console.log(warnings);
  });
});

test('sample pa30 cg calculation', () => {
  const testPlane = pa30.N7943Y;
  //  weights
  //  total weight
  //  expected error message
  const tests = [
    [
      //  normal cg calc
      [-1, 150, 150, 10, 0, 0, 324, 180],
      { weight: 3394, arm: 85, moment: 288546.4 },
      [],
    ],
    [
      //  main fuel overweight
      [-1, 150, 150, 10, 0, 0, 325, 180],
      { weight: 3395, arm: 85, moment: 288636.4 },
      ['\'Fuel\' weight at 325 exceeds maximum weight'],
    ],
    [
      //  aux fuel overweight
      [-1, 150, 150, 10, 0, 0, 324, 181],
      { weight: 3395, arm: 85, moment: 288641.4 },
      ['\'Fuel - Aux\' weight at 181 exceeds maximum weight'],
    ],
    [
      //  overall aircraft
      [-1, 150, 200, 10, 0, 200, 324, 180],
      { weight: 3644, arm: 88.1, moment: 321186.4 },
      ['\'N7943Y\' weight at 3644 exceeds maximum weight'],
    ],
  ];

  tests.forEach((test) => {
    //  [cgCalc, flat, warnings]
    const [cgCalc, , warnings] = calcCGForWeights(
      testPlane[0].name,
      test[0] as number[],
      testPlane,
    );

    expect(cgCalc).toEqual(test[1] as object);
    expect(warnings.length).toEqual((test[2] as string[]).length);

    let w = 0;
    (test[2] as string[]).forEach((err) => {
      expect(warnings[w].indexOf(err) !== -1).toBeTruthy();
      w += 1;
    });

    // console.log(flattenCgDataEntries(testPlane));
    // console.log(cgCalc);
    // console.log(flat);
    // console.log(warnings);
  });
});
