import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../redux/rootReducer';
import {
  CgDataEntriesList,
} from '../../src/cg';
import { cgCalcSelector } from './planeCgSelector';
import { perf172 } from '../../perf/c172sp/perf';
import perfPa30 from '../../perf/pa30/perf';
import {
  AirportInfoState,
  RwyInfo,
} from '../redux/airportInfoSlice';
import { AirportInfo } from '../../perf/perfCommon';
import {
  pressureAlt,
  stdTemp,
  windComponent,
} from '../../src/flightcalc';
import {
  C172SP,
  PA30,
  powerSettings,
  PlaneSelectionState,
} from '../redux/planeSlice';

export interface RwyWindInfo {
  [rwy: string]: number;
}

const calcHeadWind = (
  runways: RwyInfo[],
  speed: number,
  direction: number,
) => {
  const hwList: RwyWindInfo = {};
  runways.forEach((r) => {
    const res1 = windComponent(
      speed,
      direction,
      Number.parseInt(r.ident1, 10),
    );
    const res2 = windComponent(
      speed,
      direction,
      Number.parseInt(r.ident2, 10),
    );
    [hwList[r.ident1]] = res1;
    [hwList[r.ident2]] = res2;
  });
  return hwList;
};

const headWindInfo = (
  airportInfoState: AirportInfoState,
) => calcHeadWind(
  airportInfoState.info.runways,
  airportInfoState.info.wind.speed ?? 0,
  airportInfoState.info.wind.direction ?? 0,
);

const pAlt = (
  airportInfoState: AirportInfoState,
) => pressureAlt(
  airportInfoState.info.elevation,
  airportInfoState.info.altimeter,
);

const perfParams = (
  airportInfo: AirportInfoState[],
  indicatedAlt: number,
) => {
  const startState = airportInfo[0];
  const destState = airportInfo[1];

  const startpAlt = pAlt(startState);
  const destpAlt = pAlt(destState);

  const startHeadWindInfo = headWindInfo(
    startState,
  );
  const destHeadWindInfo = headWindInfo(
    destState,
  );

  const startMaxHeadwind = Math.max(...Object.values(startHeadWindInfo));
  const destMaxHeadwind = Math.max(...Object.values(destHeadWindInfo));

  const start: AirportInfo = {
    pAlt: startpAlt,
    temp: startState.info.temp,
    stdTempCorrection: startState.info.temp - stdTemp(startpAlt),
    headWind: startMaxHeadwind,
    isPaved: true,
  };
  const dest: AirportInfo = {
    pAlt: destpAlt,
    temp: destState.info.temp,
    stdTempCorrection: destState.info.temp - stdTemp(destpAlt),
    headWind: destMaxHeadwind,
    isPaved: true,
  };

  const cruisepAlt = pressureAlt(
    indicatedAlt,
    startState.info.altimeter,
  );

  return {
    startState,
    destState,
    startpAlt,
    destpAlt,
    startHeadWindInfo,
    destHeadWindInfo,
    startMaxHeadwind,
    destMaxHeadwind,
    start,
    dest,
    cruisepAlt,
  };
};

export const perfFixed = (planes: CgDataEntriesList) => createSelector(
  [
    (state: RootState) => state.plane,
    (state: RootState) => state.airportInfo,
    (state: RootState) => cgCalcSelector(planes)(state.plane),
  ],
  (planeState: PlaneSelectionState, airportInfo: AirportInfoState[], [cgData]) => {
    const p = perfParams(
      airportInfo,
      planeState.flightAltitude ?? 0,
    );
    return {
      perfResult: perf172(
        planeState.bhp ?? 0,
        cgData.weight,
        p.start,
        p.dest,
        p.cruisepAlt,
        planeState.flightTime ?? 0,
      ),
      startHeadWindInfo: p.startHeadWindInfo,
      startMaxHeadwind: p.startMaxHeadwind,
      destHeadWindInfo: p.destHeadWindInfo,
      destMaxHeadwind: p.destMaxHeadwind,
      cruisepAlt: p.cruisepAlt,
    };
  },
);

export const perfVariable = (planes: CgDataEntriesList) => createSelector(
  [
    (state: RootState) => state.plane,
    (state: RootState) => state.airportInfo,
    (state: RootState) => cgCalcSelector(planes)(state.plane),
  ],
  (planeState: PlaneSelectionState, airportInfo: AirportInfoState[], [cgData]) => {
    const p = perfParams(
      airportInfo,
      planeState.flightAltitude ?? 0,
    );
    return {
      perfResult: perfPa30(
        planeState.mp ?? 0,
        planeState.rpm ?? 0,
        cgData.weight,
        p.start,
        p.dest,
        p.cruisepAlt,
        planeState.flightTime ?? 0,
        planeState.powerSetting
          ? planeState.powerSetting.indexOf(powerSettings[0]) !== -1
          : true,
      ),
      startHeadWindInfo: p.startHeadWindInfo,
      startMaxHeadwind: p.startMaxHeadwind,
      destHeadWindInfo: p.destHeadWindInfo,
      destMaxHeadwind: p.destMaxHeadwind,
      cruisepAlt: p.cruisepAlt,
    };
  },
);

export const perfSelector = (planes: CgDataEntriesList) => createSelector(
  [
    (state: RootState) => state,
  ],
  (state: RootState) => {
    if (state.plane.planeType === C172SP) {
      return perfFixed(planes)(state);
    }
    if (state.plane.planeType === PA30) {
      return perfVariable(planes)(state);
    }
    throw Error(`Unknown type ${state.plane.planeType} for performance calculation`);
  },
);
