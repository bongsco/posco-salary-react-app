import React from 'react';
import { Chart } from 'react-google-charts';

export default function CustomTimeLine() {
  const columns = [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'string', label: 'Resource' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
  ];

  const rows = [
    [
      '2014Spring',
      'Spring 2014',
      'spring',
      new Date(2014, 2, 22),
      new Date(2014, 5, 20),
      null,
      100,
      null,
    ],
    [
      '2014Summer',
      'Summer 2014',
      'summer',
      new Date(2014, 5, 21),
      new Date(2014, 8, 20),
      null,
      100,
      null,
    ],
    [
      '2014Autumn',
      'Autumn 2014',
      'autumn',
      new Date(2014, 8, 21),
      new Date(2014, 11, 20),
      null,
      100,
      null,
    ],
  ];

  const data = [columns, ...rows];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
    />
  );
}
