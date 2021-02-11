import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { Provider } from 'react-redux';
import FlightTimeComp from './component/flightTimeComp';
import AirportComp from './component/airportComp';
import PlaneSelector from './component/planeSelector';
import CgComp from './component/cgComp';
import FuelComp from './component/fuelComp';
import PerfComp from './component/perfComp';
import Chart from './component/cgChart';
import InputComp from './component/inputComp';
import store from './redux/rootReducer';

const client = new ApolloClient({
  uri: 'graphql/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <div className='col-sm-4 mb-2'>
        <PlaneSelector />
      </div>
      <div className='col-sm-3 mb-2'>
        <InputComp />
      </div>
      <div className='col-sm-8 mb-2'>
        <div className='input-group'>
          <FuelComp />
        </div>
      </div>
      <div className='col-sm-8 mb-2'>
        <div className='input-group'>
          <FlightTimeComp />
        </div>
      </div>
      <div className='col-sm-8 mb-2'>
        <div className='input-group'>
          <AirportComp />
        </div>
      </div>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div className='col-md-6 mb-2'>
        <CgComp />
      </div>
    </div>
  </Provider>,
  document.getElementById('root2'),
);

ReactDOM.render(
  <Provider store={store}>
    <div className='col-lg-8 mb-2'>
      <Chart />
    </div>
  </Provider>,
  document.getElementById('rootChart'),
);

ReactDOM.render(
  <Provider store={store}>
    <div className='col-md-6 mb-2'>
      <PerfComp />
    </div>
  </Provider>,
  document.getElementById('root3'),
);
