import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { AirportComp } from '../../../client/component/airportComp';

afterEach(cleanup);

it('test', () => {
  console.log('test');
});

// it('invokes cb if input text is changed - returns uppercase', async () => {
//   const changeIcaoId = jest.fn();
//   const testProp: any = {
//     airportInfo: [
//       { icaoId: '', label: '1', info: null },
//       { icaoId: '', label: '2', info: null },
//     ],
//     changeIcaoId,
//   }
//   render(
//     <AirportComp {...testProp} />
//   );

//   const inputs = screen.getAllByPlaceholderText(/Airport/i);
//   expect(inputs.length).toEqual(2);

//   fireEvent.change(inputs[0], {
//     target: { id: 0, value: 'myAirport' },
//   })

//   //  debounced - initially no call
//   expect(changeIcaoId.mock.calls.length).toEqual(0);

//   //  then a call
//   await (setTimeout(() => {
//     expect(changeIcaoId.mock.calls.length).toEqual(1);
//     expect(changeIcaoId.mock.calls[0][0]).toEqual('MYAIRPORT');
//   }, 2500));
// });
