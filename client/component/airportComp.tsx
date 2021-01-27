import React from 'react';

export interface AirportCompProp {
  float: String;
  airportCb: (code: string) => void;
  noInfo: boolean;
}

export const AirportComp = ({
  float,
  airportCb,
  noInfo,
}: AirportCompProp) => {
  const [airportCode, setAirportCode] = React.useState('');
  const noInfoLabel = noInfo
    ? <label className='mx-2'>Airport {airportCode} information is not available</label>
    : <label />;
  return (
    <div>
      <div className='form-floating mb-3 mx-2'>
        <input
          type='text'
          className='form-control'
          placeholder='Airport'
          onChange={(event) => {
            setAirportCode(event.target.value);
            airportCb(event.target.value);
          }
          }
        />
        <label htmlFor='floatingInput'>{float}</label>
      </div>
      {noInfoLabel}
    </div>
  );
};
