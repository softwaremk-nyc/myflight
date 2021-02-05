import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  planes,
  changeMp,
  changeRpm,
  changePowerSetting,
} from '../redux/planeSlice';
import { perfVariable } from '../selector/perfSelector';
import {
  ConfigPerf,
  ConfigRwy,
} from './rwyDistComp';
import { PerfResultsComp } from './perfResultsComp';

const mapState = (state: RootState, ownProps: { powerSettings: string[] }) => ({
  mp: state.plane.mp,
  rpm: state.plane.rpm,
  powerSettings: ownProps.powerSettings,
  perf: perfVariable(planes)(state),
});

const connector = connect(mapState, { changeMp, changeRpm, changePowerSetting });
type PerfCompVariableProp = ConnectedProps<typeof connector>;

export const PerfCompVariable = (props: PerfCompVariableProp) => {
  const warningClass = 'text-warning';
  const configPerf: ConfigPerf[] = [
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
      title: 'Take off At Actual Weight',
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
      title: 'Landing At Actual Weight',
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

  return <div>
  <table className='table table-responsive-sm'>
    <tbody className='align-middle'>
      <tr>
        <td>
          Manifold Pressure
      </td>
        <td>
          <DebounceInput
            type='number'
            debounceTimeout={500}
            className='form-control form-control-sm'
            placeholder='Manifold Pressure'
            aria-label='Manifold Pressure'
            value={props.mp}
            onChange={(event) => {
              const info = Number.isNaN(event.target.valueAsNumber)
                ? 0
                : event.target.valueAsNumber;
              props.changeMp(info);
            }}
          />
        </td>
      </tr>
      <tr>
        <td>
          RPM
      </td>
        <td>
          <DebounceInput
            type='number'
            debounceTimeout={500}
            className='form-control form-control-sm'
            placeholder='RPM'
            aria-label='RPM'
            value={props.rpm}
            onChange={(event) => {
              const info = Number.isNaN(event.target.valueAsNumber)
                ? 0
                : event.target.valueAsNumber;
              props.changeRpm(info);
            }}
          />
        </td>
      </tr>
      <tr>
        <td>
          Power Setting
        </td>
        <td>
          <select
            data-testid='powerSetting'
            onChange={(event) => {
              const newVal = event.target.value;
              props.changePowerSetting(newVal);
            }}
          >
            {
              props.powerSettings.map((p, index) => <option key={index}
                value={p}>{p}</option>)
            }
          </select>
        </td>
      </tr>
    </tbody>
  </table>
    {<PerfResultsComp
      configRwy={configRwy}
      configPerf={configPerf}
      startHeadWindInfo={props.perf.startHeadWindInfo}
      destHeadWindInfo={props.perf.destHeadWindInfo}
    />}
  </div>;
};

export default connector(PerfCompVariable);
