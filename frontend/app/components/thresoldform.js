"use client";

import { useState } from "react";
import api from "@/app/lib/axios";

export default function ThresholdForm() {
  const [form, setForm] = useState({
    temperature: "",
    humidity: "",
    aqi: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRules = async () => {
    try {
      await api.post("/api/rules", form);
      alert("Threshold rules updated successfully");
    } catch (error) {
      alert("Failed to update rules");
    }
  };

  return (
    <div className="card">
      <h2>Threshold Rules</h2>

      <input
        name="temperature"
        placeholder="Max Temperature"
        value={form.temperature}
        onChange={handleChange}
      />

      <input
        name="humidity"
        placeholder="Min Humidity"
        value={form.humidity}
        onChange={handleChange}
      />

      <input
        name="aqi"
        placeholder="Max AQI"
        value={form.aqi}
        onChange={handleChange}
      />

      <button onClick={submitRules}>Save Rules</button>
    </div>
  );
}
