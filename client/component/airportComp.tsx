import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import { changeIcaoId } from '../redux/airportInfoSlice';

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
        type='text'
        id={`label_${index}`}
        minLength={3}
        maxLength={4}
        debounceTimeout={2000}
        className='form-control'
        placeholder='Airport'
        aria-label='Airport'
        onChange={(event) => {
          props.changeIcaoId({
            id: index,
            icaoId: event.target.value.toUpperCase(),
          });
        }}
      />
      <label htmlFor={`label_${index}`}>{info.label}</label>
    </div>
    ))
  }
</div>;

export default connector(AirportComp);
