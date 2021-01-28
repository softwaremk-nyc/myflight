import React from 'react';

export interface PlaneSelectorProp {
  types: string[],
  ids: string[];
  planeTypeCb: (type: string) => void;
  planeIdCb: (type: string) => void;
}

export const PlaneSelector = ({
  types,
  ids,
  planeTypeCb,
  planeIdCb,
}: PlaneSelectorProp) => {
  const [, setPlaneType] = React.useState(types[0]);
  const [, setPlaneId] = React.useState(ids[0]);

  return (
    <table className='table table-responsive-sm table-borderless w-25'>
      <tbody>
        <tr>
          <td>
            Type:
          </td>
          <td>
            <select
              data-testid='planeType'
              onChange={(event) => {
                const newVal = event.target.value;
                setPlaneType(newVal);
                planeTypeCb(newVal);
              }}
            >
              {
                types.map((type) => <option key={type} value={type}>
                  {type}
                </option>)
              }
            </select>
          </td>
          <td>
            Registration:
          </td>
          <td>
            <select
              data-testid='planeId'
              onChange={(event) => {
                const newVal = event.target.value;
                setPlaneId(newVal);
                planeIdCb(newVal);
              }}
            >
              {
                ids.map((id) => <option key={id} value={id}>
                  {id}
                </option>)
              }
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
