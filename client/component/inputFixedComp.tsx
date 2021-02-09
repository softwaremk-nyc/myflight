import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { changeBhp } from '../redux/planeSlice';
import { RootState } from '../redux/rootReducer';

const mapState = (state: RootState) => ({
  bhp: state.plane.bhp,
});

const connector = connect(mapState, { changeBhp });
type InputFixedCompProp = ConnectedProps<typeof connector>;

export const InputFixedComp = (props: InputFixedCompProp) => <table className='table table-responsive-sm'>
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
</table>;

export default connector(InputFixedComp);
