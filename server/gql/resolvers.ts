const resolvers = {
  Query: {
    metar: (_: any, { icaoId }: any, { dataSources }: any) => dataSources.avwxApi.getMetarById(
      { icaoId },
    ),
    station: (_: any, { icaoId }: any, { dataSources }: any) => dataSources.avwxApi.getStationById(
      { icaoId },
    ),
  },
};

export default resolvers;
