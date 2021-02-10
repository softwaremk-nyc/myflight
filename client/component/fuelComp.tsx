import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { fuelSelectorForDisplay } from '../selector/planeCgSelector';
import { RootState } from '../redux/rootReducer';
import {
  planes,
  changeGals,
} from '../redux/planeSlice';
import { lbsPerGallonFuel } from '../../perf/perfCommon';

const mapState = (state: RootState) => ({
  gals: state.plane.gals,
  fuelComp: fuelSelectorForDisplay(planes)(state.plane),
});

const connector = connect(mapState, { changeGals });
type FuelCompProp = ConnectedProps<typeof connector>;

export const FuelComp = (props: FuelCompProp) => <table className='table'>
  <thead>
    <tr>
      <th>Fuel</th>
      <th>Gallons</th>
      <th>Max Gallons</th>
    </tr>
  </thead>
  <tbody className='align-middle'>
    {
      props.fuelComp.map((f, index) => <tr key={index}>
        <td>
          {f.cgDisplay.name}
        </td>
        <td>
          <DebounceInput
            type='number'
            debounceTimeout={500}
            className='form-control form-control-sm'
            placeholder='Gals'
            aria-label='Gals'
            value={props.gals[f.id]}
            onChange={(event) => {
              const info = Number.isNaN(event.target.valueAsNumber)
                ? 0
                : event.target.valueAsNumber;
              props.changeGals({
                id: f.id,
                gal: info,
              });
            }}
          />
        </td>
        <td>
          {
            f.cgDisplay.maxW
              ? f.cgDisplay.maxW / lbsPerGallonFuel
              : ''
          }
        </td>
      </tr>)
    }
  </tbody>
</table>;

export default connector(FuelComp);
