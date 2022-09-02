import React, { PureComponent } from 'react';
import './Recharts.less';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '20:06',
    BRL: 1,
    USD: 5,
  },
  {
    name: '20:06',
    BRL: 1,
    USD: 5.5,
  },
  {
    name: '20:05',
    BRL: 1,
    USD: 4.92,
  },
  {
    name: '20:04',
    BRL: 1,
    USD: 4.7,
  },
  {
    name: '20:03',
    BRL: 1,
    USD: 6,
  },
];

export default class Recharts extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';

  render() {
    return (
      <ResponsiveContainer width={'100%'} height={'40%'}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 50,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="BRL" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="USD" stroke="#303030" fill="#5da980" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
