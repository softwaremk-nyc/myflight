import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  cgSelectorForDisplay,
  cgCalcSelector,
} from '../selector/planeCgSelector';
import {
  planes,
  changeWeight,
} from '../redux/planeSlice';
import { numberDebounce } from './debounceInputProp';

const mapState = (state: RootState) => ({
  cgData: cgSelectorForDisplay(planes)(state.plane),
  cgCalc: cgCalcSelector(planes)(state.plane),
});

const connector = connect(mapState, { changeWeight });
type CgCompProp = ConnectedProps<typeof connector>;

//  direct export for unit testing
export const CgComp = (props: CgCompProp) => <div>
  <table className='table'>
    <thead>
      <tr>
        <th>Component</th>
        <th>Weight (lbs)</th>
        <th>Arm (in)</th>
        <th>Moment</th>
      </tr>
    </thead>
    <tbody className='align-middle'>
      {
        props.cgData.map((p, index) => {
          const input = index === 0 || p.name.indexOf('Fuel') !== -1
            ? p.cgData.weight
            : <DebounceInput
              {...numberDebounce(
                `${index}`,
                p.cgData.weight,
                'Weight',
                (weight: number) => {
                  props.changeWeight({
                    id: index,
                    weight,
                  });
                },
                0,
                10000,
              )}
            />;
          return <tr key={index}>
            <td>
              {p.name}
            </td>
            <td>
              {input}
            </td>
            <td>
              {index === 0 ? p.cgData.arm.toFixed(1) : p.cgData.arm}
            </td>
            <td>
              {p.cgData.moment}
            </td>
          </tr>;
        })
      }
      {
        <tr>
          <td>
            <b>Total</b>
          </td>
          <td>
            {props.cgCalc[0].weight}
          </td>
          <td>
            {props.cgCalc[0].arm}
          </td>
          <td>
            {props.cgCalc[0].moment}
          </td>
        </tr>
      }
    </tbody>
  </table>
  {
    props.cgCalc[2].map((p, index) => <h5
      className='text-danger'
      key={index}>
      {p}
    </h5>)
  }
</div>;

export default connector(CgComp);
