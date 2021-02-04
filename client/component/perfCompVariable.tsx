import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  changeMp,
  changeRpm,
} from '../redux/planeSlice';

const mapState = (state: RootState) => ({
  mp: state.plane.mp,
  rpm: state.plane.rpm,
});

const connector = connect(mapState, { changeMp, changeRpm });
type PerfCompVariableProp = ConnectedProps<typeof connector>;

export const PerfCompVariable = (props: PerfCompVariableProp) => <div>
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
    </tbody>
  </table>
</div>;

export default connector(PerfCompVariable);
