require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const SensorData = require('./models/sensordata');
const Rule = require('./models/rule');
const detectAnomaly = require('./services/anamolyservice');
const { sendSMS } = require('./services/alertservice');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

setInterval(async () => {
  const payload = {
    temperature: random(20, 45),
    humidity: random(30, 90),
    aqi: random(50, 250),
    timestamp: new Date(),
  };

  await SensorData.create(payload);

  io.emit('sensorData', payload);

  const rules = await Rule.find();

  for (const rule of rules) {
    const value = payload[rule.metric];

    if (value < rule.min || value > rule.max) {
      const alert = {
        message: `${rule.metric.toUpperCase()} threshold breached: ${value}`,
        metric: rule.metric,
        value,
        timestamp: new Date(),
      };

      io.emit('alert', alert);
      await sendSMS(alert.message);
    }
  }
}, 5000);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.use('/api/anomaly', require('./routes/anamolyRoutes'));

server.listen(5000, () => console.log('Server running on 5000'));
