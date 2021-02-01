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
    <div className='input-group mb-2'>
      <PlaneSelector />
    </div>
  </Provider>,
  document.getElementById('root2'),
);
