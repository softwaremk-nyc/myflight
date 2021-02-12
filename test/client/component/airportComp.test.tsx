import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { AirportComp } from '../../../client/component/airportComp';
import store from '../../../client/redux/rootReducer';

afterEach(cleanup);

it('invokes cb if input text is changed - returns uppercase', async () => {
  const changeIcaoId = jest.fn();
  const testProp: any = {
    airportInfo: [
      { icaoId: '', label: '1', info: null },
      { icaoId: '', label: '2', info: null },
    ],
    changeIcaoId,
  };

  //  provider for any nested components not under test
  render(
    <Provider store={store}>
      <AirportComp {...testProp} />
    </Provider>,
  );

  const inputs = screen.getAllByPlaceholderText(/Airport/i);
  expect(inputs.length).toEqual(2);

  fireEvent.change(inputs[0], {
    target: { id: 0, value: 'myAirport' },
  });

  //  debounced - initially no call
  expect(changeIcaoId.mock.calls.length).toEqual(0);

  //  then a call
  await new Promise((r) => setTimeout(r, 2001));
  expect(changeIcaoId.mock.calls.length).toEqual(1);
  expect(changeIcaoId.mock.calls[0][0]).toEqual({ id: 0, icaoId: 'MYAIRPORT' });
});
