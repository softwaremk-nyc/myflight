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
import store from './redux/rootReducer';

const client = new ApolloClient({
  uri: 'graphql/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <div>
        <div className='input-group mb-2'>
          <FlightTimeComp />
        </div>
        <AirportComp />
      </div>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div className='mb-2'>
        <PlaneSelector />
      </div>
      <FuelComp />
      <CgComp />
    </div>
  </Provider>,
  document.getElementById('root2'),
);

ReactDOM.render(
  <Provider store={store}>
    <div>
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
