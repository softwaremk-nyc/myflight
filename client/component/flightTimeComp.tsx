import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  changeFlightTime,
  changeFlightAltitude,
  planes,
} from '../redux/planeSlice';
import { perfSelectorFuelGalsRequired } from '../selector/perfSelector';
import { lbsPerGallonFuel } from '../../perf/perfCommon';
import { weightFromGals } from '../selector/planeCgSelector';

const mapState = (state: RootState) => ({
  flightTime: state.plane.flightTime,
  flightAltitude: state.plane.flightAltitude,
  totalFuelWReq: perfSelectorFuelGalsRequired(planes)(state) * lbsPerGallonFuel,
  totalFuelWAvail: weightFromGals(planes)(state.plane)
    .reduce((prev, curr) => prev + curr.weight, 0),
});

const connector = connect(mapState, { changeFlightTime, changeFlightAltitude });
type FlightTimeCompProp = ConnectedProps<typeof connector>;

export const FlightTimeComp = (props: FlightTimeCompProp) => {
  const warnings = props.totalFuelWReq > props.totalFuelWAvail
    ? <h5 className='text-danger'>Insufficient fuel available for this flight</h5>
    : null;

  return <div>
    {warnings}
    <table className='table table-borderless'>
      <tbody className='align-middle'>
        <tr>
          <td>
            Cruise Time
          </td>
          <td>
            <div className='input-group'>
              <DebounceInput
                type='number'
                debounceTimeout={500}
                className='form-control form-control-sm'
                placeholder='Time'
                aria-label='Cruise Time (hours)'
                value={props.flightTime}
                onChange={(event) => {
                  const info = Number.isNaN(event.target.valueAsNumber)
                    ? 0
                    : event.target.valueAsNumber;
                  props.changeFlightTime(info);
                }}
              />
              <span className='input-group-text'>Hours</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            Cruise Altitude
          </td>
          <td>
            <div className='input-group'>
              <DebounceInput
                type='number'
                debounceTimeout={500}
                className='form-control form-control-sm'
                placeholder='Altitude'
                aria-label='Cruise Altitude (ft)'
                value={props.flightAltitude}
                onChange={(event) => {
                  const info = Number.isNaN(event.target.valueAsNumber)
                    ? 0
                    : event.target.valueAsNumber;
                  props.changeFlightAltitude(info);
                }}
              />
              <span className='input-group-text'>Ft</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
};

export default connector(FlightTimeComp);
