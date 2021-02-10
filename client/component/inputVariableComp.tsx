import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import {
  changeMp,
  changeRpm,
  changePowerSetting,
} from '../redux/planeSlice';
import { RootState } from '../redux/rootReducer';

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
