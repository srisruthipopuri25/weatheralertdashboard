"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SensorCharts({ data }) {
  return (
    <div className="card">
      <h2> Live Sensor Data</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />

          <Line dataKey="temperature" />
          <Line dataKey="humidity" />
          <Line dataKey="aqi" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
