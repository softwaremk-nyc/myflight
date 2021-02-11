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
import { numberDebounce } from './debounceInputProp';

const mapState = (state: RootState) => ({
  gals: state.plane.gals,
  fuelComp: fuelSelectorForDisplay(planes)(state.plane),
});

const connector = connect(mapState, { changeGals });
type FuelCompProp = ConnectedProps<typeof connector>;

export const FuelComp = (props: FuelCompProp) => <div>
  <table className='table'>
    <thead>
      <tr>
        <th>Fuel</th>
        <th>Gallons</th>
        <th>Max Gallons</th>
      </tr>
    </thead>
    <tbody className='align-middle'>
      {
        props.fuelComp.map((f, index) => {
          const maxGals = f.cgDisplay.maxW
            ? f.cgDisplay.maxW / lbsPerGallonFuel
            : 0;
          return <tr key={index}>
            <td>
              {f.cgDisplay.name}
            </td>
            <td>
              <DebounceInput
                {...numberDebounce(
                  'gals',
                  props.gals[f.id],
                  'Gals',
                  (gal: number) => {
                    props.changeGals({
                      id: f.id,
                      gal,
                    });
                  },
                  0,
                  maxGals,
                )}
              />
            </td>
            <td>
              {maxGals}
            </td>
          </tr>;
        })
      }
    </tbody>
  </table>
</div>;

export default connector(FuelComp);
