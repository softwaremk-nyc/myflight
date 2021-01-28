import React from 'react';
import ReactDOM from 'react-dom';
import { AirportComp } from './component/airportComp';
import { FlightTimeComp } from './component/flightTimeComp';
import { PlaneSelector } from './component/planeSelector';

function flightTimeCb(time: number) {
  console.log(time);
}

function airportCb(airport: string) {
  console.log(airport);
}

function planeTypeCb(type: string) {
  console.log(`${type}`);
}

function planeIdCb(id: string) {
  console.log(`${id}`);
}

ReactDOM.render(
  <div>
    <div className='input-group mb-2'>
      <FlightTimeComp flightTimeCb={flightTimeCb} />
    </div>
    <div className='input-group mb-2 flex-nowrap'>
      <AirportComp
        id='1'
        float='From'
        noInfo={false}
        airportCb={airportCb}
      />
      <AirportComp
        id='2'
        float='To'
        noInfo={true}
        airportCb={airportCb}
      />
    </div>
  </div>,
  document.getElementById('root'),
);

ReactDOM.render(
  <div className='input-group mb-2'>
    <PlaneSelector
      types={['aaa', 'bbb']}
      ids={['cc', 'dd']}
      planeTypeCb={planeTypeCb}
      planeIdCb={planeIdCb}
    />
  </div>,
  document.getElementById('root2'),
);
