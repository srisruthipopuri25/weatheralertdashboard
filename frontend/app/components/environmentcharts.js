'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function EnvironmentalChart({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line dataKey="temperature" stroke="red" />
      <Line dataKey="humidity" stroke="blue" />
      <Line dataKey="aqi" stroke="green" />
    </LineChart>
  );
}
