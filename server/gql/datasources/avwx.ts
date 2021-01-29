import { RESTDataSource } from 'apollo-datasource-rest';

function metarReducer(metar: any) {
  return {
    icaoId: metar?.station,
    updated: metar?.time?.dt,
    temp: metar?.temperature?.value,
    wind: {
      direction: metar?.wind_direction?.value,
      speed: metar?.wind_speed?.value,
      gust: metar?.wind_gust?.value,
    },
  };
}

function stationReducer(station: any) {
  return {
    icaoId: station?.icao,
    name: station?.name,
    elevation: station?.elevation_ft,
    runways: station?.runways,
  };
}

const headers = { headers: { authorization: '6YmlPMkVB6QG7tRus879TCJTbkgKq_edlH6U3vwUi0s' } };

export default class AvwxApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://avwx.rest/api/';
  }

  async getMetarById({ icaoId }: { [icaoId: string]: string }) {
    const res = await this.get(`metar/${icaoId}`, undefined, headers);
    return metarReducer(res);
  }

  async getStationById({ icaoId }: { [icaoId: string]: string }) {
    const res = await this.get(`station/${icaoId}`, undefined, headers);
    return stationReducer(res);
  }
}
