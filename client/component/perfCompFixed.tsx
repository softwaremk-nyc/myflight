import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  planes,
  changeBhp,
} from '../redux/planeSlice';
import { RwyComp } from './rwyComp';
import {
  perfFixed,
} from '../selector/perfSelector';

const mapState = (state: RootState) => ({
  bhp: state.plane.bhp,
  perf: perfFixed(planes)(state),
});

const connector = connect(mapState, { changeBhp });
type PerfCompFixedProp = ConnectedProps<typeof connector>;

export const PerfCompFixed = (props: PerfCompFixedProp) => {
  const config = [
    {
      label: 'Climb Time (min)',
      value: props.perf.perfResult.climbTime?.val,
      value2: null,
    },
    {
      label: 'Climb Fuel (gals)',
      value: props.perf.perfResult.climbFuel?.val,
      value2: null,
    },
    {
      label: 'Climb Dist (nm)',
      value: props.perf.perfResult.climbDist?.val,
      value2: null,
    },
    {
      label: 'Cruise RPM',
      value: props.perf.perfResult.cruiseRpm?.val,
      value2: null,
    },
    {
      label: 'Cruise KTAS',
      value: props.perf.perfResult.cruiseKtas?.val,
      value2: null,
    },
    {
      label: 'Cruise GPH',
      value: props.perf.perfResult.cruiseGph?.val,
      value2: null,
    },
    {
      label: 'T/O at ActW / Ldg at MaxW',
      value: props.perf.perfResult.toDist?.val,
      value2: props.perf.perfResult.ldgDist?.val,
    },
    {
      label: 'T/O at ActW / Ldg at MaxW - 50 ft',
      value: props.perf.perfResult.toDist50?.val,
      value2: props.perf.perfResult.ldgDist50?.val,
    },
    {
      label: 'Cruise P Altitude',
      value: props.perf.cruisepAlt,
      value2: null,
    },
    {
      label: 'Total Fuel (gals)',
      value: props.perf.perfResult.totalFuel?.val,
      value2: null,
    },
  ];

  const perfResults = <table className='table table-responsive-sm'>
    <thead>
      <tr>
        <th>Perf</th>
        <th>Start</th>
        <th>Dest</th>
      </tr>
    </thead>
    <tbody className='align-middle'>
      {
        config.map((c, index) => {
          const ldg = c.value2
            ? <td>{c.value2}</td>
            : <td></td>;
          return <tr key={index}>
            <td>
              {c.label}
            </td>
            <td>
              {c.value?.toFixed(1)}
            </td>
            {ldg}
          </tr>;
        })
      }
    </tbody>
  </table>;

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
    {perfResults}
    <RwyComp label='Start' rwyWindInfo={props.perf.startHeadWindInfo}/>
    <RwyComp label='Dest' rwyWindInfo={props.perf.destHeadWindInfo}/>
  </div>;
};

export default connector(PerfCompFixed);
