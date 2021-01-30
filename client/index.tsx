import React from 'react';
import ReactDOM from 'react-dom';
import {
  configureStore,
} from '@reduxjs/toolkit';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { Provider } from 'react-redux';
import { FlightTimeComp } from './component/flightTimeComp';
import AirportComp from './component/airportComp';
import PlaneSelector from './component/planeSelector';
import reducer from './redux/rootReducer';

const client = new ApolloClient({
  uri: 'graphql/',
  cache: new InMemoryCache(),
});

const store = configureStore({
  reducer,
});

function flightTimeCb(time: number) {
  console.log(time);
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <div>
        <div className='input-group mb-2'>
          <FlightTimeComp flightTimeCb={flightTimeCb} />
        </div>
          <AirportComp />
      </div>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

ReactDOM.render(
  <Provider store={store}>
    <div className='input-group mb-2'>
      <PlaneSelector />
    </div>
  </Provider>,
  document.getElementById('root2'),
);
