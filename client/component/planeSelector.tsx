import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  changeType,
  changeId,
  planes,
  PlaneSelectionState,
} from '../redux/planeSlice';
import planeIdsSelector from '../selector/planeIdsSelector';
import { RootState } from '../redux/rootReducer';

const mapState = (state: RootState) => {
  const planeState: PlaneSelectionState = state.plane;
  const { planeTypes, planeType, planeId } = planeState;

  return {
    planeTypes,
    planeIds: planeIdsSelector(planes)(state.plane),
    planeType,
    planeId,
  };
};

const connector = connect(mapState, { changeType, changeId });
type PlaneSelectorProp = ConnectedProps<typeof connector>;

//  export directly for unit-tests
export const PlaneSelector = (props: PlaneSelectorProp) => <table className='table table-responsive-sm table-borderless w-25'>
  <tbody>
    <tr>
      <td>
        Type:
      </td>
      <td>
        <select
          data-testid='planeType'
          onChange={(event) => {
            const newVal = event.target.value;
            props.changeType(newVal);
          }}
        >
          {
            props.planeTypes.map((type) => <option key={type} value={type}>
              {type}
            </option>)
          }
        </select>
      </td>
      <td>
        Registration:
          </td>
      <td>
        <select
          data-testid='planeId'
          onChange={(event) => {
            const newVal = event.target.value;
            props.changeId(newVal);
          }}
        >
          {
            props.planeIds.map((id) => <option key={id} value={id}>
              {id}
            </option>)
          }
        </select>
      </td>
    </tr>
  </tbody>
</table>;

export default connector(PlaneSelector);
