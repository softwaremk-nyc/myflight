import { RESTDataSource } from 'apollo-datasource-rest';

function metarReducer(metar: any) {
  return {
    icaoId: metar?.station,
    updated: metar?.time?.dt,
    tempDecimal: metar?.remarks_info?.temperature_decimal?.value,
    temp: metar?.temperature?.value,
    altimeter: metar?.altimeter.value,
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

const headers = { headers: { authorization: process.env.avwx_key ?? 'no_key' } };

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
