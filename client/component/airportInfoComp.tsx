import React from 'react';
import { Connect } from 'react-redux';
import { AirportInfo } from '../../perf/perfCommon';
import {
  useQuery,
  gql,
} from '@apollo/client';

const METAR = gql`
  query {
    metar(icaoId: "kcdw") {
      icaoId
      updated
      wind {
        direction
        speed
        gust
      }
    }
  }
`;

//  export directly for unit-tests
export const AirportWeather = () => {

};

