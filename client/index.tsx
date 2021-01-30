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
import { AirportComp } from './component/airportComp';
import { FlightTimeComp } from './component/flightTimeComp';
import PlaneSelector from './component/planeSelector';
import reducer from './redux/planeSlice';

const client = new ApolloClient({
  uri: 'graphql/',
  cache: new InMemoryCache(),
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

function flightTimeCb(time: number) {
  console.log(time);
}

function airportCb(airport: string) {
  console.log(airport);
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
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
