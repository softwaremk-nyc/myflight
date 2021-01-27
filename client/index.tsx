import React from 'react';
import ReactDOM from 'react-dom';
import { AirportComp } from './component/airportComp';

function AirportCb(airport: string) {
  console.log(airport);
}

ReactDOM.render(
  <div className='input-group mb-3 flex-nowrap'>
    <AirportComp
      float='From'
      airportCb={AirportCb}
      noInfo={false}
    />
    <AirportComp
      float='To'
      airportCb={AirportCb}
      noInfo={true}
    />
  </div>,
  document.getElementById('root'),
);
