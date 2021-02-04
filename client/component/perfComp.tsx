import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import PerfCompFixed from './perfCompFixed';
import PerfCompVariable from './perfCompVariable';

const mapState = (state: RootState) => ({
  type: state.plane.planeType,
});

const connector = connect(mapState);
type PerfCompProp = ConnectedProps<typeof connector>;

export const PerfComp = (props: PerfCompProp) => {
  if (props.type === 'C172SP') {
    return <PerfCompFixed />;
  }
  if (props.type === 'PA30') {
    return <PerfCompVariable />;
  }

  return <p>Unknown type: {props.type}</p>;
};

export default connector(PerfComp);
