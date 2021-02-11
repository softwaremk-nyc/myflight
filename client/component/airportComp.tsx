import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import { changeIcaoId } from '../redux/airportInfoSlice';
import AirportInfoComp from './airportInfoComp';
import { textDebounce } from './debounceInputProp';

const mapState = (state: RootState) => ({
  airportInfo: state.airportInfo,
});

const connector = connect(mapState, { changeIcaoId });
type AirportCompProp = ConnectedProps<typeof connector>;

//  export directly for unit tests
export const AirportComp = (props: AirportCompProp) => <div
  className='input-group mb-2 flex-nowrap'>
  {
    props.airportInfo.map((info, index) => (<div
      key={`key_${index}`}
      className='form-floating mb-2 mx-2'>
      <DebounceInput
        { ...textDebounce(
          `label_${index}`,
          'Airport',
          3,
          4,
          (icaoId: string) => {
            props.changeIcaoId({
              id: index,
              icaoId,
            });
          },
        )}
      />
      <label htmlFor={`label_${index}`}>{info.label}</label>
      <AirportInfoComp key={`key_${index}`} id={index} />
    </div>
    ))
  }
</div>;

export default connector(AirportComp);
