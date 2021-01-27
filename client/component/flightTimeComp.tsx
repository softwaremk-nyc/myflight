import React from 'react';

export interface FlightTimeCompProp {
  flightTimeCb: (time: number) => void;
}

export const FlightTimeComp = ({
  flightTimeCb,
}: FlightTimeCompProp) => <div>
    <table className='table table-responsive-sm'>
      <tbody className='align-middle'>
        <tr>
          <td>
            Cruise Time
          </td>
          <td>
            <div className='input-group'>
              <input
                type='number'
                className='form-control'
                placeholder='Time'
                aria-label='Cruise Time (hours)'
                onChange={(event) => {
                  const val = parseFloat(event.target.value);
                  flightTimeCb(Number.isNaN(val) ? 0 : val);
                }}
              />
              <span className='input-group-text'>Hours</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
