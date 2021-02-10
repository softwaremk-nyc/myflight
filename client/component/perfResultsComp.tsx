import React from 'react';
import { RwyWindInfo } from '../selector/perfSelector';
import { RwyComp } from './rwyComp';
import {
  ConfigRwy,
  ConfigPerf,
  RwyDistComp,
} from './rwyDistComp';

export interface PerfResultsCompProp {
  configPerf: ConfigPerf[];
  configRwy: ConfigRwy[];
  startHeadWindInfo: RwyWindInfo;
  destHeadWindInfo: RwyWindInfo;
}

export const PerfResultsComp = (props: PerfResultsCompProp) => <div>
  <table className='table'>
    <thead>
      <tr>
        <th>Perf</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody className='align-middle'>
      {
        props.configPerf.map((c, index) => <tr
          key={index}
          className={c.class}>
          <td>
            {c.label}
          </td>
          <td>
            {c.value?.toFixed(1)}
          </td>
        </tr>)
      }
    </tbody>
  </table>
  {
    props.configRwy.map((c, index) => <RwyDistComp key={index} {...c} />)
  }
  <RwyComp label='Start' rwyWindInfo={props.startHeadWindInfo} />
  <RwyComp label='Dest' rwyWindInfo={props.destHeadWindInfo} />
</div>;
