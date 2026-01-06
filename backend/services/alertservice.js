const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports.sendSMS = async (msg) => {
  await client.messages.create({
    body: msg,
    from: process.env.TWILIO_NUMBER,
    to: process.env.USER_NUMBER
  });
};
