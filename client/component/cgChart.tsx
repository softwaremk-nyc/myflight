import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  connect,
  ConnectedProps,
} from 'react-redux';
import { RootState } from '../redux/rootReducer';
import {
  cgGraphSelector,
  cgCalcSelector,
} from '../selector/planeCgSelector';
import {
  planes,
} from '../redux/planeSlice';
import { perfSelectorFuelGalsRequired } from '../selector/perfSelector';

const cgGraph = {
  C172SP: {
    datasets: [
      {
        label: 'C172S - Utility',
        data: [
          { x: 35, y: 1500 },
          { x: 35, y: 1950 },
          { x: 37.5, y: 2200 },
          { x: 40.5, y: 2200 },
          { x: 40.5, y: 1500 },
          { x: 35, y: 1500 },
        ],
        showLine: true,
        lineTension: 0,
        backgroundColor: 'White',
      },
      {
        label: 'C172S - Normal',
        data: [
          { x: 35, y: 1500 },
          { x: 35, y: 1950 },
          { x: 41, y: 2550 },
          { x: 47.3, y: 2550 },
          { x: 47.3, y: 1500 },
          { x: 35, y: 1500 },
        ],
        showLine: true,
        lineTension: 0,
        backgroundColor: 'Azure',
      },
    ],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 1400,
            suggestedMax: 2600,
          },
        }],
        xAxes: [{
          ticks: {
            suggestedMin: 34,
            suggestedMax: 48,
          },
        }],
      },
    },
  },
  C182Q: {
    datasets: [
      {
        label: 'C182Q - Normal',
        data: [
          { x: 33, y: 1800 },
          { x: 33, y: 2250 },
          { x: 39.5, y: 2950 },
          { x: 48.5, y: 2950 },
          { x: 48.5, y: 1800 },
          { x: 33, y: 1800 },
        ],
        showLine: true,
        lineTension: 0,
        backgroundColor: 'Azure',
      },
    ],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 1600,
            suggestedMax: 3100,
          },
        }],
        xAxes: [{
          ticks: {
            suggestedMin: 32,
            suggestedMax: 50,
          },
        }],
      },
    },
  },
  C182T: {
    datasets: [
      {
        label: 'C182T - NO AUTOPILOT',
        data: [
          { x: 33, y: 1800 },
          { x: 33, y: 2230 },
          { x: 34, y: 2400 },
          { x: 34, y: 1800 },
          { x: 33, y: 1800 },
        ],
        showLine: true,
        lineTension: 0,
        backgroundColor: 'White',
      },
      {
        label: 'C182T - Normal Max Landing',
        data: [
          { x: 34, y: 2400 },
          { x: 35.8, y: 2710 },
          { x: 39, y: 2950 },
          { x: 46, y: 2950 },
          { x: 46, y: 1800 },
          { x: 34, y: 1800 },
        ],
        showLine: true,
        lineTension: 0,
        backgroundColor: 'Azure',
      },
      {
        label: 'C182T - Normal Takeoff',
        data: [
          { x: 39, y: 2950 },
          { x: 40.8, y: 3100 },
          { x: 46, y: 3100 },
          { x: 46, y: 2950 },
          { x: 39, y: 2950 },
        ],
        showLine: true,
        lineTension: 0,
        backgroundColor: 'Ivory',
      },
    ],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 1600,
            suggestedMax: 3200,
          },
        }],
        xAxes: [{
          ticks: {
            suggestedMin: 32,
            suggestedMax: 48,
          },
        }],
      },
    },
  },
  PA30: {
    datasets: [
      {
        label: 'PA30 - Normal',
        data: [
          { x: 81, y: 2300 },
          { x: 81, y: 2450 },
          { x: 83, y: 3200 },
          { x: 86.5, y: 3600 },
          { x: 92, y: 3600 },
          { x: 92, y: 2300 },
          { x: 81, y: 2300 },
        ],
        showLine: true,
        lineTension: 0,
        backgroundColor: 'Azure',
      },
    ],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 2200,
            suggestedMax: 3700,
          },
        }],
        xAxes: [{
          ticks: {
            suggestedMin: 80,
            suggestedMax: 93,
          },
        }],
      },
    },
  },
};

const mapState = (state: RootState) => ({
  ds: cgGraphSelector(cgGraph)(state.plane),
  cgCalcEnd: cgCalcSelector(
    planes,
    perfSelectorFuelGalsRequired(planes)(state),
  )(state.plane),
  cgCalc: cgCalcSelector(planes)(state.plane),
});

const connector = connect(mapState);
type ChartProp = ConnectedProps<typeof connector>;

const Chart = (props: ChartProp) => {
  const { ds } = props;
  const datasets = ds.datasets.concat([
    {
      label: 'My Flight',
      data: [
        { x: props.cgCalc[0].arm, y: props.cgCalc[0].weight },
        { x: props.cgCalcEnd[0].arm, y: props.cgCalcEnd[0].weight },
      ],
      showLine: true,
      lineTension: 0,
      fill: false,
      backgroundColor: 'Green',
    },
  ]);
  const data = {
    datasets,
  };
  return <Scatter data={data} options={ds.options} />;
};

export default connector(Chart);
