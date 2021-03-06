import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import {
  planes,
  changeMp,
  changeRpm,
  changePowerSetting,
} from '../redux/planeSlice';
import { perfSelector } from '../selector/perfSelector';
import {
  ConfigPerf,
  ConfigRwy,
} from './rwyDistComp';
import { PerfResultsComp } from './perfResultsComp';

const mapState = (state: RootState) => ({
  perf: perfSelector(planes)(state),
});

const connector = connect(mapState, { changeMp, changeRpm, changePowerSetting });
type PerfDataCompProp = ConnectedProps<typeof connector>;

export const PerfDataComp = (props: PerfDataCompProp) => {
  const warningClass = 'text-warning';
  const configPerf: ConfigPerf[] = [
    {
      label: 'Climb Time (min)',
      value: props.perf.perfResult.climbTime?.val,
      class: props.perf.perfResult.climbTime?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'Climb Fuel (gals)',
      value: props.perf.perfResult.climbFuel?.val,
      class: props.perf.perfResult.climbFuel?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'Climb Dist (nm)',
      value: props.perf.perfResult.climbDist?.val,
      class: props.perf.perfResult.climbDist?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'Cruise RPM',
      value: props.perf.perfResult.cruiseRpm?.val,
      class: props.perf.perfResult.cruiseRpm?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'Cruise KTAS',
      value: props.perf.perfResult.cruiseKtas?.val,
      class: props.perf.perfResult.cruiseKtas?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'Cruise GPH',
      value: props.perf.perfResult.cruiseGph?.val,
      class: props.perf.perfResult.cruiseGph?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'Cruise P Altitude',
      value: props.perf.cruisepAlt,
      class: '',
    },
    {
      label: 'Total Fuel (gals)',
      value: props.perf.perfResult.totalFuel?.val,
      class: props.perf.perfResult.totalFuel?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'Accelerate Stop (ft)',
      value: props.perf.perfResult.accelStop?.val,
      class: props.perf.perfResult.accelStop?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'BHP',
      value: props.perf.perfResult.bhp?.val,
      class: props.perf.perfResult.bhp?.extrapolation
        ? warningClass : '',
    },
    {
      label: 'BHP %',
      value: props.perf.perfResult.bhppct?.val,
      class: props.perf.perfResult.bhppct?.extrapolation
        ? warningClass : '',
    },
  ];

  const configRwy: ConfigRwy[] = [
    {
      title: 'TakeOff',
      colHdr: `@ ${props.perf.perfResult.toCalcW} lbs`,
      normal: {
        label: 'Short Field',
        value: props.perf.perfResult.toDist?.val,
        class: props.perf.perfResult.toDist?.extrapolation
          ? warningClass : '',
      },
      fiftyFoot: {
        label: 'Short Field',
        value: props.perf.perfResult.toDist50?.val,
        class: props.perf.perfResult.toDist50?.extrapolation
          ? warningClass : '',
      },
      headWind: props.perf.startMaxHeadwind,
    },
    {
      title: 'Landing',
      colHdr: `@ ${props.perf.perfResult.ldgCalcW} lbs`,
      normal: {
        label: 'Short Field',
        value: props.perf.perfResult.ldgDist?.val,
        class: props.perf.perfResult.ldgDist?.extrapolation
          ? warningClass : '',
      },
      fiftyFoot: {
        label: 'Short Field',
        value: props.perf.perfResult.ldgDist50?.val,
        class: props.perf.perfResult.ldgDist50?.extrapolation
          ? warningClass : '',
      },
      headWind: props.perf.destMaxHeadwind,
    },
  ];

  return <PerfResultsComp
    configRwy={configRwy}
    configPerf={configPerf}
    startHeadWindInfo={props.perf.startHeadWindInfo}
    destHeadWindInfo={props.perf.destHeadWindInfo}
  />;
};

export default connector(PerfDataComp);
