import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { changeBhp } from '../redux/planeSlice';
import { RootState } from '../redux/rootReducer';
import { numberDebounce } from './debounceInputProp';

const mapState = (state: RootState) => ({
  bhp: state.plane.bhp,
});

const connector = connect(mapState, { changeBhp });
type InputFixedCompProp = ConnectedProps<typeof connector>;

export const InputFixedComp = (props: InputFixedCompProp) => <table className='table'>
  <tbody className='align-middle'>
    <tr>
      <td>
        %BHP
    </td>
      <td>
        <DebounceInput
          {...numberDebounce(
            'bhp',
            props.bhp ?? 0,
            '%BHP',
            (bhp: number) => {
              props.changeBhp(bhp);
            },
            0,
            1000,
          )}
        />
      </td>
    </tr>
  </tbody>
</table>;

export default connector(InputFixedComp);
