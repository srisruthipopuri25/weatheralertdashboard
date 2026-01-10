const OpenAI = require('openai');
const SensorData = require('../models/sensordata');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function detectAnomaly() {
  const history = await SensorData.find()
    .sort({ timestamp: -1 })
    .limit(30)
    .lean();

  if (history.length < 10) return null;

  try {
    const prompt = `
Analyze historical environmental sensor data.
Detect anomalies, trends, or abnormal spikes.

Respond ONLY in JSON:
{
  "isAnomaly": true | false,
  "reason": "short reason",
  "severity": "low | medium | high"
}

Data:
${JSON.stringify(history)}
`;

    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(res.choices[0].message.content);
  } catch (err) {
    console.error('OpenAI error:', err.message);
    return null;
  }
};
