const OpenAI = require('openai');
const SensorData = require('../models/sensordata');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let lastRun = 0; // rate-limit AI calls

module.exports = async function detectAnomaly(currentData) {
  // -----------------------------
  // 1️⃣ SIMPLE STATISTICAL FALLBACK
  // -----------------------------
  if (
    currentData.temperature > 45 ||
    currentData.humidity > 90 ||
    currentData.aqi > 300
  ) {
    return {
      isAnomaly: true,
      reason: 'Value exceeds safe environmental limits',
      severity: 'high',
      source: 'rule',
    };
  }

  // -----------------------------
  // 2️⃣ RATE LIMIT OPENAI (1/min)
  // -----------------------------
  const now = Date.now();
  if (now - lastRun < 60_000) return null;
  lastRun = now;

  // -----------------------------
  // 3️⃣ FETCH HISTORICAL DATA
  // -----------------------------
  const history = await SensorData.find()
    .sort({ timestamp: -1 })
    .limit(20)
    .lean();

  if (history.length < 10) return null;

  // -----------------------------
  // 4️⃣ OPENAI ANALYSIS
  // -----------------------------
  try {
    const prompt = `
Analyze the following environmental sensor history.
Detect anomalies based on patterns, spikes, or abnormal trends.

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
      response_format: { type: "json_object" }
    });

    return {
      ...JSON.parse(res.choices[0].message.content),
      source: 'ai',
    };
  } catch (err) {
    console.error('OpenAI skipped:', err.message);
    return null;
  }
};
