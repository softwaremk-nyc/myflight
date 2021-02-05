import React from 'react';

export interface RwyDistCompProp {
  title: string,
  normal: {
    label: string,
    dist: number | undefined,
    class: string,
  },
  fiftyFoot: {
    label: string,
    dist: number | undefined,
    class: string,
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
      <tr className={props.normal.class}>
        <td>
          {`${props.normal.label}`}
        </td>
        <td>
          {props.normal.dist}
        </td>
      </tr>
      <tr className={props.fiftyFoot.class}>
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
