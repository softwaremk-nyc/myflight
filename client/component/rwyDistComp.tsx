import React from 'react';

export interface ConfigPerf {
  label: string;
  value: number | undefined;
  class: string;
}

export interface ConfigRwy {
  title: string;
  colHdr: string;
  normal: ConfigPerf,
  fiftyFoot: ConfigPerf,
  headWind: number;
}

export const RwyDistComp = (props: ConfigRwy) => <div>
  <b>{props.title}</b>
  <table className='table'>
    <thead>
      <tr>
        <th>{props.colHdr}</th>
        <th>Dist (ft)</th>
      </tr>
    </thead>
    <tbody className='align-middle'>
      <tr className={props.normal.class}>
        <td>
          {`${props.normal.label}`}
        </td>
        <td>
          {props.normal.value}
        </td>
      </tr>
      <tr className={props.fiftyFoot.class}>
        <td>
          {`${props.fiftyFoot.label} Over 50 ft Obstacle`}
        </td>
        <td>
          {props.fiftyFoot.value}
        </td>
      </tr>
      <tr>
        <td>
          With HeadWind
        </td>
        <td>
          {props.headWind}
        </td>
      </tr>
    </tbody>
  </table>
</div>;
