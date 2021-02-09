import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  planes,
  changeBhp,
} from '../redux/planeSlice';
import { perfSelector } from '../selector/perfSelector';
import {
  ConfigPerf,
  ConfigRwy,
} from './rwyDistComp';
import { PerfResultsComp } from './perfResultsComp';

const mapState = (state: RootState) => ({
  bhp: state.plane.bhp,
  perf: perfSelector(planes)(state),
});

const connector = connect(mapState, { changeBhp });
type PerfFixedCompProp = ConnectedProps<typeof connector>;

export const PerfFixedComp = (props: PerfFixedCompProp) => {
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
      title: 'Landing At Max Weight',
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
            %BHP
          </td>
          <td>
            <DebounceInput
              type='number'
              debounceTimeout={500}
              className='form-control form-control-sm'
              placeholder='%BHP'
              aria-label='%BHP'
              value={props.bhp}
              onChange={(event) => {
                const info = Number.isNaN(event.target.valueAsNumber)
                  ? 0
                  : event.target.valueAsNumber;
                props.changeBhp(info);
              }}
            />
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

export default connector(PerfFixedComp);
