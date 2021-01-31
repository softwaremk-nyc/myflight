import { gql } from 'apollo-server';

const typeDefs = gql`
  type Wind {
    direction: Int,
    speed: Int,
    gust: Int,
  }

  type Weather {
    icaoId: String,
    updated: String,
    tempDecimal: Float,
    temp: Int,
    altimeter: Float,
    wind: Wind,
  }

  type Runway {
    length_ft: Int,
    width_ft: Int,
    ident1: String,
    ident2: String,
  }

  type Station {
    icaoId: String,
    name: String,
    elevation: Int,
    runways: [Runway],
  }

  type Query {
    metar(icaoId: String!): Weather,
    station(icaoId: String!): Station,
  }
`;

export default typeDefs;
