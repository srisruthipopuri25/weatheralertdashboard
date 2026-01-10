# 🌦️ Weather Alert Dashboard with IoT, AI & Real-Time Visualization

## Overview

The **Weather Alert Dashboard** is a full-stack application that monitors real-time weather conditions using **IoT sensor data**, detects anomalies, and sends **SMS alerts** via Twilio when abnormal patterns occur. Sensor data is stored in **MongoDB**, analyzed using **rule-based logic and OpenAI**, and visualized on a live dashboard using **Recharts with updates**.

This project showcases the integration of **IoT systems, real-time data pipelines, AI-assisted anomaly analysis, and interactive data visualization**.

---

## Key Features

- **IoT Sensor Data Generation**

- Weather-related IoT sensor data (temperature, humidity, pressure, etc.) is generated continuously.
- Data is ingested by the backend every second.

- **MongoDB Storage**

  - All sensor readings are persisted in MongoDB.
  - Supports historical analysis and anomaly tracking.

- **Anomaly Detection**

  - Threshold-based and pattern-based anomaly detection.
  - Identifies abnormal weather conditions in near real time.

- **AI-Powered Anomaly Suggestions (OpenAI)**

  - Detected anomalies are sent to OpenAI.
  - AI provides contextual explanations and possible causes for anomalies.

- **SMS Alert System**

  - SMS alerts are triggered immediately when anomalies are detected.
  - Ensures rapid notification of critical weather conditions.

- **Real-Time Dashboard with Recharts**

  - Uses **Recharts** to visualize sensor data on charts and maps.
  - Dashboard updates **every few seconds** to reflect the latest IoT readings.
  - Enables live monitoring of weather trends and anomaly spikes.

- **Dockerized Deployment**

  - Fully containerized using Docker and Docker Compose.
  - Easy setup and consistent runtime environment.

---

## Tech Stack

### Frontend

- React
- Socket
- **Recharts** (real-time charts and map visualization)
- JavaScript / HTML / CSS

### Backend

- Node.js
- twilio
- Sockets
- REST APIs for data ingestion and alert processing

### Database

- **MongoDB** – stores IoT sensor data and anomaly logs

### AI & Alerts

- **OpenAI API** – anomaly interpretation and suggestions
- SMS service -Twilio

### DevOps

- Docker
- Docker Compose

---

## System Workflow

1. IoT sensors generate weather data every second.
2. Backend receives and stores data in MongoDB.
3. Anomaly detection logic evaluates incoming data in real time.
4. If an anomaly is detected:

   - SMS alert is sent immediately.
   - Sensor data is analyzed by OpenAI for intelligent insights.

5. Recharts dashboard updates every second to display:

   - Live sensor readings
   - Trends and anomalies
   - AI-suggested interpretations

---

## Project Structure

```
weatheralertdashboard/
│
├── frontend/          # React dashboard with Recharts
├── backend/           # APIs, anomaly detection, OpenAI & SMS logic
├── docker-compose.yml # Container
├── README.md          # Project documentation
```

---

## Installation & Setup

### Prerequisites

- Docker & Docker Compose
- MongoDB
- OpenAI API Key
- SMS service credentials

### Run Locally

```bash
git clone https://github.com/srisruthipopuri25/weatheralertdashboard.git
cd weatheralertdashboard
docker-compose up --build
```

---

## Environment Variables

```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
SMS_API_KEY=your_sms_provider_key
```
