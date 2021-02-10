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
            ? <td>{p.cgData.weight}</td>
            : <td><DebounceInput
              type='number'
              debounceTimeout={500}
              className='form-control form-control-sm'
              placeholder='Weight'
              aria-label='Weight'
              value={p.cgData.weight}
              onChange={(event) => {
                const info = Number.isNaN(event.target.valueAsNumber)
                  ? 0
                  : event.target.valueAsNumber;
                props.changeWeight({
                  id: index,
                  weight: info,
                });
              }}
            />
            </td>;
          return <tr key={index}>
            <td>
              {p.name}
            </td>
            {input}
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
    props.cgCalc[2].map((p, index) => <p
      className='text-danger'
      key={index}>
      {p}
    </p>)
  }
</div>;

export default connector(CgComp);
