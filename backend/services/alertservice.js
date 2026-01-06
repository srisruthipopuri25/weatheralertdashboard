const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(message) {
  if (!process.env.TWILIO_PHONE || !process.env.ALERT_PHONE) {
    console.error('Twilio env variables missing');
    return;
  }

  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: process.env.ALERT_PHONE,
    });

    console.log('SMS sent:', res.sid);
  } catch (err) {
    console.error('Twilio error:', err.message);
  }
}

module.exports = { sendSMS };
