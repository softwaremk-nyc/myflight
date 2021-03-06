import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import PerfDataComp from './perfDataComp';
import {
  PA30,
  C172SP,
  C182Q,
  C182T,
} from '../redux/planeSlice';

const mapState = (state: RootState) => ({
  type: state.plane.planeType,
});

const connector = connect(mapState);
type PerfCompProp = ConnectedProps<typeof connector>;

export const PerfComp = (props: PerfCompProp) => {
  if (props.type === C172SP
    || props.type === PA30
    || props.type === C182Q
    || props.type === C182T) {
    return <PerfDataComp />;
  }

  return <p>Unknown type: {props.type}</p>;
};

export default connector(PerfComp);
