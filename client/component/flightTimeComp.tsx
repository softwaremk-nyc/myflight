import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import { changeFlightTime } from '../redux/planeSlice';

const mapState = (state: RootState) => ({
  flightTime: state.plane.flightTime,
});

const connector = connect(mapState, { changeFlightTime });
type FlightTimeCompProp = ConnectedProps<typeof connector>;

export const FlightTimeComp = (props: FlightTimeCompProp) => <div>
    <table className='table table-responsive-sm table-borderless'>
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
      </tbody>
    </table>
  </div>;

export default connector(FlightTimeComp);
