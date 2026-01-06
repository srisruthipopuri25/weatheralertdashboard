"use client";

export default function AlertsPanel({ alerts }) {
  return (
    <div className="card">
      <h2> Alerts</h2>

      {alerts.length === 0 && <p>No alerts yet</p>}

      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className="alert">
            <strong>{alert.metric}</strong> – {alert.message}
            <div className="time">{alert.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
