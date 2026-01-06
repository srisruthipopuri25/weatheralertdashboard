'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import EnvironmentalChart from '@/app/components/environmentcharts';

const socket = io('http://localhost:5000');

export default function Home() {
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on('sensorData', (d) => {
      setData((prev) => [...prev, d].slice(-20));
    });

    socket.on('alert', (a) => {
      console.log('🚨 Alert received:', a);
    });

    socket.on('alert', (a) => setAlerts((prev) => [a, ...prev].slice(0, 5)));

    return () => {
      socket.off('sensorData');
      socket.off('alert');
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Environmental Dashboard</h1>

      {data.length > 0 ? (
        <EnvironmentalChart data={data} />
      ) : (
        <p className="mt-4 text-gray-500">Waiting for sensor data...</p>
      )}

      <h2 className="mt-4 font-bold">Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map((a, i) => (
          <div key={i} className="text-red-600">
            {a.reason || a.message}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No alerts</p>
      )}
    </div>
  );
}
