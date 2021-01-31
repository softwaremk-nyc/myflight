import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  useQuery,
  gql,
} from '@apollo/client';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  changeInfo,
  copyAirportInfoFromState,
} from '../redux/airportInfoSlice';
// import {
//   pressureAlt,
//   stdTemp,
// } from '../../src/flightcalc';

const STATION_INFO = gql`
  query ($icaoId: String!) {
    station(icaoId: $icaoId) {
      icaoId
      name
      elevation
      runways {
        length_ft
        width_ft
        ident1
        ident2
      }
  }
    metar(icaoId: $icaoId) {
      icaoId
      updated
      temp
      wind {
        direction
        speed
        gust
      }
    }
  }
`;

const mapState = (state: RootState, ownProps: { id: number }) => ({
  airportInfo: state.airportInfo[ownProps.id],
  id: ownProps.id,
});

const connector = connect(mapState, { changeInfo });
type AirportInfoCompProp = ConnectedProps<typeof connector>;

//  export directly for unit-tests
export const AirportInfoComp = (props: AirportInfoCompProp) => {
  const { id, airportInfo } = props;
  const { icaoId } = airportInfo;

  let p: any = null;
  if (icaoId.length < 3) {
    p = <p>Please enter airport id</p>;
  } else {
    const { error, loading, data } = useQuery(STATION_INFO, {
      variables: {
        icaoId,
      },
    });

    useEffect(() => {
      if (data) {
        const info = copyAirportInfoFromState(airportInfo);
        if (info) {
          info.temp = data.metar.temp;
          info.elevation = data.station.elevation;
          info.runways = data.station.runways;
          info.wind.direction = data.metar.wind.direction;
          info.wind.speed = data.metar.wind.speed;
          info.wind.gust = data.metar.wind.gust;
          props.changeInfo({
            id,
            info,
          });
        }
      }
    }, [data]);

    if (loading) {
      p = <p>Loading {icaoId} ...</p>;
    } else if (error) {
      p = <p>No info for {icaoId}</p>;
    } else if (data) {
      p = <p>Loaded {icaoId}</p>;
    }
  }

  const debounceTime = 1000;

  return <div>
    <div className='my-2'>
      {p}
    </div>
    <table className='table table-responsive-sm table-borderless'>
      <tbody>
        <tr>
          <td>
            Elevation (ft)
        </td>
          <td>
            <DebounceInput
              type='number'
              id={`elevation_${id}`}
              maxLength={4}
              debounceTimeout={debounceTime}
              className='form-control form-control-sm'
              placeholder='Elevation (ft)'
              aria-label='Elevation (ft)'
              value={airportInfo.info?.elevation}
              onChange={(event) => {
                const info = copyAirportInfoFromState(airportInfo);
                info.elevation = Number.isNaN(event.target.valueAsNumber)
                  ? 0
                  : event.target.valueAsNumber;
                props.changeInfo({
                  id,
                  info,
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            Temp (c)
        </td>
          <td>
            <DebounceInput
              type='number'
              id={`temp_${id}`}
              maxLength={4}
              debounceTimeout={debounceTime}
              className='form-control form-control-sm'
              placeholder='Temp (c)'
              aria-label='Temp (c)'
              value={airportInfo.info?.temp}
              onChange={(event) => {
                const info = copyAirportInfoFromState(airportInfo);
                info.temp = Number.isNaN(event.target.valueAsNumber)
                  ? 0
                  : event.target.valueAsNumber;
                props.changeInfo({
                  id,
                  info,
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            Wind Dir
        </td>
          <td>
            {airportInfo.info?.wind?.direction ?? 0}
          </td>
        </tr>
        <tr>
          <td>
            Speed (kts)
        </td>
          <td>
            {airportInfo.info?.wind?.speed ?? 0}
          </td>
        </tr>
        <tr>
          <td>
            Gust (kts)
        </td>
          <td>
            {airportInfo.info?.wind?.gust ?? 0}
          </td>
        </tr>
        <tr>
          <td>
            PAltitude (ft)
          </td>
          <td>
            {airportInfo.info?.pAlt}
          </td>
        </tr>
        <tr>
          <td>
            Std Temp Chg (c)
          </td>
          <td>
            {airportInfo.info?.stdTempCorrection}
          </td>
        </tr>
        <tr>
          <td>
            Calc Head Wind (kts)
          </td>
          <td>
            {airportInfo.info?.headWind}
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
};

export default connector(AirportInfoComp);
