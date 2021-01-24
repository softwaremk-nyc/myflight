const resolvers = require('../../../server/gql/resolvers');

describe('Query:metar + Query.station', () => {
  const mockContext = {
    dataSources: {
      avwxApi: {
        getMetarById: jest.fn(),
        getStationById: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    mockContext.dataSources.avwxApi.getMetarById.mockClear();
    mockContext.dataSources.avwxApi.getStationById.mockClear();
  });

  const { getMetarById, getStationById } = mockContext.dataSources.avwxApi;
  const expectedRes = { bleh: 1 };

  it('calls for metar with given icaoId', async () => {
    getMetarById.mockReturnValueOnce(expectedRes);

    const param = { icaoId: 'blehid' };
    const res = await resolvers.Query.metar(null, param, mockContext);

    expect(res).toEqual(expectedRes);
    expect(getMetarById.mock.calls[0][0]).toEqual(param);
  });

  it('calls for metar with undefined icaoId if parameter is not provided', async () => {
    getMetarById.mockReturnValueOnce(expectedRes);

    const param = { unknown: 'blehid1' };
    const res = await resolvers.Query.metar(null, param, mockContext);

    expect(res).toEqual(expectedRes);
    expect(getMetarById.mock.calls[0][0].icaoId).not.toBeDefined();
  });

  it('calls for station with given icaoId', async () => {
    getStationById.mockReturnValueOnce(expectedRes);

    const param = { icaoId: 'blehid' };
    const res = await resolvers.Query.station(null, param, mockContext);

    expect(res).toEqual(expectedRes);
    expect(getStationById.mock.calls[0][0]).toEqual(param);
  });

  it('calls for station with undefined icaoId if parameter is not provided', async () => {
    getStationById.mockReturnValueOnce(expectedRes);

    const param = { unknown: 'blehid1' };
    const res = await resolvers.Query.station(null, param, mockContext);

    expect(res).toEqual(expectedRes);
    expect(getStationById.mock.calls[0][0].icaoId).not.toBeDefined();
  });
});
