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
  <div className='row'>
    {
      props.configRwy.map((c, index) => (<div key={index} className='col-lg-6 mb-3'>
        <RwyDistComp {...c} />
      </div>
      ))
    }
  </div>
  <div className='row'>
    <div className='col-sm-6 mb-3'>
      <RwyComp
        title='Start'
        colHdr='Rwy'
        rwyWindInfo={props.startHeadWindInfo} />
    </div>
    <div className='col-sm-6 mb-3'>
      <RwyComp
        title='Dest'
        colHdr='Rwy'
        rwyWindInfo={props.destHeadWindInfo} />
    </div>
  </div>
</div>;
