import React from 'react';
import { RwyWindInfo } from '../selector/perfSelector';

export interface RwyCompProp {
  title: string;
  colHdr: string;
  rwyWindInfo: RwyWindInfo;
}

export const RwyComp = (props: RwyCompProp) => <div>
  <b>{props.title}</b>
  <table className='table'>
    <thead>
      <tr>
        <th>{props.colHdr}</th>
        <th>HeadWind</th>
      </tr>
    </thead>
    <tbody className='align-middle'>
      {
        Object.keys(props.rwyWindInfo).map((c, index) => <tr key={index}>
          <td>
            {c}
          </td>
          <td>
            {props.rwyWindInfo[c]}
          </td>
        </tr>)
      }
    </tbody>
  </table>
</div>;
