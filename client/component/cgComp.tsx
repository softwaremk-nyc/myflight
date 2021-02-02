import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { cgSelectorByName } from '../selector/planeCgSelector';
import { planes } from '../redux/planeSlice';

const mapState = (state: RootState) => ({
  cgData: cgSelectorByName(planes)(state.plane),
});

const connector = connect(mapState);
type CgCompProp = ConnectedProps<typeof connector>;

//  direct export for unit testing
export const CgComp = (props: CgCompProp) => <div>
<table className='table table-responsive-sm table-borderless'>
  <tbody className='align-middle'>
      {
        props.cgData.map((p, index) => (<tr key={index}>
          <td>
            {p.name}
          </td>
        </tr>))
      }
  </tbody>
</table>
</div>;

export default connector(CgComp);
