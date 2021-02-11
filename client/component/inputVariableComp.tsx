import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import {
  changeMp,
  changeRpm,
  changePowerSetting,
} from '../redux/planeSlice';
import { RootState } from '../redux/rootReducer';
import { numberDebounce } from './debounceInputProp';

const mapState = (state: RootState, ownProps: { powerSettings: string[] }) => ({
  mp: state.plane.mp,
  rpm: state.plane.rpm,
  powerSettings: ownProps.powerSettings,
});

const connector = connect(mapState, {
  changeMp,
  changeRpm,
  changePowerSetting,
});
type InputVariableCompProp = ConnectedProps<typeof connector>;

export const InputVariableComp = (props: InputVariableCompProp) => <table className='table'>
  <tbody className='align-middle'>
    <tr>
      <td>
        Manifold Pressure
  </td>
      <td>
        <DebounceInput
          {...numberDebounce(
            'manifoldp',
            props.mp ?? 0,
            'Manifold Pressure',
            (mp: number) => {
              props.changeMp(mp);
            },
            0,
            30,
          )}
        />
      </td>
    </tr>
    <tr>
      <td>
        RPM
  </td>
      <td>
        <DebounceInput
          {...numberDebounce(
            'rpm',
            props.rpm ?? 0,
            'RPM',
            (rpm: number) => {
              props.changeRpm(rpm);
            },
            0,
            5000,
          )}
        />
      </td>
    </tr>
    <tr>
      <td>
        Power Setting
    </td>
      <td>
        <select
          data-testid='powerSetting'
          onChange={(event) => {
            const newVal = event.target.value;
            props.changePowerSetting(newVal);
          }}
        >
          {
            props.powerSettings.map((p, index) => <option key={index}
              value={p}>{p}</option>)
          }
        </select>
      </td>
    </tr>
  </tbody>
</table>;

export default connector(InputVariableComp);
