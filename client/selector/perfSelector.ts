import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../redux/rootReducer';
import {
  CgDataEntriesList,
} from '../../src/cg';
import { cgCalcSelector } from './planeCgSelector';
import { perf172 } from '../../perf/c172sp/perf';
// import perfPa30 from '../../perf/pa30';
import { AirportInfoState } from '../redux/airportInfoSlice';
import { AirportInfo } from '../../perf/perfCommon';
import {
  pressureAlt,
  stdTemp,
  windComponent,
} from '../../src/flightcalc';
import { PlaneSelectionState } from '../redux/planeSlice';

export const calcHeadWind = (
  runways: { ident1: string, ident2: string }[],
  speed: number,
  direction: number,
) => {
  const hwList: { [rwy: string]: number } = {};
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

export const perfFixed = (planes: CgDataEntriesList) => createSelector(
  [
    (state: RootState) => state.plane,
    (state: RootState) => state.airportInfo,
    (state: RootState) => cgCalcSelector(planes)(state.plane),
  ],
  (planeState: PlaneSelectionState, airportInfo: AirportInfoState[], [cgData]) => {
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
      planeState.flightAltitude ?? 0,
      startState.info.altimeter,
    );
    return {
      perfResult: perf172(
        planeState.bhp ?? 0,
        cgData.weight,
        start,
        dest,
        cruisepAlt,
        planeState.flightTime ?? 0,
      ),
      startHeadWindInfo,
      startMaxHeadwind,
      destHeadWindInfo,
      destMaxHeadwind,
      cruisepAlt,
    };
  },
);

// export const perfVariable = createSelector(

// );
