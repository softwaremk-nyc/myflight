import React from 'react';

export interface AirportCompProp {
  id: string;
  float: string;
  airportCb: (code: string) => void;
  noInfo: boolean;
}

export const AirportComp = ({
  id,
  float,
  noInfo,
  airportCb,
}: AirportCompProp) => {
  const [airportCode, setAirportCode] = React.useState('');
  const noInfoLabel = noInfo
    ? <label className='mx-2'>{airportCode} information is not available</label>
    : <label />;
  return (
    <div>
      <div className='form-floating mb-2 mx-2'>
        <input
          type='text'
          id={`floatingInput_${id}`}
          maxLength={4}
          className='form-control'
          placeholder='Airport'
          aria-label='Airport'
          onChange={(event) => {
            setAirportCode(event.target.value.toUpperCase());
            airportCb(event.target.value.toUpperCase());
          }}
        />
        <label htmlFor='floatingInput'>{float}</label>
      </div>
      {noInfoLabel}
    </div>
  );
};
