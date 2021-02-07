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
import { perfSelector } from '../selector/perfSelector';

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
  cgCalc: cgCalcSelector(planes)(state.plane),
  cgCalcEnd: cgCalcSelector(
    planes,
    perfSelector(planes)(state).perfResult.totalFuel?.val,
  )(state.plane),
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
