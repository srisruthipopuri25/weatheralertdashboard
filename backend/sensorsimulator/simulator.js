const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
  const data = {
    temperature: random(20, 45),
    humidity: random(30, 90),
    aqi: random(40, 300),
  };

  console.log("Sending sensor data:", data);
  socket.emit("sensor-data", data);
}, 3000);
