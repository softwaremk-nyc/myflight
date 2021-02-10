import React, { useEffect } from 'react';
import { connect, ConnectedProps, batch } from 'react-redux';
import {
  useQuery,
  gql,
} from '@apollo/client';
import { DebounceInput } from 'react-debounce-input';
import { RootState } from '../redux/rootReducer';
import {
  changeElevation,
  changeTemp,
  changeAltimeter,
  changeRunways,
  changeWindDirection,
  changeWindSpeed,
  changeWindGust,
  changeUpdated,
} from '../redux/airportInfoSlice';

export const STATION_INFO = gql`
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
      tempDecimal
      temp
      altimeter
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

const connector = connect(mapState, {
  changeElevation,
  changeTemp,
  changeAltimeter,
  changeRunways,
  changeWindDirection,
  changeWindSpeed,
  changeWindGust,
  changeUpdated,
});
type AirportInfoCompProp = ConnectedProps<typeof connector>;

//  export directly for unit-tests
export const AirportInfoComp = (props: AirportInfoCompProp) => {
  const { id, airportInfo } = props;
  const { icaoId } = airportInfo;

  let p: any = null;
  let b: any = null;
  if (icaoId.length < 3) {
    p = <p className='text-muted'>Please enter airport id</p>;
  } else {
    const {
      error,
      loading,
      data,
      refetch,
    } = useQuery(STATION_INFO, {
      variables: {
        icaoId,
      },
    });

    useEffect(() => {
      if (data) {
        batch(() => {
          props.changeElevation({
            id,
            elevation: data.station.elevation,
          });
          props.changeTemp({
            id,
            temp: data.metar.tempDecimal || data.metar.temp,
          });
          props.changeAltimeter({
            id,
            altimeter: data.metar.altimeter,
          });
          props.changeRunways({
            id,
            runways: data.station.runways,
          });
          props.changeWindDirection({
            id,
            windDirection: data.metar.wind.direction,
          });
          props.changeWindSpeed({
            id,
            windSpeed: data.metar.wind.speed,
          });
          props.changeWindGust({
            id,
            windGust: data.metar.wind.gust,
          });
          props.changeUpdated({
            id,
            updated: data.metar.updated,
          });
        });
      }
    }, [data]);

    if (loading) {
      p = <p className='text-warning'>Loading {icaoId} ...</p>;
    } else if (error) {
      p = <p className='text-danger'>No info for {icaoId}</p>;
    } else if (data) {
      p = <p className='text-success'>Loaded {icaoId}</p>;
      const mins = (
        (new Date().valueOf() - new Date(props.airportInfo.info.updated).valueOf())
        / 1000
        / 60
      );

      b = (
        <button
          type='button'
          className='btn btn-outline-secondary btn-sm'
          onClick={() => (mins > 55 ? refetch() : 0)}
        >
          Update METAR
        </button>
      );
    }
  }

  const debounceTime = 1000;
  const config = [
    {
      label: 'Elevation (ft)',
      allowEdit: true,
      onChange: props.changeElevation,
      value: props.airportInfo.info.elevation,
      prop: 'elevation',
      maxLen: 5,
    },
    {
      label: 'Temp (c)',
      allowEdit: true,
      onChange: props.changeTemp,
      value: props.airportInfo.info.temp,
      prop: 'temp',
      maxLen: 4,
    },
    {
      label: 'Altimeter',
      allowEdit: true,
      onChange: props.changeAltimeter,
      value: props.airportInfo.info.altimeter,
      prop: 'altimeter',
      maxLen: 5,
    },
    {
      label: 'Direction',
      allowEdit: false,
      onChange: props.changeWindDirection,
      value: props.airportInfo.info.wind.direction ?? 0,
      prop: 'windDirection',
      maxLen: 4,
    },
    {
      label: 'Speed (kts)',
      allowEdit: false,
      onChange: props.changeWindSpeed,
      value: props.airportInfo.info.wind.speed ?? 0,
      prop: 'windSpeed',
      maxLen: 4,
    },
    {
      label: 'Gust (kts)',
      allowEdit: false,
      onChange: props.changeWindGust,
      value: props.airportInfo.info.wind.gust ?? 0,
      prop: 'windGust',
      maxLen: 4,
    },
    {
      label: 'Updated',
      allowEdit: false,
      onChange: props.changeUpdated,
      value: new Date(props.airportInfo.info.updated).toLocaleString(),
      prop: 'updated',
      maxLen: 4,
    },
  ];

  return <div>
    <div className='my-2'>
      {p}
    </div>
    <table className='table'>
      <tbody className='align-middle'>
        {
          config.map((c, index) => {
            const input = c.allowEdit === false
              ? c.value
              : <DebounceInput
                type='number'
                id={`${c.prop}_${id}`}
                maxLength={c.maxLen}
                debounceTimeout={debounceTime}
                className='form-control form-control-sm'
                placeholder={`${c.label}`}
                aria-label={`${c.label}`}
                value={c.value}
                onChange={(event) => {
                  const info = Number.isNaN(event.target.valueAsNumber)
                    ? 0
                    : event.target.valueAsNumber;
                  c.onChange({
                    id,
                    [c.prop]: info,
                  });
                }}
              />;

            return <tr key={`${index}`}>
              <td>
                {c.label}
              </td>
              <td>
                {input}
              </td>
            </tr>;
          })
        }
      </tbody>
    </table>
    {b}
  </div>;
};

export default connector(AirportInfoComp);
