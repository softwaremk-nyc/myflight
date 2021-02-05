import React from 'react';

export interface RwyDistCompProp {
  title: string,
  normal: {
    label: string,
    dist: number | undefined,
  },
  fiftyFoot: {
    label: string,
    dist: number | undefined,
  },
  headWind: number,
}

export const RwyDistComp = (props: RwyDistCompProp) => <div>
  <table className='table table-responsive-sm'>
    <thead>
      <tr>
        <th>{props.title}</th>
        <th>Distance (ft)</th>
      </tr>
    </thead>
    <tbody className='align-middle'>
      <tr>
        <td>
          {`${props.normal.label}`}
        </td>
        <td>
          {props.normal.dist}
        </td>
      </tr>
      <tr>
        <td>
          {`${props.fiftyFoot.label} Over 50 ft Obstacle`}
        </td>
        <td>
          {props.fiftyFoot.dist}
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
