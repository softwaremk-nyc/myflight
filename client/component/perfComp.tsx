import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import PerfFixedComp from './perfFixedComp';
import PerfVariableComp from './perfVariableComp';
import {
  PA30,
  C172SP,
} from '../redux/planeSlice';

const mapState = (state: RootState) => ({
  type: state.plane.planeType,
});

const connector = connect(mapState);
type PerfCompProp = ConnectedProps<typeof connector>;

export const PerfComp = (props: PerfCompProp) => {
  if (props.type === C172SP) {
    return <PerfFixedComp />;
  }
  if (props.type === PA30) {
    return <PerfVariableComp/>;
  }

  return <p>Unknown type: {props.type}</p>;
};

export default connector(PerfComp);
