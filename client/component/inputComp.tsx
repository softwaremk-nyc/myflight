import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import InputFixedComp from './inputFixedComp';
import InputVariableComp from './inputVariableComp';
import {
  PA30,
  C172SP,
  C182Q,
  C182T,
  powerSettings,
} from '../redux/planeSlice';

const mapState = (state: RootState) => ({
  type: state.plane.planeType,
});

const connector = connect(mapState);
type InputCompProp = ConnectedProps<typeof connector>;

export const InputComp = (props: InputCompProp) => {
  if (props.type === C172SP) {
    return <InputFixedComp />;
  }
  if (props.type === PA30
    || props.type === C182Q
    || props.type === C182T) {
    return <InputVariableComp powerSettings={powerSettings} />;
  }

  return <p>Unknown type: {props.type}</p>;
};

export default connector(InputComp);
